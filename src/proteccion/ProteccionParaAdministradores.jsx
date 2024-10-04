import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Cargando from "../componentes/Cargando";

export default function ProteccionParaAdministradores() {
  const { cargando, usuario } = useGlobal();

  if (cargando) return <Cargando />;
  if (usuario.Permisos !== "Administrador")
    return <Navigate to="/Bienvenida" replace />;

  return <Outlet />;
}
