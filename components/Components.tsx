import { cn } from "@/lib/utils";
import { RenderElementProps, RenderLeafProps } from "slate-react";

const DefaultBlock = ({
	attributes,
	children,
}: RenderElementProps): JSX.Element => {
	return (
		<p {...attributes} className="hover:bg-gray-200/50 p-1">
			{children}
		</p>
	);
};

const CodeBlock = ({
	attributes,
	children,
}: RenderElementProps): JSX.Element => {
	return (
		<pre
			{...attributes}
			className="p-6 bg-slate-200 whitespace-pre-wrap text-blue-600"
		>
			<code>{children}</code>
		</pre>
	);
};

const QuoteBlock = ({
	attributes,
	children,
}: RenderElementProps): JSX.Element => {
	return (
		<blockquote
			{...attributes}
			className="pl-5 p-3 border-l-4 border-purple-600 rounded bg-stone-100"
		>
			<p>{children}</p>
		</blockquote>
	);
};

const LeafElement = ({
	attributes,
	children,
	leaf,
}: RenderLeafProps): JSX.Element => {
	if (leaf?.code) {
		return (
			<code
				{...attributes}
				className="bg-stone-200 text-rose-600 p-1 px-2 rounded-md"
			>
				{children}
			</code>
		);
	}

	const styles: { [key: string]: string } = {
		bold: "font-semibold",
		italic: "italic",
		underline: "underline underline-offset-2",
		strikethrough: "line-through",
		text: "",
	};

	let mark: string[] = [];

	Object.keys(leaf).forEach((key: string) => {
		mark.push(styles[key]);
	});

	return (
		<span {...attributes} className={cn(mark.join(" "))}>
			{children}
		</span>
	);
};

export { DefaultBlock, CodeBlock, QuoteBlock, LeafElement };
