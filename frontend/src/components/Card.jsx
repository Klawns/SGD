export default function CardDespesa({ despesa }) {
  return (
    <div className="bg-gray-800/60 rounded-xl shadow-md hover:shadow-lg p-4 flex flex-col gap-2 transition-all duration-200 hover:bg-gray-800/80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          {despesa.descricao}
        </h2>
        <span className="text-blue-400 font-bold">
          R$ {despesa.valor.toFixed(2)}
        </span>
      </div>

      <p className="text-sm text-gray-400">{despesa.data}</p>

      <div className="flex gap-2 flex-wrap mt-2">
        <span className="px-3 py-1 rounded-full bg-gray-700 text-xs text-gray-300">
          {despesa.categoria}
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-700 text-xs text-gray-300">
          {despesa.formaPagamento}
        </span>
        {despesa.parcelas && (
          <span className="px-3 py-1 rounded-full bg-gray-700 text-xs text-gray-300">
            {despesa.parcelas}x
          </span>
        )}
      </div>
    </div>
  );
}
