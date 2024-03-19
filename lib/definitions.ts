import exp from "constants";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type Node = CustomEditor | CustomElement | CustomText;

export type Path = number[];
export interface Point {
	path: Path;
	offset: number;
}

interface Range {
	anchor: Point;
	focus: Point;
}

export type NodeEntry<T extends Node> = [T, Path];

export type ParagraphElement = {
	type: "paragraph";
	children: CustomText[];
};

export type CodeElement = {
	type: "code";
	children: CustomText[];
};

export type HeadingElement = {
	type: "heading";
	level: number;
	children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement | CodeElement;

export type FormattedText = {
	text: string;
	bold?: true;
	italic?: true;
	underline?: true;
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
