// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeOrdenes from "../componentes/Ordenes/ListaDeOrdenes";
import DetallesDeLaOrden from "../componentes/Ordenes/DetallesDeLaOrden";
import RealizarPedidoDeLaOrden from "../componentes/Ordenes/RealizarPedidoDeLaOrden";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Ordenes.css";

export default function Ordenes() {
  const [vista, establecerVista] = useState(0);
  const [detallesOrden, establecerDetallesDeLaOrden] = useState(null);
  const [informacionDelRemitente, establecerInformacionDelRemitente] =
    useState(null);
  const [informacionDeLaOrden, establecerInformacionDeLaOrden] = useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    establecerVista,
    detallesOrden,
    establecerDetallesDeLaOrden,
    informacionDelRemitente,
    establecerInformacionDelRemitente,
    informacionDeLaOrden,
    establecerInformacionDeLaOrden,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeOrdenes,
    1: DetallesDeLaOrden,
    2: RealizarPedidoDeLaOrden,
  };

  const TituloSeccion = [
    "Paquetería",
    "Paquetería / Ordenes",
    "Paquetería / Ordenes",
  ];
  const TituloSubseccion = [
    "Ordenes",
    "Detalles de la orden",
    "Realizar pedido",
  ];

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion={TituloSeccion[vista]}
        subseccion={TituloSubseccion[vista]}
      />
      <div className="Ordenes">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
