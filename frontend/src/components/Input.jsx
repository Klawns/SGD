export default function Input({
	label,
	variant,
	type,
	value,
	onChange,
	onBlur,
	name,
	placeholder,
}) {
	const variants = {
		textWhite: {
			label: "text-white",
			input: "bg-gray-700 text-white border-gray-600 placeholder-gray-300",
		},
		textNormal: {
			label: "text-gray-700",
			input: "bg-white text-gray-800 border-gray-300 placeholder-gray-500",
		},
	};

	const v = variants[variant] ?? variants.textWhite;

	return (
		<div className=" w-full">
			<label className={`${v.label} block text-sm font-medium mb-2`}>
				{label}
			</label>
			<input
				className={`${v.input} w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder-white text-white focus:ring-blue-500 focus:border-blue-400 transition-colors`}
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				name={name}
				placeholder={placeholder}
			/>
		</div>
	);
}
