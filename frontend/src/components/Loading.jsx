import { MoonLoader } from "react-spinners";

export function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<MoonLoader color="#2563eb" size={50} />;
		</div>
	);
}
