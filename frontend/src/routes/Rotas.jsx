import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import AddDespesas from '../pages/app/AddDespesas'
import ListasDespesas from '../pages/app/ListaDespesas'
import Relatorios from '../pages/app/Relatorios'

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/adicionar-despesas' element={<AddDespesas/>}/>
        <Route path='/listar-despesas' element={<ListasDespesas/>}/>
        <Route path='/relatorios' element={<Relatorios/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas