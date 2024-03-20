import { cn } from "@/lib/utils";

const DefaultElement = (props: any) => {
	return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes} className="p-2 rounded-lg bg-stone-200">
			<code>{props.children}</code>
		</pre>
	);
};

export const LeafElement = (props: any) => {
	const markingStyles = {
		bold: "font-semibold",
		italic: "italic",
		underline: "underline",
		strikethrough: "line-through",
	};

	// TODO: fix this
	const mark = Object.keys(markingStyles).find((key) => props.leaf[key]);
	console.log(mark);

	return (
		<span {...props.attributes} className={cn(mark)}>
			{props.children}
		</span>
	);
};

export { DefaultElement, CodeElement };
