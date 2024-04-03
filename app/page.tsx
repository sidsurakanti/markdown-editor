"use client";

import { useCallback, useState } from "react";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import { Descendant, createEditor } from "slate";
import type { CustomElement } from "@/lib/slate";
import { ExtendedEditor, whichElement } from "@/lib/helpers";
import { withShortcuts } from "@/lib/shortcuts";
import { LeafElement } from "@/components/Components";
import { Toolbar } from "@/components/Toolbar";
import isHotkey from "is-hotkey";

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

	const renderElement = useCallback(
		(props: RenderElementProps) => whichElement(props),
		[]
	);

	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <LeafElement {...props} />;
	}, []);

	const eventHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		for (const mark in MARKS) {
			if (isHotkey(mark, event)) {
				event.preventDefault();
				ExtendedEditor.toggleMark(editor, MARKS[mark]);
			}
		}

		for (const block in BlockShortcuts) {
			if (isHotkey(block, event)) {
				event.preventDefault();
				ExtendedEditor.toggleBlock(editor, BlockShortcuts[block]);
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
					className="w-full p-8 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-lg flex flex-col gap-1"
					spellCheck
					autoFocus
					readOnly={false}
				/>
			</Slate>
		</main>
	);
}

const initialValue: Descendant[] = [
	{ type: "heading", level: 4, children: [{ text: "Bonjour" }] },
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
				text: "strikethrough",
				strikethrough: true,
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
	{
		type: "ul",
		children: [
			{
				type: "li",
				children: [
					{
						text: "Item",
					},
				],
			},
		],
	},
	{ type: "heading", level: 1, children: [{ text: "Heading 1" }] },
	{ type: "heading", level: 2, children: [{ text: "Heading 2" }] },
	{ type: "heading", level: 3, children: [{ text: "Heading 3" }] },
	{ type: "heading", level: 4, children: [{ text: "Heading 4" }] },
];
