"use client";

import { useCallback, useState } from "react";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react";
import {
	Descendant,
	Node,
	createEditor,
	Element,
	Editor,
	Transforms,
} from "slate";
import {
	QuoteBlock,
	CodeBlock,
	DefaultBlock,
	LeafElement,
} from "@/components/Components";
import { CustomEditor, type CustomElement } from "@/lib/slate";
import { Toolbar } from "@/components/Toolbar";
import { UpdatedEditor } from "@/lib/helpers";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

const initialValue: Descendant[] = [
	{
		type: "quote",
		children: [
			{
				text: "Enzo Ferrari once said, \"Ask a child to draw a car, and he'll color it red.\" And I think that's all you need to know about Ferrari.",
			},
		],
	},
	{
		type: "paragraph",
		children: [
			{
				text: "bold ",
				bold: true,
			},
			{
				text: "italic ",
				italic: true,
			},
			{
				text: "underline",
				underline: true,
			},
			{
				text: " ",
			},
			{
				text: "code",
				code: true,
			},
		],
	},
	{
		type: "code",
		children: [
			{
				text: "console.log('Hello, World!');",
			},
		],
	},
];

const MARKS: {
	[key: string]: string;
} = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
	"mod+>": "quote",
};

const BlockShortcuts: {
	[key: string]: CustomElement["type"];
} = {
	"mod+`": "code",
	"mod+o": "quote",
};

export default function Home() {
	const [editor] = useState(() =>
		withShortcuts(withReact(withHistory(createEditor())))
	);

	const renderElement = useCallback((props: RenderElementProps) => {
		const element = props.element as CustomElement;

		switch (element.type) {
			case "code":
				return <CodeBlock {...props} />;
			case "quote":
				return <QuoteBlock {...props} />;
			default:
				return <DefaultBlock {...props} />;
		}
	}, []);

	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <LeafElement {...props} />;
	}, []);

	const eventHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		for (const mark in MARKS) {
			if (isHotkey(mark, event)) {
				event.preventDefault();
				UpdatedEditor.toggleMark(editor, MARKS[mark]);
			}
		}

		for (const block in BlockShortcuts) {
			if (isHotkey(block, event)) {
				event.preventDefault();
				UpdatedEditor.toggleBlock(editor, BlockShortcuts[block]);
			}
		}
	};

	return (
		<main className="min-h-full md:w-3/5 mx-auto p-5 flex gap-5">
			<Slate editor={editor} initialValue={initialValue}>
				<Toolbar />
				<Editable
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={eventHandler}
					className="w-full p-4 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-lg flex flex-col gap-1"
					spellCheck
					autoFocus
				/>
			</Slate>
		</main>
	);
}

const withShortcuts = (editor: CustomEditor) => {
	const { insertBreak } = editor;

	editor.insertBreak = () => {
		const { selection } = editor;

		// insert a blank element if the current selection is not a code block
		if (selection) {
			const [match] = Editor.nodes(editor, {
				at: selection,
				match: (n: Node) => Element.isElement(n) && n.type !== "paragraph",
			});

			if (match) {
				const block = match[0] as CustomElement;
				const isCodeBlock = block.type === "code";
				const aboveBlockEmpty = block.children[0].text.endsWith("\n");

				console.log(aboveBlockEmpty, block.type, block.children[0].text);

				if (isCodeBlock) {
					if (aboveBlockEmpty) {
						Transforms.insertNodes(editor, {
							children: [{ text: "" }],
							type: "paragraph",
						});

						// TODO: remove empty line from before (maybe)
						return;
					}

					console.log("inserting new line in code block");
					Transforms.insertFragment(editor, [{ text: "\n" }]);
					return;
				}

				Transforms.insertNodes(editor, {
					children: [{ text: "" }],
					type: "paragraph",
				});
				return;
			}
		}

		insertBreak();
	};

	return editor;
};
