import type { PDFOptions } from "@/pdf/pdf-options";
import type { HTTPMethod } from "@/router/http-method";

/**
 * Configuration options for a PDF route.
 *
 * Extends the base PDF generation options with route-specific settings.
 */
export interface RouteOptions extends PDFOptions {
	/**
	 * The HTTP methods that are allowed for this route.
	 *
	 * Defines which HTTP verbs can be used to access the PDF endpoint.
	 */
	methods: Set<HTTPMethod>;
}
