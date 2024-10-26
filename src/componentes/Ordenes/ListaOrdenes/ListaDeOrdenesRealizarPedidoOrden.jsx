/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import BarraDeProgresoPedidoOrden from "../PedidoOrden/BarraDeProgresoPedidoOrden";
import InformacionDelDestinatarioPedidoOrden from "../PedidoOrden/InformacionDelDestinatarioPedidoOrden";
import InformacionDelPedidoOrden from "../PedidoOrden/InformacionDelPedidoOrden";
import DetallesDelPedidoOrden from "../../../componentes/Ordenes/PedidoOrden/DetallesDelPedidoOrden";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESO_ORDEN } from "../../../helpers/NuevaOrden/ListaDeProgresoOrden";

export default function ListaDeOrdenesRealizarPedidoOrden({
  establecerVistaOrden,
  informacionDelRemitente,
  informacionDeLaAgencia,
  informacionDeLaOrden,
}) {
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [remitente, establecerRemitente] = useState(informacionDelRemitente);
  const [destinatario, establecerDestinatario] = useState(null);
  const [orden, establecerOrden] = useState(informacionDeLaOrden);
  const [pedido, establecerPedido] = useState([]);
  const [detallesPedido, establecerDetallesPedido] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESO_ORDEN[paso]);
  }, [paso]);

  //   ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    agencia: informacionDeLaAgencia,
    establecerVistaOrden,
    paso,
    establecerPaso,
    remitente,
    establecerRemitente,
    destinatario,
    establecerDestinatario,
    pedido,
    establecerPedido,
    establecerProgreso,
    usuario,
    detallesPedido,
    establecerDetallesPedido,
    orden,
    establecerOrden,
  };

  //ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: InformacionDelDestinatarioPedidoOrden,
    1: InformacionDelPedidoOrden,
    2: DetallesDelPedidoOrden,
  };

  //   ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  return (
    <>
      <BarraDeProgresoPedidoOrden Progreso={progreso} />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </>
  );
}
