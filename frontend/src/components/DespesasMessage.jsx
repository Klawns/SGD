export default function DespesaMessage({message, children}) {
	return (
		<div className="h-[700px] gap-3 flex justify-center items-center flex-col">
			<h1 className="text-2xl text-white font-semibold">
				{message}
			</h1>
			{children}
		</div>
	);
}
