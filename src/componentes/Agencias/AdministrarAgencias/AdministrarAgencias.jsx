// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeAgencias from "./ListaDeAgencias";
import AdministrarProductosDeLaAgencia from "./AdministrarProductosDeLaAgencia";
import EditarAgencia from "./EditarAgencia";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/AdministrarAgencias/AdministrarAgencias.css";

export default function AdministrarAgencias() {
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeAgencias,
    1: AdministrarProductosDeLaAgencia,
    2: EditarAgencia,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="AdministrarAgencias">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
