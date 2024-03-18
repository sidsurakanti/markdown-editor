import compiler from "markdown-to-jsx";
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	HorizontalRule,
	Link,
	BlockQuote,
	CodeBlock,
	InlineCode,
	UnorderedList,
	OrderedList,
} from "@/components/MarkdownComponents";
import React from "react";

export function Markdown({ content }: { content: string }) {
	const overrides = {
		h1: {
			props: Heading1,
		},
		h2: {
			props: Heading2,
		},
		h3: {
			props: Heading3,
		},
		h4: {
			props: Heading4,
		},
		h5: {
			props: Heading5,
		},
		h6: {
			props: Heading6,
		},
		a: {
			props: Link,
		},
		pre: {
			props: CodeBlock,
		},
		code: {
			props: InlineCode,
		},
		blockquote: {
			props: BlockQuote,
		},
		hr: {
			props: HorizontalRule,
		},
		ul: UnorderedList,
		ol: OrderedList,
	};

	const res = compiler({
		children: content,
		options: { forceBlock: true, wrapper: React.Fragment, overrides: overrides },
	});

	return (
		<section
			id="markdown"
			className="rounded-md bg-gray-100/70 border border-border p-4 text-xl flex-1 leading-[40px] overflow-y-scroll"
		>
			{res}
		</section>
	);
}
