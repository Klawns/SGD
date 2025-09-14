import AppButton from "../../components/app/ButtonHome";

export default function Home() {
    return (
        <>
            <div> {/* primeira seção e maior com as boas vindas*/}
                {/* icone que irei fazer */}
                <h1>Bem-vindo ao SGD</h1>
                <div>{/* ficar na parte de baixo do h1*/}
                    <AppButton/> {/* dashboard ou home */}
                    <AppButton/> {/* adicionar despesa */}
                    <AppButton/> {/* Listas Despesas(com filtros ou não) */}
                    <AppButton/> {/* Relatorios */}
                </div>
            </div>

        </>
    )
}