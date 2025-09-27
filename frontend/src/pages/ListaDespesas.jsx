import Header from "../components/Header";
import CardDespesa from "../components/Card";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import api from "../services/api";
import Toast from "../components/Toast";
import EditDespesa from "../components/EditDespesa";
import DeleteDespesa from "../components/DeleteDespesa";
import { useToast } from "../hooks/useToast";
import { Search, CirclePlus } from "lucide-react";
import { formatDateBR } from "../utils/formateDateBR";
import Button from "../components/Button";
import DespesaMessage from "../components/DespesasMessage";
import { Loading } from "../components/Loading";
import { formatCurrencyToBR } from "../utils/formatCurrencyToBR";

export default function ListasDespesas() {
	const [currentPage, setCurrentPage] = useState(1);
	const [dataInicio, setDataInicio] = useState("");
	const [dataFim, setDataFim] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const { data: valorTotal, isLoading: loadingTotal } = useQuery({
		queryKey: ["valorTotal"],
		queryFn: async () => {
			const response = await api.get("/despesas/valorTotal");
			return response.data;
		},
	});

	const { data, isLoading, isError } = useQuery({
		queryKey: ["despesas", currentPage, dataInicio, dataFim, searchTerm],
		queryFn: async () => {
			let searchParam = "";

			if (dataInicio && dataFim) {
				searchParam = `${formatDateBR(dataInicio)} - ${formatDateBR(
					dataFim
				)}`;
			} else if (dataInicio) {
				searchParam = formatDateBR(dataInicio);
			} else {
				searchParam = searchTerm;
			}

			const response = await api.get("/despesas", {
				params: {
					page: currentPage - 1,
					search: searchParam,
				},
			});

			return response.data;
		},
	});

	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries(["despesas"]);
	}, [currentPage, dataInicio, dataFim, searchTerm]);

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

				<div className="flex flex-row gap-3 items-center">
					<input
						className="bg-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder-white text-white focus:ring-blue-500 focus:border-blue-400 transition-colors"
						type="date"
						onChange={(e) => setDataInicio(e.target.value)}
						name=""
						id=""
					/>
					<input
						className="bg-gray-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 placeholder-white text-white focus:ring-blue-500 focus:border-blue-400 transition-colors"
						type="date"
						onChange={(e) => setDataFim(e.target.value)}
						name=""
						id=""
					/>
					<input
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
						type="text"
						className="rounded-md py-2 px-3 border-none outline-none bg-gray-700 text-white"
					/>
					<Search
						cursor="pointer"
						color="white"
						strokeWidth={3}
						onClick={() =>
							queryClient.invalidateQueries(["despesas"])
						}
					/>
				</div>
			</div>

			{isLoading && <Loading />}
			{isError && (
				<DespesaMessage message="Não foi possível listar as despesas" />
			)}
			{data?.empty && (
				<div>
					<DespesaMessage message="Sem despesas para listar">
						<Button
							icon={CirclePlus}
							text="Adicionar Despesa"
							path="/adicionar-despesas"
						/>
					</DespesaMessage>
				</div>
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
				<>
					<div className="text-white rounded-xl py-2 px-4 bg-gray-800/60 w-48 flex flex-col justify-center items-center absolute bottom-20">
						<p className="font-semibold">Valor total:</p>
						<span className="text-blue-400 font-bold">
							{loadingTotal
								? "Carregando..."
								: formatCurrencyToBR(valorTotal)}
						</span>
					</div>
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPages={data?.totalPages ?? 1}
					/>
				</>
			)}
		</div>
	);
}
