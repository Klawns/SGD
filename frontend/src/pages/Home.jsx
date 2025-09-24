import Button from "../components/Button";
import { CircleUser, CirclePlus, List, BarChart3 } from "lucide-react";

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
			<div className="container mx-auto px-6 py-16">
				<div className="flex flex-col items-center justify-center min-h-[80vh]">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold text-white mb-4">
							Seja bem-vindo(a) ao SGD
						</h1>
						<p className="text-gray-300 text-lg">
							Sistema de Gestão de Despesas
						</p>
					</div>

					<div className="grid grid-cols-4  gap-4 max-w-4xl w-full">
						<Button
							icon={CirclePlus}
							text="Adicionar Despesa"
							path="/adicionar-despesas"
							variant="secondary"
							className=""
						/>
						<Button
							icon={List}
							text="Lista de Despesas"
							path="/listar-despesas"
							variant="secondary"
						/>
						<Button
							icon={BarChart3}
							text="Relatórios"
							path="/relatorios"
							variant="secondary"
							className="flex-1"
						/>

						<Button
							icon={CircleUser}
							text="Conta"
							path="/conta"
							variant="secondary"
							className="flex-1"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
