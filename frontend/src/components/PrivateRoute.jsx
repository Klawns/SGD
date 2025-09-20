import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
