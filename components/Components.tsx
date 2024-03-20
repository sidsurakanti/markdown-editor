import { cn } from "@/lib/utils";
import { RenderLeafProps } from "slate-react";

const DefaultBlock = (props: any) => {
	return (
		<p {...props.attributes} className="hover:bg-gray-200/50">
			{props.children}
		</p>
	);
};

const CodeBlock = (props: any) => {
	return (
		<pre {...props.attributes} className="p-2 bg-stone-200">
			<code>{props.children}</code>
		</pre>
	);
};

const LeafElement = ({ attributes, children, leaf }: RenderLeafProps) => {
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

export { DefaultBlock, CodeBlock, LeafElement };
