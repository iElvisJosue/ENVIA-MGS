// IMPORTAMOS LAS LIBRERÍAS A USAR
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import InformacionDelProducto from "../componentes/RegistrarProducto/InformacionDelProducto";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RegistrarProducto.css";

export default function RegistrarProducto() {
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion="Productos"
        subseccion="Registrar Producto"
      />
      <div className="RegistrarProducto">
        <InformacionDelProducto />
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
