import Header from "../components/Header";
import { useEffect, useState } from "react";
import { constants } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { useForm } from "react-hook-form";
import Toast from "../components/Toast";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import { formatDateBR } from "../utils/formateDateBR";

export default function AddDespesas() {
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	const { control, handleSubmit, watch, reset, getValues } = useForm({
		defaultValues: {
			descricao: "",
			valor: "",
			data: "",
			categoria: "",
			formaPagamento: "",
			parcelas: "",
		},
	});

	console.log(watch("data"));

	useEffect(() => {
		if (isSuccess || isError) {
			const timer = setTimeout(() => {
				setIsSuccess(false);
				setIsError(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isSuccess, isError]);

	const formaPagamento = watch("formaPagamento");

	useEffect(() => {
		if (!formaPagamento?.toLowerCase().includes("credito")) {
			reset({ ...getValues(), parcelas: "" });
		}
	}, [formaPagamento, reset]);

	const mutation = useMutation({
		mutationFn: async (data) => {
			const payload = normalizeData(data);
			const response = await api.post("/despesas", payload);
			return response;
		},
		onSuccess: () => {
			setIsSuccess(true);
			reset({
				descricao: "",
				valor: "",
				data: "",
				categoria: "",
				formaPagamento: "",
				parcelas: "",
			});
		},
		onError: () => {
			setIsError(true);
		},
	});

	const onSubmit = (data) => mutation.mutate(data);

	const normalizeData = (data) => ({
		...data,
		data: formatDateBR(data.data),
		valor: parseFloat(data.valor),
		parcelas: data.parcelas ? Number(data.parcelas) : 0,
	});

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<Toast
				show={isSuccess}
				type="success"
				message="Despesa adicionada com sucesso!"
			/>
			<Toast
				show={isError}
				type="error"
				message="Não foi possível adicionar despesa."
			/>

			<div className="w-full max-w-xl px-4">
				<Header
					title="Adicione Despesa"
					p="Registre uma nova despesa"
					back={true}
				/>
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg">
					<form
						className="grid grid-cols-1 gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormInput
							name="descricao"
							control={control}
							rules={{ required: "Descrição é obrigatória"}}
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
							rules={{ required: "Data é obrigatória", validate: (value) => !(new Date(value) > new Date()) || "Data inválida" }}
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
							rules={{
								required: "Forma de pagamento é obrigatória",
							}}
							label="Forma de Pagamento"
							options={constants.pagamento}
						/>

						{watch("formaPagamento")
							?.toLowerCase()
							.includes("credito") && (
							<FormInput
								name="parcelas"
								control={control}
								rules={{
									required:
										"Parcelas obrigatórias para crédito",
								}}
								label="Parcelas"
								placeholder="Quantas parcelas?"
								type="number"
							/>
						)}

						<div className="flex justify-end mt-2">
							<button
								type="submit"
								disabled={mutation.isPending}
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
							>
								{mutation.isPending ? "Salvando..." : "Salvar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
