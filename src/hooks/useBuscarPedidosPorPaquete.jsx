import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarPedidosPorPaquete({
  CodigoRastreo,
  GuiaPedido,
}) {
  const { BuscarPedidosPorPaquete } = usePedidos();

  const [paquete, establecerPaquete] = useState(null);
  const [cargandoPaquete, establecerCargandoPaquete] = useState(true);

  useEffect(() => {
    const obtenerPaquete = async () => {
      try {
        const res = await BuscarPedidosPorPaquete({
          CookieConToken: COOKIE_CON_TOKEN,
          CodigoRastreo,
          GuiaPedido,
        });
        establecerPaquete(res.data);
        establecerCargandoPaquete(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPaquete();
  }, []);

  return { paquete, cargandoPaquete };
}
