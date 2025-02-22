import type { Output, Schema } from "@/schema";

export type ComponentProps<T extends Schema> = Output<T>;
