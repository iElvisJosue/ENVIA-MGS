// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import NuevoEnvio from "../componentes/Envios/NuevoEnvio/NuevoEnvio";
import ListaEnvios from "../componentes/Envios/ListaEnvios/ListaEnvios";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

export default function Envios() {
  const [vistaEnvios, establecerVistaEnvios] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaEnvios,
    establecerVistaEnvios,
  };

  const OpcionesSubMenu = [
    {
      Texto: "Nuevo envío",
      Icono: "cube",
    },
    {
      Texto: "Lista envíos",
      Icono: "list",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: NuevoEnvio,
    1: ListaEnvios,
  };

  const TituloSubseccion = {
    0: "Nuevo Envío",
    1: "Lista Envíos",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaEnvios];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion="Envíos"
        subseccion={TituloSubseccion[vistaEnvios]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaEnvios}
        establecerVista={establecerVistaEnvios}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <ToastContainer {...toastConfig} />
    </main>
  );
}
