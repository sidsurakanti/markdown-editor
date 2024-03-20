"use client";

import { useSlate } from "slate-react";
import { Button } from "@/components/ui/button";

export function Toolbar() {
	const editor = useSlate();


	return (
		<section className="fixed mx-auto bottom-10 bg-rose-500 inset-x-0 w-fit px-4 py-2 rounded-full flex justify-around gap-4">
			<Button>B</Button>
			<Button>I</Button>
			<Button>U</Button>
			<Button>code</Button>
		</section>
	);
}
