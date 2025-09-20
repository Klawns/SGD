import Button from "./Button";
import { ArrowLeft } from "lucide-react";

export default function Header(props) {
  return (
    <header className="flex items-center gap-4 mb-6">
      {props.back && <Button icon={ArrowLeft} text={"Voltar"} path={"/"} variant="secondary" /> }
      <div className="text-white">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
        <p className="text-gray-300 text-sm">{props.p}</p>
      </div>
    </header>
  );
}
