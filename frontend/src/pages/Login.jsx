import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import { useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import api from "../services/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import ShowPasswordButton from "../components/ShowPasswordButton";
import { useState } from "react";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);

	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			usuario: "",
			senha: "",
		},
	});

	const mutation = useMutation({
		mutationFn: async (data) => {
			try {
				const response = await api.post("/auth/login", {
					username: data.usuario,
					password: data.senha,
				});
				return response;
			} catch (err) {
				if (err.response) {
					throw err.response;
				} else {
					throw err;
				}
			}
		},
		onSuccess: () => {
			handleLoginSuccess();
		},
		onError: (err) => {
			handleLoginError(err);
		},
	});

	const onSubmit = (data) => mutation.mutate(data);

	const loginToast = useToast();

	const navigate = useNavigate();

	const handleLoginSuccess = () => {
		loginToast.trigger({
			type: "success",
			message: "Login com sucesso!",
		});
		navigate("/");
	};

	const handleLoginError = (err) => {
		loginToast.trigger({
			type: "error",
			message: err?.data || "Não foi possível realizar login.",
		});
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<div className="w-full max-w-xl px-4">
				<Toast
					show={loginToast.show}
					type={loginToast.type}
					message={loginToast.message}
				/>
				<Header
					title="Entrar"
					p="Preencha os dados abaixo para entrar em sua conta"
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
							placeholder="Digite seu usuário"
						/>
						<div className="relative flex flex-row items-en">
							<FormInput
								name="senha"
								control={control}
								rules={{ required: "Senha é obrigatória" }}
								label="Senha"
								type={showPassword ? "text" : "password"}
								placeholder="Digite sua senha"
							/>
							<ShowPasswordButton showPassword={showPassword} setShowPassword={setShowPassword} />

						</div>

						<p className="text-gray-400 text-sm text-center">
							Não tem conta?{" "}
							<a
								href="/register"
								className="text-blue-500 hover:underline"
							>
								Registrar-se
							</a>
						</p>

						<div className="flex justify-end mt-2">
							<button
								type="submit"
								disabled={mutation.isPending}
								className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
							>
								{mutation.isPending ? "Entrando..." : "Entrar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
