import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export default function DeleteDespesa(props) {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: async () => {
			await api.delete(`/despesas/${props.id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["despesas"]);
			props.handleDeleteSuccess();
			props.close();
		},
		onError: () => {
			props.handleDeleteError();
		}
	});

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-xl">
			<div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center w-[250px]">
				<p className="text-white font-medium mb-4">
					Quer deletar mesmo?
				</p>
				<div className="flex justify-center gap-3">
					<button
						onClick={() => deleteMutation.mutate()}
						className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
					>
						Deletar
					</button>
					<button
						onClick={props.close}
						className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
}
