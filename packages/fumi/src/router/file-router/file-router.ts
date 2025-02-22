import type { Route } from "@/router";
import type { FileRouterOptions } from "@/router/file-router/file-router-options";
import type { Router } from "@/router/router";
import type { Schema } from "@/schema";
import { Glob } from "bun";

/**
 * A file-system based router implementation that loads routes from a directory
 * Each route should be in its own directory with a document.tsx file
 */
export class FileRouter implements Router {
	private routes: Map<string, Route<Schema>> = new Map();

	constructor(
		private options: FileRouterOptions = { routesDirectory: "./routes" },
	) {}

	/**
	 * Initializes the router by scanning the routes directory and loading all routes
	 * @throws Error if route files are invalid or missing required exports
	 */
	public async init(): Promise<void> {
		const glob = new Glob("*/document.tsx");
		const scan = glob.scan(this.options.routesDirectory);

		for await (const file of scan) {
			const path = `/${file.replace("/document.tsx", "")}`;

			const module = await import(`${this.options.routesDirectory}/${file}`);
			const {
				schema,
				options: pdfOptions = {},
				default: Document,
				Header,
				Footer,
			} = module;

			if (!Document) {
				throw new Error(`Document component not found in ${file}`);
			}

			if (typeof Document !== "function") {
				throw new Error(`Document must be a valid React component in ${file}`);
			}

			if (Header && typeof Header !== "function") {
				throw new Error(`Header must be a valid React component in ${file}`);
			}

			if (Footer && typeof Footer !== "function") {
				throw new Error(`Footer must be a valid React component in ${file}`);
			}

			// TODO: Validate options
			// TODO: Add examples and check examples are valid

			this.add({
				path,
				schema,
				Document,
				Header,
				Footer,
				pdfOptions,
			});
		}
	}

	/**
	 * Adds a new route to the router
	 * @template T The schema type for route props validation
	 * @param route The route configuration to add
	 */
	public add<T extends Schema>(route: Route<T>): void {
		if (this.routes.has(route.path)) {
			throw new Error(`Route with path "${route.path}" already exists`);
		}
		this.routes.set(route.path, route);
	}

	/**
	 * Matches a request against registered routes
	 * @param path The URL path of the request
	 * @returns The matched route or null if no match found
	 */
	public match(path: string): Route<Schema> | null {
		const route = this.routes.get(path);

		if (!route) return null;

		return route;
	}
}
