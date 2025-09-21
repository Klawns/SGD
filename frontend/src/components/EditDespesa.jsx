import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { constants } from "../constants/constants";
import { formatDateBR } from "../utils/formateDateBR";
import { formatDate } from "../utils/formatDate";

export default function EditDespesa({
	despesa,
	close,
	handleEditSuccess,
	handleEditError,
}) {
	const queryClient = useQueryClient();
	const { control, handleSubmit, watch, reset, getValues } = useForm({
		defaultValues: {
			descricao: despesa.descricao || "",
			valor: despesa.valor || "",
			data: formatDate(despesa.data) || "",
			categoria: despesa.categoria || "",
			formaPagamento: despesa.formaPagamento || "",
			parcelas: despesa.parcelas || "",
		},
	});

	const formaPagamento = watch("formaPagamento");

	const normalizeData = (data) => ({
		...data,
		data: formatDateBR(data.data),
		valor: parseFloat(data.valor),
		parcelas: data.parcelas ? Number(data.parcelas) : 0,
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			const payload = normalizeData(data);
			return await api.put(`/despesas/${despesa.id}`, payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["despesas"]);
			handleEditSuccess();
			close();
		},
		onError: () => {
			handleEditError(true);
		},
	});

	const onSubmit = (data) => mutation.mutate(data);

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl">
				<h1 className="text-white text-2xl font-semibold mb-4">
					Editar Despesa
				</h1>

				<form
					className="grid grid-cols-1 gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormInput
						name="descricao"
						control={control}
						rules={{ required: "Descrição é obrigatória" }}
						label="Descrição"
						placeholder="Adicione a descrição"
					/>

					<FormInput
						name="valor"
						control={control}
						rules={{ required: "Valor é obrigatório" }}
						label="Valor"
						placeholder="Adicione o valor"
						type="number"
					/>

					<FormInput
						name="data"
						control={control}
						rules={{
							required: "Data é obrigatória",
							validate: (value) =>
								!(new Date(value) > new Date()) ||
								"Data inválida",
						}}
						label="Data"
						type="date"
					/>

					<FormSelect
						name="categoria"
						control={control}
						rules={{ required: "Categoria é obrigatória" }}
						label="Categoria"
						options={constants.categorias}
					/>

					<FormSelect
						name="formaPagamento"
						control={control}
						rules={{ required: "Forma de pagamento é obrigatória" }}
						label="Forma de Pagamento"
						options={constants.pagamento}
					/>

					{formaPagamento?.toLowerCase().includes("credito") && (
						<FormInput
							name="parcelas"
							control={control}
							rules={{
								required: "Parcelas obrigatórias para crédito",
							}}
							label="Parcelas"
							placeholder="Quantas parcelas?"
							type="number"
						/>
					)}

					<div className="flex justify-end mt-2 items-center gap-3">
						<button
							type="submit"
							disabled={mutation.isPending}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
						>
							{mutation.isPending ? "Salvando..." : "Salvar"}
						</button>

						<button
							type="button"
							onClick={close}
							className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
