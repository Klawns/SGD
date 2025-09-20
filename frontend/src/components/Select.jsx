import { ChevronDown } from "lucide-react";

export default function Select({
	label,
	options,
	variant = "textWhite",
	value,
	onChange,
	onBlur,
	name,
}) {
	const variants = {
		textWhite: {
			label: "text-white",
			select: "bg-gray-700 text-white border-gray-600",
			placeholder: "text-gray-300",
		},
		textNormal: {
			label: "text-gray-800",
			select: "bg-white text-gray-800 border-gray-300",
			placeholder: "text-gray-600",
		},
	};

	const v = variants[variant] ?? variants.textWhite;

	return (
		<div className="mb-4 w-full">
			<label className={`${v.label} block text-sm font-medium mb-2`}>
				{label}
			</label>
			<div className="relative">
				<select
					className={`${v.select} appearance-none w-full px-4 py-2 pr-10 rounded-lg shadow-sm focus:outline-none`}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					name={name}
				>
					<option className={v.placeholder} value="">
						Selecione...
					</option>
					{options.map((option, i) => (
						<option
							key={i}
							value={option.toLowerCase()}
							className={`${v.select} w-full px-3 py-2 border border-gray-300 rounded-lg`}
						>
							{option}
						</option>
					))}
				</select>
				<div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
					<ChevronDown
						size={18}
						className={
							variant === "textWhite"
								? "text-gray-200"
								: "text-gray-500"
						}
					/>
				</div>
			</div>
		</div>
	);
}
