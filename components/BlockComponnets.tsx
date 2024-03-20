import { cn } from "@/lib/utils";
import type { CustomText } from "@/lib/definitions";

const DefaultElement = (props: any) => {
	return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes} className="p-2 bg-stone-200">
			<code>{props.children}</code>
		</pre>
	);
};

export const LeafElement = (props: any) => {
	const leaf: CustomText = props.leaf;
	const styles: { [key: string]: string } = {
		bold: "font-medium",
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
		<span {...props.attributes} className={cn(mark.join(" "))}>
			{props.children}
		</span>
	);
};

export { DefaultElement, CodeElement };
