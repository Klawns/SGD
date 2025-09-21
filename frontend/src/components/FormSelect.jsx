import { Controller } from "react-hook-form";
import Select from "./Select";

export default function FormSelect({ name, control, rules, label, options }) {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field, fieldState }) => (
				<>
					<Select
						label={label}
						options={options}
						variant="textWhite"
						{...field}
					/>
					{fieldState.error && (
						<p className="-mt-3 text-red-500 text-sm">
							{fieldState.error.message}
						</p>
					)}
				</>
			)}
		/>
	);
}
