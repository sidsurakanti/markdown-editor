import { Editor, Transforms, Element, insertBreak, Range } from "slate";
import type {
	CustomEditor,
	CustomElement,
	CustomText,
	Node,
	NodeEntry,
} from "@/lib/definitions";

export const UpdatedEditor = {
	...Editor,
	isMarkActive: function (editor: CustomEditor, format: string): boolean {
		const marks = Editor.marks(editor) as {
			[key: string]: boolean;
		};
		return marks ? marks[format] === true : false;
	},

	toggleMark: function (editor: CustomEditor, format: string): void {
		const isActive = this.isMarkActive(editor, format);
		if (isActive) {
			Editor.removeMark(editor, format);
		} else {
			Editor.addMark(editor, format, true);
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
			{ type: isActive ? undefined : "code" },
			{ match: (n: Node) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},

	isQuoteBlock: function (editor: CustomEditor): boolean {
		const [match]: Generator<NodeEntry<Node>> = Editor.nodes(editor, {
			match: (n: Node) => Element.isElement(n) && n.type === "quote",
		});

		return !!match;
	},

	toggleQuoteBlock: function (editor: CustomEditor): void {
		const isActive = this.isQuoteBlock(editor);

		Transforms.setNodes(
			editor,
			{ type: isActive ? undefined : "quote" },
			{ match: (n: Node) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},

	isBlockType: function (
		editor: CustomEditor,
		type: CustomElement["type"]
	): boolean {
		const [match]: Generator<NodeEntry<Node>> = Editor.nodes(editor, {
			match: (n: Node) => Element.isElement(n) && n.type === type,
		});
		return !!match;
	},

	toggleBlock: function (
		editor: CustomEditor,
		type: CustomElement["type"]
	): void {
		const isActive = this.isBlockType(editor, type);

		Transforms.setNodes(
			editor,
			{ type: isActive ? undefined : type },
			{ match: (n: Node) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},
};
