"use client";

import { useCallback, useState } from "react";
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
	ReactEditor,
} from "slate-react";
import {
	Descendant,
	Node,
	createEditor,
	Element,
	Editor,
	Transforms,
	Range,
	Point,
} from "slate";
import {
	QuoteBlock,
	CodeBlock,
	DefaultBlock,
	LeafElement,
	HeadingElement,
	HorizontalRule,
	WrapperBlock,
	NumberedListElement,
} from "@/components/Components";
import {
	CustomEditor,
	type CustomElement,
	type Location,
	type CustomText,
} from "@/lib/slate";
import { Toolbar } from "@/components/Toolbar";
import { UpdatedEditor } from "@/lib/helpers";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

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
		type: "ol",
		children: [
			{
				text: "Item",
			},
		],
	},
	{ type: "heading", level: 1, children: [{ text: "Heading 1" }] },
	{ type: "heading", level: 2, children: [{ text: "Heading 2" }] },
	{ type: "heading", level: 3, children: [{ text: "Heading 3" }] },
	{ type: "heading", level: 4, children: [{ text: "Heading 4" }] },
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
				return (
					<WrapperBlock>
						<CodeBlock {...props} />
					</WrapperBlock>
				);
			case "quote":
				return (
					<WrapperBlock>
						<QuoteBlock {...props} />
					</WrapperBlock>
				);
			case "heading":
				return (
					<WrapperBlock>
						<HeadingElement {...props} />
					</WrapperBlock>
				);
			case "hr":
				return (
					<WrapperBlock>
						<HorizontalRule {...props} />
					</WrapperBlock>
				);
			case "ol":
				return (
					<WrapperBlock>
						<NumberedListElement {...props} />
					</WrapperBlock>
				);
			default:
				return (
					<WrapperBlock>
						<DefaultBlock {...props} />
					</WrapperBlock>
				);
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
					className="w-full px-6 py-8 focus:outline-none bg-gray-200/20 border-2 border-gray-200/50 rounded-lg flex flex-col gap-1"
					spellCheck
					autoFocus
				/>
			</Slate>
		</main>
	);
}

const withShortcuts = (editor: CustomEditor) => {
	const { insertBreak, insertText } = editor;

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
				// console.log(aboveBlockEmpty, block.type, block.children[0].text);
				console.log(block.children[0].text);

				const aboveBlockEmpty = block.children[0].text
					? block.children[0].text.endsWith("\n")
					: true;
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

	editor.insertText = (text) => {
		const SHORTCUTS: {
			[key: string]: CustomElement["type"];
		} = {
			"```": "code",
			">": "quote",
			"#": "heading",
			"##": "heading",
			"###": "heading",
			"####": "heading",
			"---": "hr",
			"***": "hr",
			"1.": "ol",
		};

		// * selection: basically where the path of the cursor is when they type the space
		const { selection } = editor;

		// check if the text in the block ends with a space
		if (selection && text.endsWith(" ") && Range.isCollapsed(selection)) {
			const { anchor } = selection; // current cursor position

			// get current block
			const currentBlock = Editor.above(editor, {
				match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
			});
			const path = currentBlock ? currentBlock[1] : []; // index of block in the editor
			const start = Editor.start(editor, path); // start point of the current block

			// range of text from the start of the block to the current cursor position
			const range: Range = { anchor, focus: start };

			const beforeText = Editor.string(editor, range);
			const elementType = SHORTCUTS[beforeText];

			if (elementType) {
				// update selection to the range of the shortcut
				Transforms.select(editor, range);

				// delete the text in the range
				if (!Range.isCollapsed(range)) {
					Transforms.delete(editor);
				}

				let newElement: Partial<CustomElement>;

				if (elementType === "heading") {
					const level = beforeText.length;
					newElement = {
						type: elementType,
						level,
					};
				} else {
					newElement = {
						type: elementType,
					};
				}

				if (elementType === "hr") {
					Transforms.setNodes(editor, newElement, {
						match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
					});

					const isBlockBelow = Editor.after(editor, range);
					if (!isBlockBelow) {
						// insert new line
						editor.insertBreak();
					}
					return;
				}

				if (elementType === "ol") {
					const wrapper: CustomElement = { type: "ol", children: [] };
					Transforms.wrapNodes(editor, wrapper);
					return;
				}

				Transforms.setNodes(editor, newElement, {
					match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
				});

				return;
			}
		}

		insertText(text);
	};

	return editor;
};
