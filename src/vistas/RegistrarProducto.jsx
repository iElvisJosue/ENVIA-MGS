// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import InformacionDelProducto from "../componentes/RegistrarProducto/InformacionDelProducto";

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
      <Toaster richColors position="top-right" />
    </main>
  );
}
