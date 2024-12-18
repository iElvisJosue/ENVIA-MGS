// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import NuevaOrden from "../componentes/Ordenes/NuevaOrden/NuevaOrden";
import ListaOrdenes from "../componentes/Ordenes/ListaOrdenes/ListaOrdenes";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

export default function Ordenes() {
  const [vistaOrdenes, establecerVistaOrdenes] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaOrdenes,
    establecerVistaOrdenes,
  };

  const OpcionesSubMenu = [
    {
      Texto: "Nueva orden",
      Icono: "logo-dropbox",
    },
    {
      Texto: "Lista ordenes",
      Icono: "list",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: NuevaOrden,
    1: ListaOrdenes,
  };

  const TituloSubseccion = {
    0: "Nueva Orden",
    1: "Lista Ordenes",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOrdenes];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion="Paquetería"
        subseccion={TituloSubseccion[vistaOrdenes]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaOrdenes}
        establecerVista={establecerVistaOrdenes}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <ToastContainer {...toastConfig} />
    </main>
  );
}
