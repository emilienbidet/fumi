import type { Route } from "@/router";
import type { Schema } from "@/schema";

/**
 * Represents a router that handles PDF route registration and matching.
 * A router is responsible for managing PDF routes and handling requests to generate PDFs.
 * It provides methods to initialize, add, and match routes.
 *
 * @example
 * ```typescript
 * const router: Router = createRouter();
 * await router.init();
 * router.add({ path: 'diploma', schema: diplomaSchema, Document: DiplomaComponent });
 * const matchedRoute = router.match('/diploma');
 * ```
 */
export interface Router {
	/**
	 * Initialization function that will be called when the server starts.
	 *
	 * Perform any setup tasks, such as loading configurations or connecting to services.
	 */
	init: () => Promise<void>;

	/**
	 * Registers a new route with the router.
	 * @template T - The schema type that defines the expected props
	 * @param route - The route configuration to add
	 *
	 * @example
	 * ```typescript
	 * router.add({ path: 'menu', schema: menuSchema, Document: MenuComponent });
	 * ```
	 */
	add: <T extends Schema>(route: Route<T>) => void;

	/**
	 * Attempts to match a request against registered routes.
	 * @param path - The URL path of the request
	 *
	 * @returns The matched route or null if no match is found.
	 *
	 * @example
	 * ```typescript
	 * const route = router.match('/menu');
	 * if (route) {
	 *   // handle matched route
	 * }
	 * ```
	 */
	match: (path: string) => Route<Schema> | null;
}
