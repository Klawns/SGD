import InputAuth from "../../components/auth/Input";
import {Link} from "react-router-dom"
export default function Login(){
    return (
        <div>
            <div>
                <form>
                    <h1>Entre na sua conta</h1>
                    <InputAuth/>
                    <InputAuth/>
                    <a>Não tem conta?<Link linkTo="/register">Registre-se</Link></a>
                </form>
            </div>
        </div>
    )
}