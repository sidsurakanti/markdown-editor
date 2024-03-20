"use client";

import { useCallback, useState } from "react";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react";
import { Descendant, Editor, createEditor } from "slate";
import {
	CodeElement,
	DefaultElement,
	LeafElement,
} from "@/components/BlockComponnets";
import { type CustomElement } from "@/lib/definitions";
import { Toolbar } from "@/components/Toolbar";
import { UpdatedEditor } from "@/lib/helpers";

const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [{ text: "Type something here..." }],
	},
];

export default function Home() {
	const [editor] = useState(() => withReact(createEditor()));

	const renderElement = useCallback((props: RenderElementProps) => {
		const element = props.element as CustomElement;

		switch (element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <LeafElement {...props} />;
	}, []);

	const eventHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (!event.ctrlKey) return;

		switch (event.key) {
			case "`":
				event.preventDefault();
				UpdatedEditor.toggleCodeBlock(editor);
				break;

			case "b":
				event.preventDefault();
				UpdatedEditor.toggleBoldMark(editor);
				break;

			case "i":
				event.preventDefault();
				UpdatedEditor.toggleItalicMark(editor);
				break;

			case "u":
				event.preventDefault();
				UpdatedEditor.toggleUnderlineMark(editor);
				break;
		}
	};

	return (
		<main className="h-full w-4/5 mx-auto p-5 flex gap-5">
			<Slate editor={editor} initialValue={initialValue}>
				<Toolbar />
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={eventHandler}
					className="w-full p-4 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-lg flex flex-col gap-1"
					disableDefaultStyles
				/>
			</Slate>
		</main>
	);
}
