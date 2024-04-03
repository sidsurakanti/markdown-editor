import type { HeadingElement } from "@/lib/slate";
import { cn } from "@/lib/utils";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import { EditIcon } from "./ui/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

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

const ListElement = ({ attributes, children }: RenderElementProps) => {
	return <li {...attributes}>{children}</li>;
};

const HeadingElement = ({
	attributes,
	children,
	...props
}: RenderElementProps): JSX.Element => {
	const element = props.element as HeadingElement;
	const sizes: {
		[key: string]: string;
	} = {
		1: "text-4xl",
		2: "text-3xl",
		3: "text-2xl",
		4: "text-xl",
	};
	const size = sizes[element.level];

	return (
		<h1 {...attributes} className={cn(size, "font-semibold pb-2 p-1")}>
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
			<hr className="border-t-2 border-gray-400 pb-2" />
		</div>
	);
};

const BulletedListElement = ({ attributes, children }: RenderElementProps) => {
	return (
		<ul {...attributes} className="list-disc list-inside p-1 pb-2">
			{children}
		</ul>
	);
};

const OrderedListElement = ({ attributes, children }: RenderElementProps) => {
	return (
		<ol {...attributes} className="list-decimal list-inside p-1 pb-2">
			{children}
		</ol>
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
		<section className="group flex items-end gap-1">
			{/* <span>
				<Popover>
					<PopoverTrigger>
						<EditIcon className="w-4 h-4 invisible group-hover:visible cursor-pointer transition-all duration-150" />
					</PopoverTrigger>
					<PopoverContent className="p-2 bg-gray-800 text-white rounded-lg">
						Edit
					</PopoverContent>
				</Popover>
			</span> */}
			<div className="w-full">{children}</div>
		</section>
	);
};

export {
	DefaultBlock,
	CodeBlock,
	QuoteBlock,
	LeafElement,
	HeadingElement,
	HorizontalRule,
	WrapperBlock,
	ListElement,
	BulletedListElement,
	OrderedListElement,
};
