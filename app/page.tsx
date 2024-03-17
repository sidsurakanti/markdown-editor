"use client";

import { sample } from "@/sample";
import { Markdown } from "@/components/Markdown";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useState } from "react";

export default function Home() {
	const [content, setContent] = useState<string>(sample);

	return (
		<main className="h-full w-4/5 mx-auto p-5 flex gap-5 ">
			<MarkdownEditor
				value={content}
				onValueChange={(e) => setContent(e.target.value)}
			/>
			<Markdown content={content} />
		</main>
	);
}
