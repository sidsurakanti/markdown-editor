import { cn } from "@/lib/utils";

export const Heading1 = {
	className: "text-5xl font-bold",
};

export const Heading2 = {
	className: "text-4xl font-bold",
};

export const Heading3 = {
	className: "text-3xl font-bold",
};

export const Heading4 = {
	className: "text-2xl font-bold",
};

export const Heading5 = {
	className: "text-xl font-bold",
};

export const Heading6 = {
	className: "text-lg font-bold",
};

export const Link = {
	className: "text-blue-500 underline underline-offset-4",
};

export const BlockQuote = {
	className: "border-l-4 border-gray-500 pl-3",
};

export const InlineCode = {
	className: "bg-sky-200 text-sky-950 rounded-md p-1",
};

// have to override the code styles in the code block in globals.css
// otherwise you'll have the styles for inline code will apply for the code block
export const CodeBlock = {
	className: "bg-gray-800 text-white rounded-md p-4",
};

export const HorizontalRule = {
	className: "border-t-1 border-gray-400",
};

export const UnorderedList = ({
	children,
	className,
	...props
}: {
	children: Readonly<React.ReactNode>;
	className?: string;
}) => {
	const classes = cn("list-disc", className);

	return (
		<ul {...props} className={classes}>
			{children}
		</ul>
	);
};
export const OrderedList = ({
	children,
	className,
	...props
}: {
	children: Readonly<React.ReactNode>;
	className?: string;
}) => {
	const classes = cn("list-decimal block", className);

	return (
		<ul {...props} className={classes}>
			{children}
		</ul>
	);
};
