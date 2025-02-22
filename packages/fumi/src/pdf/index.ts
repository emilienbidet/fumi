import type { PaperFormat } from "@/pdf/paper-format";

/**
 * Page orientation:
 * - `portrait`: Default orientation where height is greater than width
 * - `landscape`: Rotated orientation where width is greater than height
 */
export type Orientation = "portrait" | "landscape";

/**
 * Document margin configuration in millimeters.
 *
 * All margins are optional and default to 0 if not specified.
 */
export interface Margin {
	/**
	 * Top margin in millimeters.
	 *
	 * @default 0
	 */
	top?: number;

	/**
	 * Right margin in millimeters.
	 *
	 * @default 0
	 */
	right?: number;

	/**
	 * Bottom margin in millimeters.
	 *
	 * @default 0
	 */
	bottom?: number;

	/**
	 * Left margin in millimeters.
	 *
	 * @default 0
	 */
	left?: number;
}

/**
 * PDF format or custom dimension
 */
type Format = PaperFormat | { width: number; height: number };

/**
 * Configuration options for PDF generation.
 *
 * These options control the physical properties of the generated PDF document,
 * including paper size, orientation, and margins.
 *
 * @example
 * ```typescript
 * // Using standard paper format
 * const options: PDFOptions = {
 *   format: "A4",
 *   orientation: "portrait",
 *   margin: { top: 20, right: 20, bottom: 20, left: 20 }
 * };
 *
 * // Using custom dimensions
 * const options: PDFOptions = {
 *   format: { width: 210, height: 297 },
 *   orientation: "landscape",
 *   margin: { top: 10 }
 * };
 * ```
 */
export interface PDFOptions {
	/**
	 * The paper format or custom dimensions for the PDF.
	 *
	 * Can be either a standard paper format (e.g., "A4") or custom dimensions in millimeters.
	 *
	 * @default "A4"
	 */
	format?: Format;

	/**
	 * The orientation of the PDF pages.
	 *
	 * @default "portrait"
	 */
	orientation?: Orientation;

	/**
	 * Margins for the PDF document in millimeters.
	 *
	 * All margins default to 0 if not specified.
	 */
	margin?: Margin;

	/**
	 * Timeout in milliseconds for the PDF generation.
	 *
	 * @default 30000
	 */
	timeout?: number;
}
