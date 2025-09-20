import api from "./api";

export default async function deleteDespesaById(id) {
	await api.delete(`/despesas/${id}`)
	console.log('bro excluiu')
}