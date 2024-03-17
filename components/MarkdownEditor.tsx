import { ChangeEvent } from "react";

interface Props {
	value: string;
	onValueChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function MarkdownEditor({ value, onValueChange }: Props) {
	return (
		<textarea
			value={value}
			onChange={onValueChange}
			className="flex-1 focus:outline-none p-4 rounded-md bg-gray-100 border border-border text-xl h-full resize-none overflow-y-scroll"
			placeholder="Type some markdown here..."
		></textarea>
	);
}
