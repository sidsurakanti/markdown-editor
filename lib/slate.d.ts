import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type Node = CustomEditor | CustomElement | CustomText;

type Path = number[];
interface Point {
	path: Path;
	offset: number;
}

interface Range {
	anchor: Point;
	focus: Point;
}

export type Location = Path | Point | Range;

export type NodeEntry<T extends Node> = [T, Path];

type ParagraphElement = {
	type: "paragraph";
	children: CustomText[];
};

type CodeBlock = {
	type: "code";
	children: CustomText[];
};

type HeadingElement = {
	type: "heading";
	level: number;
	children: CustomText[];
};

type QuoteElement = {
	type: "quote";
	children: CustomText[];
};

type HorizontalRuleElement = {
	type: "hr";
	children: CustomText[];
};

type ListElement = {
	type: "li";
	children: CustomText[];
};

type OLListElement = {
	type: "ol-li";
	children: CustomText[];
};

type BulletedListElement = {
	type: "ul";
	children: ListElement[];
};

type OrderedListElement = {
	type: "ol";
	children: OLListElement[];
};

export type CustomElement =
	| ParagraphElement
	| HeadingElement
	| CodeBlock
	| HorizontalRuleElement
	| ListElement
	| BulletedListElement
	| OrderedListElement
	| OLListElement
	| QuoteElement;

export type FormattedText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
	code?: true;
	strikethrough?: true;
};

export type CustomText = FormattedText;

export type CustomEditor = BaseEditor & ReactEditor;

declare module "slate" {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
