import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarMovimientosDeUnPedido(GuiaPedido) {
  const { BuscarMovimientosDeUnPedido } = usePedidos();
  const [movimientos, establecerMovimientos] = useState(null);
  const [cargandoMovimientos, establecerCargandoMovimientos] = useState(true);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const res = await BuscarMovimientosDeUnPedido({
          CookieConToken: COOKIE_CON_TOKEN,
          GuiaPedido,
        });
        establecerMovimientos(res.data);
        establecerCargandoMovimientos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovimientos();
  }, [GuiaPedido]);

  return { movimientos, cargandoMovimientos };
}