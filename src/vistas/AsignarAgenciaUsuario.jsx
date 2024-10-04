// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
// import ModalInformacionDeLaAgencia from "../componentes/AsignarAgenciaUsuario/ModalInformacionDeLaAgencia";
import ListaDeUsuarios from "../componentes/AsignarAgenciaUsuario/ListaDeUsuarios";
import ListaDeAgenciasPorUsuario from "../componentes/AsignarAgenciaUsuario/ListaDeAgenciasPorUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AsignarAgenciaUsuario.css";

export default function AsignarAgenciaUsuario() {
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
    1: ListaDeAgenciasPorUsuario,
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
        subseccion="Asignar Agencia"
      />
      <div className="AsignarAgenciaUsuario">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
