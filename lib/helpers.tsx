import { Editor, Transforms, Element } from "slate";
import type { CustomEditor, CustomElement, Node, NodeEntry } from "@/lib/slate";
import {
	QuoteBlock,
	CodeBlock,
	DefaultBlock,
	HeadingElement,
	HorizontalRule,
	WrapperBlock,
	ListElement,
	BulletedListElement,
	OrderedListElement,
} from "@/components/Components";
import { RenderElementProps } from "slate-react";

export const ExtendedEditor = {
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

export function whichElement(props: RenderElementProps): JSX.Element {
	const { type } = props.element as CustomElement;

	switch (type) {
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
		case "li":
			return <ListElement {...props} />;
		case "ol-li":
			return <ListElement {...props} />;
		case "ul":
			return (
				<WrapperBlock>
					<BulletedListElement {...props} />
				</WrapperBlock>
			);
		case "ol":
			return (
				<WrapperBlock>
					<OrderedListElement {...props} />
				</WrapperBlock>
			);
		default:
			return (
				<WrapperBlock>
					<DefaultBlock {...props} />
				</WrapperBlock>
			);
	}
}
