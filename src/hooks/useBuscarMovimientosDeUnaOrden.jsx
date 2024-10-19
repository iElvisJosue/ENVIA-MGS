import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarMovimientosDeUnaOrden(GuiaOrden) {
  const { BuscarMovimientosDeUnaOrden } = usePedidos();
  const [movimientos, establecerMovimientos] = useState(null);
  const [cargandoMovimientos, establecerCargandoMovimientos] = useState(true);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const res = await BuscarMovimientosDeUnaOrden({
          CookieConToken: COOKIE_CON_TOKEN,
          GuiaOrden,
        });
        establecerMovimientos(res.data);
        establecerCargandoMovimientos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovimientos();
  }, [GuiaOrden]);

  return { movimientos, cargandoMovimientos };
}
