import { Eye, EyeClosed } from "lucide-react";

export default function ShowPasswordButton({ showPassword, setShowPassword }) {
	return (
		<>
			{showPassword ? (
				<Eye
					onClick={() => setShowPassword(false)}
					className="absolute right-2 bottom-1 cursor-pointer"
					size={30}
					color="white"
				/>
			) : (
				<EyeClosed
					onClick={() => setShowPassword(true)}
					className="absolute right-2 bottom-1 cursor-pointer"
					size={30}
					color="white"
				/>
			)}
		</>
	);
}
