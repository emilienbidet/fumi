import type { ComponentProps } from "@/components";
import { z } from "zod";

export const schema = z.object({
	title: z.string(),
});

export default function Document({ title }: ComponentProps<typeof schema>) {
	return <div>{title}</div>;
}
