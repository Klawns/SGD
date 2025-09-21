import { rangePages } from "../utils/rangePages";

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {
	const changePage = (page) => {
		if (page < 1 || page > totalPages) return;
		setCurrentPage(page);
	};

	return (
		<div className="absolute left-[50%] translate-x-[-50%] top-[85%]">
			<div className="flex gap-1">
				<button
					className="bg-blue-600 text-white font-bold px-4 py-2 rounded-[7px]"
					onClick={() => changePage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Anterior
				</button>

				{rangePages(totalPages, currentPage).map((page, index) =>
					typeof page === "number" ? (
						<button
							className={`bg-blue-700 text-white font-bold px-4 py-2 rounded-[7px] ${
								currentPage === page ? "bg-blue-900" : ""
							}`}
							onClick={() => setCurrentPage(page)}
							key={index}
						>
							{page}
						</button>
					) : (
						<span key={index} className="px-2 py-2 text-white">
							...
						</span>
					)
				)}

				<button
					className="bg-blue-600 text-white font-bold px-4 py-2 rounded-[7px]"
					onClick={() => changePage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Próximo
				</button>
			</div>
		</div>
	);
}
