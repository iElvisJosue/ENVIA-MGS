import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarPedidosPorFiltroYTipoDeUsuario() {
  const { BuscarPedidosPorFiltro } = usePedidos();
  const { usuario } = useGlobal();

  const [pedidos, establecerPedidos] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarPedidos = async () => {
      try {
        const res = await BuscarPedidosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          tipoDeUsuario: usuario.Permisos,
          idDelUsuario: usuario.idUsuario,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerPedidos(res.data);
        }
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarPedidos();
  }, [filtro]);

  return { pedidos, cargando, filtro, establecerFiltro };
}
