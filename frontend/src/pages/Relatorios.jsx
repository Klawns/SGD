import Header from "../components/Header";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";

export default function Relatorios() {
	const { control, watch, handleSubmit } = useForm({
		defaultValues: {
			dataInicial: "",
			dataFinal: "",
		},
	});

	const onSubmit = (data, e) => {
		e.preventDefault();
		const url = `http://localhost:8080/api/despesas/relatorio?dataInicial=${data.dataInicial}&dataFinal=${data.dataFinal}`;
		window.location.href = url;
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<div className="w-full max-w-xl px-4">
				<Header
					title="Relatórios"
					p="Gere o relatório de suas despesas"
					back={true}
				/>
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col items-start gap-4"
					>
						<FormInput
							name="dataInicial"
							control={control}
							rules={{
								required: "Data inicial é obrigatória",
								validate: (value) =>
									!(new Date(value) > new Date()) ||
									"Data inválida",
							}}
							label="Data inicial"
							type="date"
						/>
						<FormInput
							name="dataFinal"
							control={control}
							rules={{
								required: "Data final é obrigatória",
								validate: {
									notFuture: (value) =>
										new Date(value) <= new Date() ||
										"Data inválida",
									afterStartDate: (value) => {
										const startDate = new Date(
											watch("dataInicial")
										);
										const endDate = new Date(value);
										return (
											endDate >= startDate ||
											"Data inicial deve ser depois da data final"
										);
									},
								},
							}}
							label="Data final"
							type="date"
						/>
						<button
							type="submit"
							className="w-full mt-3 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
						>
							Gerar relatório
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
