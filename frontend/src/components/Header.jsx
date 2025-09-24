import Button from "./Button";
import { ArrowLeft } from "lucide-react";

export default function Header({back, title, p}) {
  return (
    <header className="flex items-center gap-4 mb-6">
      {back && <Button icon={ArrowLeft} text={"Voltar"} path={"/"} variant="secondary" /> }
      <div className="text-white">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-gray-300 text-sm">{p}</p>
      </div>
    </header>
  );
}
