import type { HeadingElement } from "@/lib/slate";
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

const HeadingElement = ({
	attributes,
	children,
	...props
}: RenderElementProps): JSX.Element => {
	const element = props.element as HeadingElement;
	const size = `text-${6 - element.level}xl`;

	return (
		<h1 {...attributes} className={cn(size, "font-semibold pb-2")}>
			{children}
		</h1>
	);
};

const HorizontalRule = ({
	attributes,
	children,
}: RenderElementProps): JSX.Element => {
	return (
		<div {...attributes} contentEditable={false}>
			{children}
			<hr className="border-t-2 border-gray-400 w-full p-2" />
		</div>
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

const WrapperBlock = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="group flex gap-3">
			<span></span>
			{children}
		</div>
	);
};

export {
	DefaultBlock,
	CodeBlock,
	QuoteBlock,
	LeafElement,
	HeadingElement,
	HorizontalRule,
};
