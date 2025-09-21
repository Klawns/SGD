import { Controller } from "react-hook-form";
import Input from "./Input";

export default function FormInput({ name, control, rules, label, type = "text", placeholder }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <Input
            {...field}
            label={label}
            type={type}
            placeholder={placeholder}
            variant="textWhite"
          />
          {fieldState.error && (
            <p className="absolute text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
