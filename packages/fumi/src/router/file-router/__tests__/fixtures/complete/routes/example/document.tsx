import type { Options } from "@/router/file-router/file-router-route-options";
import { type ComponentProps, Schema } from "@/schema/schema";

export const options: Options = {
	methods: ["GET"],
	format: "A4",
	orientation: "portrait",
	margin: { top: 20, right: 20, bottom: 20, left: 20 },
	timeout: 1000,
};

export const schema = Schema.Object({
	title: Schema.String(),
});

export function Header({ title }: ComponentProps<typeof schema>) {
	return <div>{title}</div>;
}

export default function Document({ title }: ComponentProps<typeof schema>) {
	return <div>{title}</div>;
}

export function Footer({ title }: ComponentProps<typeof schema>) {
	return <div>{title}</div>;
}
