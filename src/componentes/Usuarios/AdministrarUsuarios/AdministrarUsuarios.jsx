// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeUsuarios from "./ListaDeUsuarios";
import AdministrarAgenciasDelUsuario from "./AdministrarAgenciasDelUsuario";
import EditarUsuario from "./EditarUsuario";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/AdministrarUsuarios.css";

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

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="AdministrarUsuarios">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
