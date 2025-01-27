import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { FileRouter } from "@/router/file-router/file-router";
import type { Route } from "@/router/route";
import { Schema, SchemaCompiler } from "@/schema/schema";

const getRoutesDirectory = (dir: string) =>
	join(import.meta.dir, "fixtures", dir, "routes");

describe("FileRouter", () => {
	describe("init", () => {
		test("should load routes from the filesystem", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("minimal"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.Document).toBeFunction();
			expect(
				route?.schema,
				"File router should set the default schema to an empty object if not specified in the document.tsx schema",
			).toBeDefined();
			expect(
				route?.options.methods,
				"File router should set the default method to GET if not specified in the document.tsx options",
			).toEqual(new Set(["GET"]));
		});

		test("should load multiple routes from the filesystem", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("multiple"),
			});
			await router.init();
			expect(router.match("GET", "/example-1")).toBeDefined();
			expect(router.match("GET", "/example-2")).toBeDefined();
			expect(router.match("GET", "/example-3")).toBeDefined();
			expect(router.match("GET", "/example-4")).toBeDefined();
			expect(router.match("GET", "/example-5")).toBeDefined();
		});

		test("should load route with header", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-header"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.Header).toBeFunction();
		});

		test("should load route with footer", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-footer"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.Footer).toBeFunction();
		});

		test("should load route with options", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-options"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.options.methods).toEqual(new Set(["GET", "POST"]));
			expect(route?.options.format).toBe("A4");
			expect(route?.options.orientation).toBe("portrait");
			expect(route?.options.margin).toEqual({
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			});
			expect(route?.options.timeout).toBe(1000);
		});

		test("should load route with schema", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-schema"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.schema).toEqual(Schema.Object({ title: Schema.String() }));
		});

		test("should load route with all components", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("complete"),
			});
			await router.init();
			const route = router.match("GET", "/example");
			expect(route).toBeDefined();
			expect(route?.Header).toBeFunction();
			expect(route?.Footer).toBeFunction();
			expect(route?.Document).toBeFunction();
			expect(route?.schema).toEqual(Schema.Object({ title: Schema.String() }));
			expect(route?.options.methods).toEqual(new Set(["GET"]));
			expect(route?.options.format).toBe("A4");
			expect(route?.options.orientation).toBe("portrait");
			expect(route?.options.margin).toEqual({
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			});
			expect(route?.options.timeout).toBe(1000);
		});

		test("should throw error if Document component is missing", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("no-document"),
			});
			expect(router.init()).rejects.toThrow(
				"Document component not found in example/document.tsx",
			);
		});
	});

	describe("add", () => {
		test("should add a valid route", () => {
			const router = new FileRouter();
			const schema = Schema.Object({ title: Schema.String() });
			const route: Route<typeof schema> = {
				path: "/example",
				schema,
				compiledSchema: SchemaCompiler.Compile(schema),
				Document: () => null,
				options: { methods: new Set(["GET"]) },
			};
			router.add(route);
			const matchedRoute = router.match("GET", "/example");
			expect(matchedRoute).toBeDefined();
		});

		test("should throw error when adding duplicate route", () => {
			const router = new FileRouter();
			const schema = Schema.Object({ title: Schema.String() });
			const route: Route<typeof schema> = {
				path: "/example",
				schema,
				compiledSchema: SchemaCompiler.Compile(schema),
				Document: () => null,
				options: { methods: new Set(["GET"]) },
			};
			router.add(route);
			expect(() => router.add(route)).toThrow(
				'Route with path "/example" already exists',
			);
		});
	});

	describe("match", () => {
		test("should match route with correct method", () => {
			const router = new FileRouter();
			const schema = Schema.Object({ title: Schema.String() });
			const route: Route<typeof schema> = {
				path: "/test",
				schema,
				compiledSchema: SchemaCompiler.Compile(schema),
				Document: () => null,
				options: { methods: new Set(["GET", "POST"]) },
			};
			router.add(route);
			expect(router.match("GET", "/test")).toMatchObject(route);
			expect(router.match("POST", "/test")).toMatchObject(route);
		});

		test("should not match route with incorrect method", () => {
			const router = new FileRouter();
			const schema = Schema.Object({ title: Schema.String() });
			const route: Route<typeof schema> = {
				path: "/example",
				schema,
				compiledSchema: SchemaCompiler.Compile(schema),
				Document: () => null,
				options: { methods: new Set(["GET"]) },
			};
			router.add(route);
			expect(router.match("POST", "/example")).toBeNull();
		});

		test("should return null for non-existent route", () => {
			const router = new FileRouter();
			expect(router.match("POST", "/example")).toBeNull();
		});
	});
});
