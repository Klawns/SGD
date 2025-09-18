import Header from "../../components/Header";
import CardDespesa from "../../components/Card";

export default function ListasDespesas() {
  const bazingos = [
    {
      descricao: "Pizza",
      valor: 50.0,
      data: "2025-09-16",
      categoria: "Alimentação",
      formaPagamento: "Cartão Credito",
      parcelas: "3",
    },
    {
      descricao: "bazingo",
      valor: 50.0,
      data: "2025-09-17",
      categoria: "Alimentação",
      formaPagamento: "Cartão Debito",
    },
    {
      descricao: "Pizza",
      valor: 50.0,
      data: "2025-09-16",
      categoria: "Alimentação",
      formaPagamento: "Cartão Credito",
      parcelas: "3",
    },
    {
      descricao: "bazingo",
      valor: 50.0,
      data: "2025-09-17",
      categoria: "Alimentação",
      formaPagamento: "Cartão Debito",
    },
    {
      descricao: "Pizza",
      valor: 50.0,
      data: "2025-09-16",
      categoria: "Alimentação",
      formaPagamento: "Cartão Credito",
      parcelas: "3",
    },
    {
      descricao: "bazingo",
      valor: 50.0,
      data: "2025-09-17",
      categoria: "Alimentação",
      formaPagamento: "Cartão Debito",
    },
    {
      descricao: "Pizza",
      valor: 50.0,
      data: "2025-09-16",
      categoria: "Alimentação",
      formaPagamento: "Cartão Credito",
      parcelas: "3",
    },
    {
      descricao: "bazingo",
      valor: 50.0,
      data: "2025-09-17",
      categoria: "Alimentação",
      formaPagamento: "Cartão Debito",
    },
    {
      descricao: "Pizza",
      valor: 50.0,
      data: "2025-09-16",
      categoria: "Alimentação",
      formaPagamento: "Cartão Credito",
      parcelas: "3",
    },
  ];
  return (
    <div className="min-h-screen w-full p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
      <Header
        title="Lista de Despesas"
        p="Aqui aparecerá a lista de suas despesas"
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bazingos.map((item, i) => (
          <CardDespesa key={i} despesa={item} />
        ))}
      </div>
    </div>
  );
}
