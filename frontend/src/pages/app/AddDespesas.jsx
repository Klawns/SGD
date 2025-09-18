import Header from "../../components/Header";
import Input from "../../components/Input";
import { useState } from "react";
import Select from "../../components/Select";

export default function AddDespesas() {
  const categorias = [
    "Lazer",
    "Trabalho",
    "Educação",
    "Alimentação",
    "Saúde",
    "Outros",
  ];
  const pagamento = ["Dinheiro", "Cartão Débito", "Cartão Credito", "Pix"];

  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [pag, setPag] = useState("");
  const [cat, setCat] = useState("");
  const [date, setDate] = useState("");
  const [parcela, setParcela] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-10 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-xl px-4">
        <Header title="Adicione Despesa" p="Registre uma nova despesa" />
        <main className="bg-gray-800/60 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 gap-4">
            <Input
              label={"Descrição"}
              type={"text"}
              value={desc}
              placeholder={"Adicione a descrição"}
              setThing={setDesc}
              variant="textWhite"
            />

            <Input
              label={"Valor"}
              type={"number"}
              value={value}
              placeholder={"Adicione o valor"}
              setThing={setValue}
              variant="textWhite"
            />

            <Input
              label={"Data"}
              type={"date"}
              value={date}
              placeholder={"Coloque a data"}
              setThing={setDate}
              variant="textWhite"
            />

            <Select
              label="Categoria"
              value={cat}
              onChange={setCat}
              options={categorias}
              variant="textWhite"
            />

            <Select
              label="Forma de Pagamento"
              value={pag}
              onChange={setPag}
              options={pagamento}
              variant="textWhite"
            />

            {pag && pag.toLowerCase().includes("credito") && (
              <Input
                label="Parcelas"
                value={parcela}
                setThing={setParcela}
                type="text"
                placeholder="Quantas parcelas?"
                variant="textWhite"
              />
            )}

            <div className="flex justify-end mt-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Salvar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
