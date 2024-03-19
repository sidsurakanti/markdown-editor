const DefaultElement = (props: any) => {
	return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes} className="p-2 rounded-xl bg-gray-200">
			<code>{props.children}</code>
		</pre>
	);
};

export { DefaultElement, CodeElement };
