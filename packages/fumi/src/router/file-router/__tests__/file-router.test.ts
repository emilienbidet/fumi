import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import type { Route } from "@/router";
import { z } from "zod";
import { FileRouter } from "../file-router";

const getRoutesDirectory = (dir: string) =>
	join(import.meta.dir, "fixtures", dir, "routes");

describe("FileRouter", () => {
	describe("init", () => {
		test("should load routes from the filesystem", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("minimal"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.Document).toBeFunction();
		});

		test("should load multiple routes from the filesystem", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("multiple"),
			});
			await router.init();
			expect(router.match("/example-1")).toBeDefined();
			expect(router.match("/example-2")).toBeDefined();
			expect(router.match("/example-3")).toBeDefined();
			expect(router.match("/example-4")).toBeDefined();
			expect(router.match("/example-5")).toBeDefined();
		});

		test("should load route with header", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-header"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.Header).toBeFunction();
		});

		test("should load route with footer", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-footer"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.Footer).toBeFunction();
		});

		test("should load route with options", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-options"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.options?.format).toBe("A4");
			expect(route?.options?.orientation).toBe("portrait");
			expect(route?.options?.margin).toEqual({
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			});
			expect(route?.options?.timeout).toBe(3000);
		});

		test("should load route with schema", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("with-schema"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.schema?.["~standard"].vendor).toEqual("zod");
			expect(route?.schema?.["~standard"].validate).toBeDefined();
		});

		test("should load route with all components", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("complete"),
			});
			await router.init();
			const route = router.match("/example");
			expect(route).toBeDefined();
			expect(route?.Header).toBeFunction();
			expect(route?.Footer).toBeFunction();
			expect(route?.Document).toBeFunction();
			expect(route?.schema?.["~standard"].vendor).toEqual("zod");
			expect(route?.schema?.["~standard"].validate).toBeDefined();
			expect(route?.options?.format).toBe("A4");
			expect(route?.options?.orientation).toBe("portrait");
			expect(route?.options?.margin).toEqual({
				top: 20,
				right: 20,
				bottom: 20,
				left: 20,
			});
			expect(route?.options?.timeout).toBe(3000);
		});

		test("should load routes from nested directories", async () => {
			const router = new FileRouter({
				routesDirectory: getRoutesDirectory("nested"),
			});
			await router.init();
			expect(router.match("/example-root")).toBeDefined();
			expect(router.match("/example-root/example-leaf")).toBeDefined();
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
			const schema = z.object({ title: z.string() });
			const route: Route<typeof schema> = {
				path: "/example",
				schema,
				Document: () => null,
			};
			router.add(route);
			const matchedRoute = router.match("/example");
			expect(matchedRoute).toBeDefined();
		});

		test("should throw error when adding duplicate route", () => {
			const router = new FileRouter();
			const schema = z.object({ title: z.string() });
			const route: Route<typeof schema> = {
				path: "/example",
				schema,
				Document: () => null,
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
			const schema = z.object({ title: z.string() });
			const route: Route<typeof schema> = {
				path: "/test",
				schema,
				Document: () => null,
			};
			router.add(route);
			expect(router.match("/test")).toMatchObject(route);
			expect(router.match("/test")).toMatchObject(route);
		});

		test("should return null for non-existent route", () => {
			const router = new FileRouter();
			expect(router.match("/example")).toBeNull();
		});
	});
});
