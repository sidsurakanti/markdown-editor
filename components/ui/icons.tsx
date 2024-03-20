import { SVGProps } from "react";

export function BoldIcon(
	props: SVGProps<SVGSVGElement>
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M8.8 19q-.825 0-1.412-.587T6.8 17V7q0-.825.588-1.412T8.8 5h3.525q1.625 0 3 1T16.7 8.775q0 1.275-.575 1.963t-1.075.987q.625.275 1.388 1.025T17.2 15q0 2.225-1.625 3.113t-3.05.887zm1.025-2.8h2.6q1.2 0 1.463-.612t.262-.888q0-.275-.262-.887T12.35 13.2H9.825zm0-5.7h2.325q.825 0 1.2-.425t.375-.95q0-.6-.425-.975t-1.1-.375H9.825z"
			></path>
		</svg>
	);
}


export function UnderlineIcon(
	props: SVGProps<SVGSVGElement>
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M6 21q-.425 0-.712-.288T5 20q0-.425.288-.712T6 19h12q.425 0 .713.288T19 20q0 .425-.288.713T18 21zm6-4q-2.525 0-3.925-1.575t-1.4-4.175V4.275q0-.525.388-.9T7.975 3q.525 0 .9.375t.375.9V11.4q0 1.4.7 2.275t2.05.875q1.35 0 2.05-.875t.7-2.275V4.275q0-.525.388-.9T16.05 3q.525 0 .9.375t.375.9v6.975q0 2.6-1.4 4.175T12 17"
			></path>
		</svg>
	);
}

export function ItalicIcon(
	props: SVGProps<SVGSVGElement>
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M6.25 19q-.525 0-.888-.363T5 17.75q0-.525.363-.888t.887-.362H9l3-9H9.25q-.525 0-.888-.363T8 6.25q0-.525.363-.888T9.25 5h7.5q.525 0 .888.363T18 6.25q0 .525-.363.888t-.887.362H14.5l-3 9h2.25q.525 0 .888.363t.362.887q0 .525-.363.888T13.75 19z"
			></path>
		</svg>
	);
}