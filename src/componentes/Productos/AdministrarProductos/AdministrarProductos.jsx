// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeProductos from "./ListaDeProductos";
import AdministrarAgenciasDelProducto from "./AdministrarAgenciasDelProducto";
import EditarProducto from "./EditarProducto";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Productos/AdministrarProductos/AdministrarProductos.css";

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

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="AdministrarProductos">
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
