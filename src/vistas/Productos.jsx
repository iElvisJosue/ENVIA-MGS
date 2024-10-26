// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import SubMenu from "../componentes/SubMenu";
import RegistrarProducto from "../componentes/Productos/RegistrarProducto/RegistrarProducto";
import AdministrarProductos from "../componentes/Productos/AdministrarProductos/AdministrarProductos";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

export default function Productos() {
  const [vistaProductos, establecerVistaProductos] = useState(0);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaProductos,
    establecerVistaProductos,
  };

  const OpcionesSubMenu = [
    {
      Texto: "Registrar Producto",
      Icono: "add-circle",
    },
    {
      Texto: "Administrar Productos",
      Icono: "cog",
    },
  ];

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: RegistrarProducto,
    1: AdministrarProductos,
  };

  const TituloSubseccion = {
    0: "Registrar Producto",
    1: "Administrar Productos",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaProductos];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="basket"
        seccion="Productos"
        subseccion={TituloSubseccion[vistaProductos]}
      />
      <SubMenu
        OpcionesSubMenu={OpcionesSubMenu}
        vista={vistaProductos}
        establecerVista={establecerVistaProductos}
      />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      <ToastContainer {...toastConfig} />
    </main>
  );
}
