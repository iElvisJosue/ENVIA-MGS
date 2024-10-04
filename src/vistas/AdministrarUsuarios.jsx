// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeUsuarios from "../componentes/AdministrarUsuarios/ListaDeUsuarios";
import AdministrarAgenciasDelUsuario from "../componentes/AdministrarUsuarios/AdministrarAgenciasDelUsuario";
import EditarUsuario from "../componentes/AdministrarUsuarios/EditarUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarUsuarios.css";

export default function AdministrarUsuarios() {
  const [informacionDelUsuario, establecerInformacionDelUsuario] =
    useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDelUsuario,
    establecerInformacionDelUsuario,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeUsuarios,
    1: AdministrarAgenciasDelUsuario,
    2: EditarUsuario,
  };

  const TituloSubseccion = {
    0: "Administrar Usuarios",
    1: "Administrar Usuarios / Administrar Agencias",
    2: "Administrar Usuarios / Editar Usuario",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="people-circle"
        seccion="Usuarios"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarUsuarios">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
