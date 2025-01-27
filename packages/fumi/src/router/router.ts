import type { HTTPMethod } from "@/router/http-method";
import type { Route } from "@/router/route";
import type { TSchema } from "@/schema/schema";

/**
 * Represents a router that handles PDF route registration and matching.
 * A router is responsible for managing PDF routes and handling requests to generate PDFs.
 */
export interface Router {
	/**
	 * Initialization function that will be called when the server starts.
	 *
	 * Perform any setup tasks.
	 */
	init: () => Promise<void>;

	/**
	 * Registers a new route with the router.
	 * @template T - The schema type extending TSchema that defines the expected props
	 * @param route - The route configuration to add
	 */
	add: <T extends TSchema>(route: Route<T>) => void;

	/**
	 * Attempts to match a request against registered routes.
	 * @param method - The HTTP method of the request
	 * @param path - The URL path of the request
	 */
	match: (method: HTTPMethod, path: string) => Route<TSchema> | null;
}
