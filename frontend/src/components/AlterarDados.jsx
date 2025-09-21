import { useState } from "react";
import FormInput from "./FormInput";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export default function AlterarDados(props) {
	const [alterarSenha, setAlterarSenha] = useState(false);
	const queryClient = useQueryClient();

	const { control, reset, handleSubmit, watch, getValues } = useForm({
		defaultValues: {
			usuario: props.usuario,
			senha: "",
			confirmSenha: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			const response = await api.put("/usuario", {
				username: data.usuario,
				password: data.senha,
			});
			return response;
		},
		onSuccess: (response) => {
			queryClient.invalidateQueries(["usuario"]);
			console.log(response);
			props.setAlterarDados(false);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onSubmit = (data) => mutation.mutate(data);

	const handleNotSenha = () => {
		setAlterarSenha(false);
		reset({ ...getValues(), senha: "", confirmSenha: "" });
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl">
				<h1 className="text-white text-2xl font-semibold mb-4">
					Alterar Dados
				</h1>
				<form
					className="grid grid-cols-1 gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormInput
						name="usuario"
						control={control}
						rules={{ required: "Usuário é obrigatória" }}
						label="Usuário"
						placeholder="Digite seu novo usuário"
					/>

					<div className="grid grid-cols-2 grid-rows-1 place-items-start">
						<div>
							<input
								type="checkbox"
								onChange={() =>
									alterarSenha
										? handleNotSenha()
										: setAlterarSenha(true)
								}
							/>
							<label className="text-white mb-2 place-self-start ml-1">
								Alterar senha
							</label>
						</div>
					</div>

					{alterarSenha && (
						<>
							<FormInput
								name="senha"
								control={control}
								rules={{ required: "Senha é obrigatória" }}
								label="Senha"
								type="password"
								placeholder="Digite sua nova senha"
							/>
							<FormInput
								name="confirmSenha"
								control={control}
								rules={{
									required: "Campo obrigatório",
									validate: (value) =>
										value === watch("senha") ||
										"As senhas não coincidem",
								}}
								type="password"
								placeholder="Confirme sua senha"
							/>{" "}
						</>
					)}

					<div className="flex justify-end mt-2 items-center gap-3">
						<button
							type="submit"
							// disabled={mutation.isPending}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
						>
							{/* {mutation.isPending ? "Salvando..." : "Salvar"} */}
							Alterar
						</button>
						<button
							onClick={() => props.setAlterarDados(false)}
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
