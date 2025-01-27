import { type ComponentProps, Schema } from "@/schema/schema";

export const schema = Schema.Object({
	title: Schema.String(),
});

export default function Document({ title }: ComponentProps<typeof schema>) {
	return <div>{title}</div>;
}
