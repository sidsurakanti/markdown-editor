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
