import type { StandardSchemaV1 } from "./standard-schema";

export type Schema = StandardSchemaV1;

export type Output<T extends Schema> = StandardSchemaV1.InferOutput<T>;
