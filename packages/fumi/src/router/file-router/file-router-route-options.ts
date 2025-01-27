import type { PDFOptions } from "@/pdf/pdf-options";
import type { HTTPMethod } from "../http-method";

/**
 * Configuration options for a PDF route with optional methods.
 * If methods are not specified, defaults to ["GET"].
 *
 * Extends the base PDF generation options with route-specific settings.
 */
export interface Options extends PDFOptions {
	/**
	 * The HTTP methods that are allowed for this route.
	 *
	 * Defines which HTTP verbs can be used to access the PDF endpoint.
	 * @default ["GET"]
	 */
	methods?: HTTPMethod[];
}
