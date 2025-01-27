import type { RouteOptions } from "@/router/route-options";
import type { ComponentProps, TCompiledSchema, TSchema } from "@/schema/schema";
import type { ComponentType } from "react";

/**
 * Represents a complete PDF route configuration in the Fumi framework.
 * Provides type-safe definition of routes with their associated React components and validation schemas.
 *
 * @template T - The TypeBox schema type that defines the expected props structure
 * @example
 * ```typescript
 * const diplomaRoute: Route<typeof diplomaSchema> = {
 *   path: 'diploma',
 *   schema: diplomaSchema,
 *   Document: DiplomaComponent,
 *   options: { methods: ['GET'] }
 * };
 * ```
 */
export interface Route<T extends TSchema> {
	/**
	 * The URL path where the PDF will be served.
	 *
	 * This is the final segment of the URL (e.g., 'diploma', 'menu', 'invoice').
	 *
	 * Should be unique within the router configuration.
	 */
	path: string;

	/**
	 * The TypeBox schema that defines the expected request body structure.
	 *
	 * When provided, this schema's properties will be passed as props to the Component
	 * and used for runtime validation of incoming requests.
	 *
	 * If not provided, the route will accept no props.
	 */
	schema: T;

	/**
	 * The compiled version of the schema, if it exists.
	 *
	 * This is used for runtime validation of incoming requests.
	 */
	compiledSchema: TCompiledSchema<T>;

	/**
	 * Configuration settings for the route.
	 *
	 * Includes PDF generation options and allowed HTTP methods.
	 */
	options: RouteOptions;

	/**
	 * Optional array of example props for the route.
	 *
	 * These examples can be used for documentation, and development purposes.
	 *
	 * Each example can have an optional name for identification and must include valid props
	 * that conform to the route's schema.
	 *
	 * @example
	 * ```typescript
	 * examples: [
	 *   {
	 *     name: 'Basic Invoice',
	 *     props: { total: 100, currency: 'USD' }
	 *   }
	 * ]
	 * ```
	 */
	examples?: {
		name?: string;
		props: ComponentProps<T>;
	}[];

	/**
	 * Optional React component for rendering the PDF header.
	 *
	 * Receives the same props as defined in the schema.
	 */
	Header?: ComponentType<ComponentProps<T>>;

	/**
	 * Optional React component for rendering the PDF footer.
	 *
	 * Receives the same props as defined in the schema.
	 */
	Footer?: ComponentType<ComponentProps<T>>;

	/**
	 * The main React component responsible for rendering the PDF content.
	 *
	 * Receives props that are validated against the provided schema.
	 *
	 * Must be provided for every route configuration.
	 */
	Document: ComponentType<ComponentProps<T>>;
}
