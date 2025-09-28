import { LoadingCircle } from "../components/LoadingCircle";

export default function Loading() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<LoadingCircle />
		</div>
	);
}
