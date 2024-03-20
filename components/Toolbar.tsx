"use client";

import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";
import {
	BoldIcon,
	CodeIcon,
	ItalicIcon,
	UnderlineIcon,
} from "@/components/ui/icons";

export function Toolbar() {
	const editor = useSlate();

	return (
		<section className="fixed mx-auto bottom-10 bg-rose-200 inset-x-0 w-fit p-1 rounded-full flex justify-around gap-1">
			<Button variant="ghost" size="icon" className="rounded-full">
				<BoldIcon />
			</Button>
			<Button variant="ghost" size="icon" className="rounded-full">
				<ItalicIcon />
			</Button>
			<Button variant="ghost" size="icon" className="rounded-full">
				<UnderlineIcon />
			</Button>
			<Button variant="ghost" size="icon" className="rounded-full">
				<CodeIcon />
			</Button>
		</section>
	);
}
