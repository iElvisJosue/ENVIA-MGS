// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarUsuario from "../componentes/Usuarios/RegistrarUsuario/RegistrarUsuario";
import AdministrarUsuarios from "../componentes/Usuarios/AdministrarUsuarios/AdministrarUsuarios";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

export default function Usuarios() {
  const [vistaUsuario, establecerVistaUsuario] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaUsuario,
    establecerVistaUsuario,
  };

  const OpcionesSubMenu = [
    {
      Texto: "Registrar Usuario",
      Icono: "person-add",
    },
    {
      Texto: "Administrar Usuarios",
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarUsuario,
    1: AdministrarUsuarios,
  };

  const TituloSubseccion = {
    0: "Registrar Usuario",
    1: "Administrar Usuarios",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaUsuario];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="people-circle"
        seccion="Usuarios"
        subseccion={TituloSubseccion[vistaUsuario]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaUsuario}
        establecerVista={establecerVistaUsuario}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <ToastContainer {...toastConfig} />
    </main>
  );
}
