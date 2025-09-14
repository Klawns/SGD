export default function Register(){
    return (
        <div>
            <div>
                <form>
                    <h1>Crie sua conta</h1>
                    <InputAuth/>
                    <InputAuth/>
                    <a>Já tem conta?<Link linkTo="/login">Logar</Link></a>
                </form>
            </div>
        </div>
    )
}