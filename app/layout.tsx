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
			<body
				className={cn(
					poppins.className,
					"h-screen w-full flex-col antialiased overflow-scoll-y"
				)}
			>
				<div className="w-2/3 h-4/5 bg-[#F7DAD9] absolute top-2/3 -left-1/4 rounded-[50%] -z-20 blur-3xl" />
				{children}
			</body>
		</html>
	);
}
