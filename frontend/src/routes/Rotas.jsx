import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddDespesas from "../pages/AddDespesas";
import ListasDespesas from "../pages/ListaDespesas";
import Relatorios from "../pages/Relatorios";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Conta from "../pages/Conta";

function Rotas() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path="/adicionar-despesas"
					element={
						<PrivateRoute>
							<AddDespesas />
						</PrivateRoute>
					}
				/>
				<Route
					path="/listar-despesas"
					element={
						<PrivateRoute>
							<ListasDespesas />
						</PrivateRoute>
					}
				/>
				<Route
					path="/relatorios"
					element={
						<PrivateRoute>
							<Relatorios />
						</PrivateRoute>
					}
				/>
				<Route
					path="/conta"
					element={
						<PrivateRoute>
							<Conta />
						</PrivateRoute>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Rotas;
