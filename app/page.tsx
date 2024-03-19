"use client";

import { useState } from "react";
import { Slate, Editable, withReact, RenderElementProps } from "slate-react";
import { Editor, Transforms, Element, Descendant, createEditor } from "slate";
import { CodeElement, DefaultElement } from "@/components/BlockComponnets";
import { CustomElement, CustomText } from "@/lib/definitions";

const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph." }],
	},
];

const renderElement = (props: RenderElementProps) => {
	const element = props.element as CustomElement;

	switch (element.type) {
		case "code":
			return <CodeElement {...props} />;
		default:
			return <DefaultElement {...props} />;
	}
};

export default function Home() {
	const [editor] = useState(() => withReact(createEditor()));

	const eventHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.ctrlKey) {
			switch (event.key) {
				case "`":
					event.preventDefault();

					Transforms.setNodes(
						editor,
						{ type: "code" },
						{ match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
					);
					break;
			}
		}
	};

	return (
		<main className="h-full w-4/5 mx-auto p-5 flex gap-5 ">
			<Slate editor={editor} initialValue={initialValue}>
				<Editable renderElement={renderElement} onKeyDown={eventHandler} />
			</Slate>
		</main>
	);
}
