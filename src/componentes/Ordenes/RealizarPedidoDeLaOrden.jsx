/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import BarraDeProgreso from "../../componentes/Ordenes/BarraDeProgreso";
import InformacionDelDestinatario from "../../componentes/Ordenes/InformacionDelDestinatario";
import InformacionDelPedido from "../../componentes/Ordenes/InformacionDelPedido";
// import DetallesDelPedido from "../componentes/Pedidos/DetallesDelPedido";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS } from "../../helpers/Ordenes/ListaDeProgreso";

export default function RealizarPedidoDeLaOrden({
  establecerVista,
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
    establecerProgreso(LISTA_DE_PROGRESOS[paso]);
  }, [paso]);

  //   ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    agencia: informacionDeLaAgencia,
    establecerVista,
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
    0: InformacionDelDestinatario,
    1: InformacionDelPedido,
    //   2: DetallesDelPedido,
  };

  //   ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  return (
    <>
      <BarraDeProgreso Progreso={progreso} />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </>
  );
}
