"use client";

import { useSlate } from "slate-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	BoldIcon,
	BulletedListIcon,
	CodeIcon,
	ItalicIcon,
	QuoteIcon,
	StrikethroughIcon,
	UnderlineIcon,
} from "@/components/ui/icons";
import { UpdatedEditor } from "@/lib/helpers";
import { CustomEditor, CustomElement } from "@/lib/slate";
import { format } from "path";

export function Toolbar() {
	const editor: CustomEditor = useSlate();
	const isMarkActive = (format: string) => {
		const marks = UpdatedEditor.marks(editor) as {
			[key: string]: boolean;
		};

		return marks ? marks[format] === true : false;
	};

	function setMark(format: string) {
		UpdatedEditor.toggleMark(editor, format);
	}

	const isBlockActive = (format: CustomElement["type"]) => {
		return UpdatedEditor.isBlockType(editor, format);
	};

	function setBlock(format: CustomElement["type"]) {
		UpdatedEditor.toggleBlock(editor, format);
	}

	return (
		<section className="fixed mx-auto bottom-10 bg-gradient-to-b from-rose-200 to-rose-300 border border-rose-300 inset-x-0 w-fit p-1 rounded-full flex justify-around gap-1 z-20">
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", isMarkActive("bold") && "bg-rose-300")}
				onClick={() => setMark("bold")}
			>
				<BoldIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", isMarkActive("italic") && "bg-rose-300")}
				onClick={() => setMark("italic")}
			>
				<ItalicIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					"rounded-full",
					isMarkActive("underline") && "bg-rose-300"
				)}
				onClick={() => setMark("underline")}
			>
				<UnderlineIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					"rounded-full",
					isMarkActive("strikethrough") && "bg-rose-300"
				)}
				onClick={() => setMark("strikethrough")}
			>
				<StrikethroughIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", isMarkActive("code") && "bg-rose-300")}
				onClick={() => setMark("code")}
			>
				<CodeIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", isBlockActive("quote") && "bg-rose-300")}
				onClick={() => setBlock("quote")}
			>
				<QuoteIcon className="w-5 h-5" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				className={cn("rounded-full", isBlockActive("li") && "bg-rose-300")}
				onClick={() => setBlock("li")}
			>
				<BulletedListIcon className="w-5 h-5" />
			</Button>
		</section>
	);
}
