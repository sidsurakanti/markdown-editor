import type { Metadata } from "next";
import { poppins } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Title",
	description: "Description",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(poppins.className, "h-screen w-full flex-col antialiased")}>
				{children}
			</body>
		</html>
	);
}
