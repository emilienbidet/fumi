/** Number of millimeters in one inch */
const MM_PER_INCH = 25.4;

/**
 * Converts millimeters to inches
 *
 * @param mm - The length in millimeters
 * @returns The length in inches
 *
 * @example
 * ```ts
 * mmToInch(25.4) // returns 1
 * ```
 */
export function mmToInch(mm: number): number {
	return mm / MM_PER_INCH;
}
