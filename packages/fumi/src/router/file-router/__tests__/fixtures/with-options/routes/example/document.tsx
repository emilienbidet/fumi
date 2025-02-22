import type { RouteOptions } from "@/router/file-router/route-options";

export const options: RouteOptions = {
	format: "A4",
	orientation: "portrait",
	margin: { top: 20, right: 20, bottom: 20, left: 20 },
	timeout: 3000,
};

export default function Document() {
	return <div />;
}
