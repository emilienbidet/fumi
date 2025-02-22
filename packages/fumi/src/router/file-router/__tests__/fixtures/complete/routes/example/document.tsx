import type { ComponentProps } from "@/components";
import type { RouteOptions } from "@/router/file-router/route-options";
import { z } from "zod";

export const options: RouteOptions = {
	format: "A4",
	orientation: "portrait",
	margin: { top: 20, right: 20, bottom: 20, left: 20 },
	timeout: 3000,
};

export const schema = z.object({
	title: z.string(),
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
