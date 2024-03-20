"use client";

import { useCallback, useState } from "react";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react";
import { Editor, Transforms, Element, Descendant, createEditor } from "slate";
import {
	CodeElement,
	DefaultElement,
	LeafElement,
} from "@/components/BlockComponnets";
import { CustomElement, CustomText, Node, NodeEntry } from "@/lib/definitions";

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
		if (event.ctrlKey) {
			switch (event.key) {
				case "`":
					event.preventDefault();

					// downlevel iteration for this is needed bc of a bug w next.js and typescript
					const [match]: Generator<NodeEntry<Node>> = Editor.nodes(editor, {
						match: (n: Node) => Element.isElement(n) && n.type === "code",
					});

					Transforms.setNodes(
						editor,
						{ type: match ? "paragraph" : "code" },
						{ match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
					);
					break;
				case "b":
					event.preventDefault();
					const currMarks = Editor.marks(editor);
					currMarks?.bold
						? Editor.removeMark(editor, "bold")
						: Editor.addMark(editor, "bold", true);
					break;
			}
		}
	};

	return (
		<main className="h-full w-4/5 mx-auto p-5 flex gap-5">
			<Slate editor={editor} initialValue={initialValue}>
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={eventHandler}
					className="w-full p-2 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-md"
				/>
			</Slate>
		</main>
	);
}
