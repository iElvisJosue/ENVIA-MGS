import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarMovimientosDeUnaOrden(GuiaOrden) {
  const { BuscarMovimientosDeUnaOrden } = usePedidos();
  const [movimientos, establecerMovimientos] = useState([]);
  const [cargandoMovimientos, establecerCargandoMovimientos] = useState(true);

  useEffect(() => {
    const obtenerMovimientos = async () => {
      try {
        const res = await BuscarMovimientosDeUnaOrden({
          CookieConToken: COOKIE_CON_TOKEN,
          GuiaOrden,
        });

        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerMovimientos(res.data);
        }
        establecerCargandoMovimientos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerMovimientos();
  }, [GuiaOrden]);

  return { movimientos, cargandoMovimientos };
}
