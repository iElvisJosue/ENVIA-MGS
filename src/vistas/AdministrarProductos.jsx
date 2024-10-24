// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeProductos from "../componentes/AdministrarProductos/ListaDeProductos";
import AdministrarAgenciasDelProducto from "../componentes/AdministrarProductos/AdministrarAgenciasDelProducto";
import EditarProducto from "../componentes/AdministrarProductos/EditarProducto";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarProductos.css";

export default function AdministrarProductos() {
  const [informacionDelProducto, establecerInformacionDelProducto] =
    useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelProducto,
    establecerInformacionDelProducto,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeProductos,
    1: AdministrarAgenciasDelProducto,
    2: EditarProducto,
  };

  const TituloSubseccion = {
    0: "Administrar Productos",
    1: "Administrar Productos / Administrar Agencias",
    2: "Administrar Productos / Editar Producto",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion="Productos"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarProductos">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
