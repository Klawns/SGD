import api from "../services/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../components/Header";
import { useState } from "react";
import AlterarDados from "../components/AlterarDados";
import { useNavigate } from "react-router-dom";

export default function Conta() {
	const [showPassword, setShowPassword] = useState(false);
	const [alterarDados, setAlterarDados] = useState(false);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["conta"],
		queryFn: async () => await api.get("/usuario"),
		staleTime: 1000 * 60 * 60,
		
	});

	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: async () => await api.post("/auth/logout"),
		onSuccess: () => navigate(0),
		onError: (error) => console.log(error)
	})

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
			<div className="w-full max-w-xl px-4">
				<Header
					title="Conta"
					p="Aqui estão os dados da sua conta"
					back={true}
				/>

				{alterarDados && (
					<AlterarDados usuario={data?.data.username} setAlterarDados={setAlterarDados} />
				)}

				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg">
					<div className="grid grid-cols-1 gap-4 mb-7">
						<div className="flex flex-row items-center gap-2">
							<h1 className="text-xl font-semibold text-white">
								Usuário:
							</h1>
							<p className="text-gray-300 text-xl">
								{data?.data.username}
							</p>
						</div>
						<div className="flex flex-row justify-between items-center">
							<div className="flex flex-row items-center gap-2">
								<h1 className="text-xl font-semibold text-white">
									Senha:
								</h1>
								<input
									type={showPassword ? "text" : "password"}
									value="bro, pode mostrar não"
									className="bg-transparent text-gray-300 text-xl border-none outline-none "
									readOnly
								/>
							</div>
							<button
								onClick={() =>
									showPassword
										? setShowPassword(false)
										: setShowPassword(true)
								}
								className="bg-blue-800  text-nowrap  hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
							>
								{showPassword ? "Ocultar senha" : "Ver senha"}
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<button
						onClick={() => setAlterarDados(true)}
						className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
					>
						Alterar dados
					</button>
					<button
						onClick={() => mutation.mutate()}
						className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg"
					>
						Sair
					</button>
					</div>
				</div>
			</div>
		</div>
	);
}
