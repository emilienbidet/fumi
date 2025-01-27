/**
 * Re-exports from @sinclair/typebox with Fumi-specific naming and documentation
 * @module schema/types
 */

import {
	type Static as TypeboxStatic,
	type TSchema as TypeboxTSchema,
	Type as TypeboxType,
} from "@sinclair/typebox";
import { type TypeCheck, TypeCompiler } from "@sinclair/typebox/compiler";

/**
 * Schema builder for defining type-safe JSON schemas in Fumi
 * This is a direct re-export of TypeBox's Type object, providing all standard JSON Schema types
 * and TypeScript type inference.
 *
 * @example
 * ```typescript
 * const DiplomaSchema = Schema.Object({
 *   name: Schema.String(),
 *   degree: Schema.String(),
 * });
 * ```
 */
export const Schema = TypeboxType;

/**
 * Compiler for Fumi schemas that provides runtime type validation
 * Used to compile schemas into efficient validators for runtime type checking
 *
 * @example
 * ```typescript
 * const DiplomaSchema = Schema.Object({
 *   name: Schema.String(),
 *   degree: Schema.String(),
 * });
 *
 * // Compile the schema for runtime validation
 * const Validator = SchemaCompiler.Compile(DiplomaSchema);
 *
 * const value = { name: "John Doe", degree: "Computer Science" };
 *
 * // Validate data at runtime
 * const isValid = Validator.Check(value);
 *
 * // Get validation errors
 * if (!isValid) {
 *   console.error(...Validator.Errors(value));
 * }
 * ```
 */
export const SchemaCompiler = TypeCompiler;

/**
 * Represents a compiled schema validator for runtime type checking
 * Created by the SchemaCompiler to efficiently validate data against a schema
 *
 * @template T - The schema type to compile
 *
 * @example
 * ```typescript
 * const DiplomaSchema = Schema.Object({
 *   name: Schema.String(),
 *   degree: Schema.String(),
 * });
 *
 * // Get the compiled schema type
 * type CompiledDiplomaSchema = TCompiledSchema<typeof DiplomaSchema>;
 *
 * // Use with SchemaCompiler
 * const validator: CompiledDiplomaSchema = SchemaCompiler.Compile(DiplomaSchema);
 * ```
 */
export type TCompiledSchema<T extends TSchema> = TypeCheck<T>;

/**
 * Extracts the TypeScript type from a Fumi schema
 * Use this type to get the inferred TypeScript type from a schema definition
 *
 * @template T - The schema type to extract properties from
 *
 * @example
 * ```typescript
 * const DiplomaSchema = Schema.Object({
 *   name: Schema.String(),
 *   degree: Schema.String(),
 * });
 *
 * type Diploma = ComponentProps<typeof DiplomaSchema>;
 * // Equivalent to: type Diploma = { name: string; degree: string }
 * ```
 */
export type ComponentProps<T extends TSchema> = TypeboxStatic<T>;

/**
 * Base schema type for all Fumi schemas
 * This type represents any valid JSON Schema type definition
 *
 * @example
 * ```typescript
 * function validateSchema(schema: TSchema) {
 *   // Schema validation logic
 * }
 * ```
 */
export type TSchema = TypeboxTSchema;
