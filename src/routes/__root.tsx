import { QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	redirect,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import Header from "~/components/Header";
import { NotFound } from "~/components/NotFound";
import { Toaster } from "~/components/ui/sonner";
import { getSession } from "~/lib/auth/getSession";
import { queryClient } from "~/lib/queryClient";
// @ts-ignore
import appCss from "~/styles/app.css?url";

type RootContext = {
	userId: string | undefined;
	pathname: string;
};

export const Route = createRootRoute({
	beforeLoad: async ({ location }): Promise<RootContext> => {
		const pathname = location.pathname;

		const { userId }: { userId: string | undefined } = await getSession();

		return { userId: userId, pathname: pathname };
	},

	loader: ({ context }) => {
		return {
			pathname: context.pathname,
			userId: context.userId,
		};
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { pathname, userId } = Route.useLoaderData();

	return (
		<html lang={"en"}>
			<head>
				<HeadContent />
				<title>Tanstack Demo</title>
			</head>
			<body>
				{pathname === "/auth" || <Header userId={userId} />}
				{children}
				<Toaster />
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}
