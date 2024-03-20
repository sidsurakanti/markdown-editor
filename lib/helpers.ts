import { Editor, Transforms, Element } from "slate";
import type {
	CustomEditor,
	CustomText,
	Node,
	NodeEntry,
} from "@/lib/definitions";

export const UpdatedEditor = {
	...Editor,
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
			{ type: isActive ? undefined : "code" },
			{ match: (n: Node) => Element.isElement(n) && Editor.isBlock(editor, n) }
		);
	},
};
