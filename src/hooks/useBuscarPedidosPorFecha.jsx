// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { usePedidos } from "../context/PedidosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ObtenerFechaActual } from "../helpers/FuncionesGenerales";

export default function useBuscarPedidosPorFecha() {
  const { BuscarPedidosPorFecha } = usePedidos();
  const { usuario } = useGlobal();
  const [pedidosPorFecha, establecerPedidosPorFecha] = useState(null);
  const [cargandoPedidosPorFecha, establecerCargandoPedidosPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerPedidosPorFecha() {
      try {
        const res = await BuscarPedidosPorFecha({
          CookieConToken: COOKIE_CON_TOKEN,
          primeraFecha,
          segundaFecha,
          idDelUsuario: usuario.idUsuario,
          permisosUsuario: usuario.Permisos,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidosPorFecha(res.data);
          establecerCargandoPedidosPorFecha(false);
        }
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerPedidosPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    pedidosPorFecha,
    cargandoPedidosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
