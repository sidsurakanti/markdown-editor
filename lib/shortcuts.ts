import { Node, Element, Editor, Transforms, Range } from "slate";
import { CustomEditor, FormattedText, type CustomElement } from "@/lib/slate";

export function withShortcuts(editor: CustomEditor) {
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
				const isCodeBlock: boolean = block.type === "code";
				const isListItem: boolean = block.type === "ul" || block.type === "ol";

				// console.log(block.type);
				// console.log(aboveBlockEmpty, block.type, block.children[0].text);
				// console.log(block.children[0].text);

				if (isCodeBlock) {
					const aboveBlock = block.children[0] as FormattedText;
					const aboveBlockEmpty: boolean = aboveBlock.text
						? aboveBlock.text.endsWith("\n")
						: true;
					if (aboveBlockEmpty) {
						Transforms.insertNodes(editor, {
							children: [{ text: "" }],
							type: "paragraph",
						});

						// TODO: remove empty line from before (maybe)
						return;
					}

					// console.log("inserting new line in code block");
					Transforms.insertFragment(editor, [{ text: "\n" }]);
					return;
				}

				if (isListItem) {
					Transforms.insertNodes(editor, {
						children: [{ text: "" }],
						type: block.type === "li" ? "li" : "ol-li",
					});

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
			"-": "li",
			"1.": "ol-li",
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

				Transforms.setNodes(editor, newElement, {
					match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
				});

				if (elementType === "hr") {
					const isBlockBelow: boolean = Boolean(Editor.after(editor, range));
					if (!isBlockBelow) {
						editor.insertBreak(); // new line after break
					}
					return;
				}

				if (elementType === "li" || elementType === "ol-li") {
					const wrapper: CustomElement = {
						type: elementType === "li" ? "ul" : "ol",
						children: [],
					};

					Transforms.wrapNodes(editor, wrapper, {
						match: (n) => !Editor.isEditor(n) && Element.isElement(n),
					});
					return;
				}

				return;
			}
		}

		insertText(text);
	};

	return editor;
}
