import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import api from "../services/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

export default function Register() {
	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			usuario: "",
			senha: "",
			confirmSenha: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				const response = await api.post("/auth/register", {
					username: data.usuario,
					password: data.senha,
				});
				return response;
			} catch (error) {
				if (error.response) {
					throw error.response
				}
				throw error
			}
		},
		onSuccess: (response) => {
			handleRegisterSuccess();
			console.log(response);
		},
		onError: (error) => {
			handleRegisterError(error);
			console.log(error);
		},
	});

	const onSubmit = (data) => mutation.mutate(data);

	const registerToast = useToast();

	const handleRegisterSuccess = () => {
		registerToast.trigger({
			type: "success",
			message: "Registro realizado com sucesso!",
		});
	};

	const handleRegisterError = (error) => {
		registerToast.trigger({
			type: "error",
			message: error?.data || "Não foi possível realizar o registro.",
		});
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<div className="w-full max-w-xl px-4">
				<Toast
					show={registerToast.show}
					type={registerToast.type}
					message={registerToast.message}
				/>
				<Header
					title="Criar conta"
					p="Preencha os dados abaixo para se registrar"
					back={false}
				/>
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg">
					<form
						className="grid grid-cols-1 gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormInput
							name="usuario"
							control={control}
							rules={{ required: "Usuário é obrigatória" }}
							label="Usuário"
							placeholder="Crie um nome de usuário"
						/>
						<FormInput
							name="senha"
							control={control}
							rules={{ required: "Senha é obrigatória" }}
							label="Senha"
							type="password"
							placeholder="Crie uma senha"
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
						/>

						<p className="text-gray-400 text-sm text-center">
							Já tem conta?{" "}
							<a
								href="/login"
								className="text-blue-500 hover:underline"
							>
								Entrar
							</a>
						</p>

						<div className="flex justify-end mt-2">
							<button
								type="submit"
								disabled={mutation.isPending}
								className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
							>
								{mutation.isPending
									? "Registrando..."
									: "Registrar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
