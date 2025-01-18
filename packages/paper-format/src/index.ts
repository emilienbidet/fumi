/**
 * Standard ISO 216 paper formats including A, B, and C series
 * A series is the most commonly used format worldwide
 * B series is used for posters, books, and passports
 * C series is primarily used for envelopes
 */
export enum PaperFormat {
	/** A0 format - Base format for A series */
	A0 = "A0",
	/** A1 format - Half of A0 */
	A1 = "A1",
	/** A2 format - Half of A1 */
	A2 = "A2",
	/** A3 format - Half of A2 */
	A3 = "A3",
	/** A4 format - Standard office paper size */
	A4 = "A4",
	/** A5 format - Half of A4 */
	A5 = "A5",
	/** A6 format - Postcard size */
	A6 = "A6",
	/** A7 format - Small format */
	A7 = "A7",
	/** A8 format - Business card size */
	A8 = "A8",
	/** A9 format - Very small format */
	A9 = "A9",
	/** A10 format - Smallest A series format */
	A10 = "A10",

	/** B0 format - Base format for B series */
	B0 = "B0",
	/** B1 format - Half of B0 */
	B1 = "B1",
	/** B2 format - Half of B1 */
	B2 = "B2",
	/** B3 format - Half of B2 */
	B3 = "B3",
	/** B4 format - Used for books and folders */
	B4 = "B4",
	/** B5 format - Common book size */
	B5 = "B5",
	/** B6 format - Half of B5 */
	B6 = "B6",
	/** B7 format - Passport size */
	B7 = "B7",
	/** B8 format - Half of B7 */
	B8 = "B8",
	/** B9 format - Half of B8 */
	B9 = "B9",
	/** B10 format - Smallest B series format */
	B10 = "B10",

	/** C0 format - Base format for C series */
	C0 = "C0",
	/** C1 format - Half of C0 */
	C1 = "C1",
	/** C2 format - Half of C1 */
	C2 = "C2",
	/** C3 format - Half of C2 */
	C3 = "C3",
	/** C4 format - Fits unfolded A4 */
	C4 = "C4",
	/** C5 format - Fits folded A4 */
	C5 = "C5",
	/** C6 format - Common envelope size */
	C6 = "C6",
	/** C7 format - Half of C6 */
	C7 = "C7",
	/** C8 format - Half of C7 */
	C8 = "C8",
	/** C9 format - Half of C8 */
	C9 = "C9",
	/** C10 format - Smallest C series format */
	C10 = "C10",
}

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
 * Standard dimensions for all ISO paper formats
 * All measurements are in millimeters following ISO 216
 * Each size is exactly half of the previous size
 * The aspect ratio of height/width is always √2 (1.4142...)
 *
 * @example
 * ```typescript
 * // Get dimensions of A4 paper
 * const a4 = PAPER_FORMAT_DIMENSIONS[PaperFormat.A4];
 * console.log(a4); // { width: 210, height: 297 }
 * ```
 */
export const PAPER_FORMAT_DIMENSIONS: Record<PaperFormat, PaperDimensions> = {
	[PaperFormat.A0]: { width: 841, height: 1189 },
	[PaperFormat.A1]: { width: 594, height: 841 },
	[PaperFormat.A2]: { width: 420, height: 594 },
	[PaperFormat.A3]: { width: 297, height: 420 },
	[PaperFormat.A4]: { width: 210, height: 297 },
	[PaperFormat.A5]: { width: 148, height: 210 },
	[PaperFormat.A6]: { width: 105, height: 148 },
	[PaperFormat.A7]: { width: 74, height: 105 },
	[PaperFormat.A8]: { width: 52, height: 74 },
	[PaperFormat.A9]: { width: 37, height: 52 },
	[PaperFormat.A10]: { width: 26, height: 37 },
	[PaperFormat.B0]: { width: 1000, height: 1414 },
	[PaperFormat.B1]: { width: 707, height: 1000 },
	[PaperFormat.B2]: { width: 500, height: 707 },
	[PaperFormat.B3]: { width: 353, height: 500 },
	[PaperFormat.B4]: { width: 250, height: 353 },
	[PaperFormat.B5]: { width: 176, height: 250 },
	[PaperFormat.B6]: { width: 125, height: 176 },
	[PaperFormat.B7]: { width: 88, height: 125 },
	[PaperFormat.B8]: { width: 62, height: 88 },
	[PaperFormat.B9]: { width: 44, height: 62 },
	[PaperFormat.B10]: { width: 31, height: 44 },
	[PaperFormat.C0]: { width: 917, height: 1297 },
	[PaperFormat.C1]: { width: 648, height: 917 },
	[PaperFormat.C2]: { width: 458, height: 648 },
	[PaperFormat.C3]: { width: 324, height: 458 },
	[PaperFormat.C4]: { width: 229, height: 324 },
	[PaperFormat.C5]: { width: 162, height: 229 },
	[PaperFormat.C6]: { width: 114, height: 162 },
	[PaperFormat.C7]: { width: 81, height: 114 },
	[PaperFormat.C8]: { width: 57, height: 81 },
	[PaperFormat.C9]: { width: 40, height: 57 },
	[PaperFormat.C10]: { width: 28, height: 40 },
};
