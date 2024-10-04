// IMPORTAMOS LAS LIBRERÍAS A USAR
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import InformacionDeLaAgencia from "../componentes/RegistrarAgencia/InformacionDeLaAgencia";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RegistrarAgencia.css";

export default function RegistrarAgencia() {
  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion="Agencias"
        subseccion="Registrar Agencia"
      />
      <div className="RegistrarAgencia">
        <InformacionDeLaAgencia />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
