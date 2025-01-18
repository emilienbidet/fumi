/**
 * Standard ISO 216 paper formats including A, B, and C series
 */
export type PaperFormat =
	| "A0"
	| "A1"
	| "A2"
	| "A3"
	| "A4"
	| "A5"
	| "A6"
	| "A7"
	| "A8"
	| "A9"
	| "A10"
	| "B0"
	| "B1"
	| "B2"
	| "B3"
	| "B4"
	| "B5"
	| "B6"
	| "B7"
	| "B8"
	| "B9"
	| "B10"
	| "C0"
	| "C1"
	| "C2"
	| "C3"
	| "C4"
	| "C5"
	| "C6"
	| "C7"
	| "C8"
	| "C9"
	| "C10";

/**
 * Interface representing the dimensions of a paper format
 * All measurements follow ISO 216 standard
 */
interface PaperDimensions {
	/**
	 * Paper width in millimeters
	 * The shorter dimension of the paper
	 */
	width: number;

	/**
	 * Paper height in millimeters
	 * The longer dimension of the paper
	 */
	height: number;
}

/**
 * Standard dimensions for all ISO paper formats.
 *
 * All measurements are in millimeters following ISO 216.
 *
 * Each size is exactly half of the previous size.
 *
 * The aspect ratio of height/width is always √2 (1.4142...)
 *
 * @example
 * ```typescript
 * // Get dimensions of A4 paper
 * const a4 = PAPER_FORMAT_DIMENSIONS["A4"];
 * console.log(a4); // { width: 210, height: 297 }
 * ```
 */
export const PAPER_FORMAT_DIMENSIONS: Record<PaperFormat, PaperDimensions> = {
	A0: { width: 841, height: 1189 },
	A1: { width: 594, height: 841 },
	A2: { width: 420, height: 594 },
	A3: { width: 297, height: 420 },
	A4: { width: 210, height: 297 },
	A5: { width: 148, height: 210 },
	A6: { width: 105, height: 148 },
	A7: { width: 74, height: 105 },
	A8: { width: 52, height: 74 },
	A9: { width: 37, height: 52 },
	A10: { width: 26, height: 37 },
	B0: { width: 1000, height: 1414 },
	B1: { width: 707, height: 1000 },
	B2: { width: 500, height: 707 },
	B3: { width: 353, height: 500 },
	B4: { width: 250, height: 353 },
	B5: { width: 176, height: 250 },
	B6: { width: 125, height: 176 },
	B7: { width: 88, height: 125 },
	B8: { width: 62, height: 88 },
	B9: { width: 44, height: 62 },
	B10: { width: 31, height: 44 },
	C0: { width: 917, height: 1297 },
	C1: { width: 648, height: 917 },
	C2: { width: 458, height: 648 },
	C3: { width: 324, height: 458 },
	C4: { width: 229, height: 324 },
	C5: { width: 162, height: 229 },
	C6: { width: 114, height: 162 },
	C7: { width: 81, height: 114 },
	C8: { width: 57, height: 81 },
	C9: { width: 40, height: 57 },
	C10: { width: 28, height: 40 },
};
