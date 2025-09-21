import Header from "../components/Header";
import CardDespesa from "../components/Card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import api from "../services/api";
import Toast from "../components/Toast";
import EditDespesa from "../components/EditDespesa";
import DeleteDespesa from "../components/DeleteDespesa";
import { useToast } from "../hooks/useToast";
import { Search } from "lucide-react";

export default function ListasDespesas() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isError } = useQuery({
		queryKey: ["despesas", currentPage],
		queryFn: async () => {
			const response = await api.get("/despesas", {
				params: { page: currentPage - 1 },
			});
			return response.data;
		},
	});

	const [editingId, setEditingId] = useState(null);
	const [deletingId, setDeletingId] = useState(null);

	const editToast = useToast();
	const deleteToast = useToast();

	const handleEditSuccess = () => {
		editToast.trigger({
			type: "success",
			message: "Despesa editada com sucesso!",
		});
	};

	const handleEditError = () => {
		editToast.trigger({
			type: "error",
			message: "Não foi possível editar despesa.",
		});
	};

	const handleDeleteSuccess = () => {
		deleteToast.trigger({
			type: "success",
			message: "Despesa deletada com sucesso!",
		});
	};

	const handleDeleteError = () => {
		deleteToast.trigger({
			type: "error",
			message: "Não foi possível deletar despesa.",
		});
	};

	return (
		<div className="min-h-screen w-full p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<Toast
				show={editToast.show}
				type={editToast.type}
				message={editToast.message}
			/>

			<Toast
				show={deleteToast.show}
				type={deleteToast.type}
				message={deleteToast.message}
			/>

			<div className="flex flex-row justify-between items-center">
				<Header
					title="Lista de Despesas"
					p="Aqui aparecerá a lista de suas despesas"
					back={true}
				/>

				<div className="flex flex-row gap-3">
					<input type="text" className="rounded-md py-1 px-2 border-none outline-none bg-gray-700 text-white" />
					<Search cursor='pointer' color="white" strokeWidth={3} />
				</div>
			</div>

			{isLoading && <p className="text-center">carregando, bro</p>}
			{isError && <p className="text-center">porra</p>}
			{data?.empty && (
				<p className="text-center">Sem despesas para listar</p>
			)}

			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data?.content?.map((item) => (
					<div key={item.id}>
						<CardDespesa
							despesa={item}
							setWantEdit={(id) => setEditingId(id)}
							setWantDelete={(id) => setDeletingId(id)}
						/>

						{editingId === item.id && (
							<EditDespesa
								despesa={item}
								close={() => setEditingId(null)}
								handleEditSuccess={handleEditSuccess}
								handleEditError={handleEditError}
							/>
						)}

						{deletingId === item.id && (
							<DeleteDespesa
								id={item.id}
								close={() => setDeletingId(null)}
								handleDeleteError={handleDeleteError}
								handleDeleteSuccess={handleDeleteSuccess}
							/>
						)}
					</div>
				))}
			</div>

			{!data?.empty && (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={data?.totalPages ?? 1}
				/>
			)}
		</div>
	);
}
