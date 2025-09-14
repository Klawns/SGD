import Input from "../../components/Input";
import Button from "../../components/app/ButtonHome";
export default function AddDespesas(){
    return (
        <div>
            <form>
                <h1>Adicione uma despesa</h1>
                <Input/> {/*Desc*/}
                <Input/> {/*Valor total*/}
                <Input/> {/*Categorias, depois função de addCategoria*/}
                <Input/> {/*Data*/}
                <Input/> {/*Forma de Pagamento, caso for credito adicionar uma novo input de parcelas*/}
                <Button text="Salvar Despesa"/>
            </form>
        </div>
    )
}