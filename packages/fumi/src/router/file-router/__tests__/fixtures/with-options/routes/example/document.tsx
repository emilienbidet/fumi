import type { Options } from "@/router/file-router/file-router-route-options";

export const options: Options = {
	methods: ["GET", "POST"],
	format: "A4",
	orientation: "portrait",
	margin: { top: 20, right: 20, bottom: 20, left: 20 },
	timeout: 1000,
};

export default function Document() {
	return <div />;
}
