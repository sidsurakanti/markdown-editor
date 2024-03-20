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
import type {
	CustomEditor,
	CustomElement,
	CustomText,
	Node,
	NodeEntry,
} from "@/lib/definitions";

const initialValue: Descendant[] = [
	{
		type: "paragraph",
		children: [{ text: "Type something here..." }],
	},
];

const Helpers = {
	isBoldMarkActive: function (editor: CustomEditor): boolean {
		const marks = Editor.marks(editor);
		return marks ? marks.bold === true : false;
	},

	toggleBoldMark: function (editor: CustomEditor): void {
		const isActive = this.isBoldMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "bold");
		} else {
			Editor.addMark(editor, "bold", true);
		}
	},

	isItalicMarkActive: function (editor: CustomEditor): boolean {
		const marks = Editor.marks(editor);
		return marks ? marks.italic === true : false;
	},

	toggleItalicMark: function (editor: CustomEditor): void {
		const isActive = this.isItalicMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "italic");
		} else {
			Editor.addMark(editor, "italic", true);
		}
	},

	isUnderlineMarkActive: function (editor: CustomEditor): boolean {
		const marks = Editor.marks(editor);
		return marks ? marks.underline === true : false;
	},

	toggleUnderlineMark: function (editor: CustomEditor): void {
		const isActive = this.isUnderlineMarkActive(editor);
		if (isActive) {
			Editor.removeMark(editor, "underline");
		} else {
			Editor.addMark(editor, "underline", true);
		}
	},

	isCodeBlock: function (editor: CustomEditor): boolean {
		// downlevel iteration needs to be enabled for this is needed
		// bc of a bug w next.js and typescript
		const [match]: Generator<NodeEntry<Node>> = Editor.nodes(editor, {
			match: (n: Node) => Element.isElement(n) && n.type === "code",
		});

		console.log(match);
		return !!match;
	},

	toggleCodeBlock: function (editor: CustomEditor): void {
		const isActive = this.isCodeBlock(editor);

		Transforms.setNodes(
			editor,
			{ type: isActive ? "paragraph" : "code" },
			{ match: (n: Node) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},
};

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
					Helpers.toggleCodeBlock(editor);
					break;

				case "b":
					event.preventDefault();
					Helpers.toggleBoldMark(editor);
					break;

				case "i":
					event.preventDefault();
					Helpers.toggleItalicMark(editor);
					break;

				case "u":
					event.preventDefault();
					Helpers.toggleUnderlineMark(editor);
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
					className="w-full p-4 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-lg flex flex-col gap-1"
				/>
			</Slate>
		</main>
	);
}
