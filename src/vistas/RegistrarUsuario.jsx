// IMPORTAMOS LAS LIBRERÍAS A USAR
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import InformacionDelUsuario from "../componentes/RegistrarUsuario/InformacionDelUsuario";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RegistrarUsuario.css";

export default function RegistrarUsuario() {
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="people-circle"
        seccion="Usuarios"
        subseccion="Registrar Usuario"
      />
      <div className="RegistrarUsuario">
        <InformacionDelUsuario />
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
