import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarRemitentesPorAgencia({ idAgencia }) {
  const { BuscarRemitentesPorAgencia } = usePedidos();
  const [remitentes, establecerRemitentes] = useState([]);
  const [cargandoRemitentes, establecerCargandoRemitentes] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const obtenerRemitentes = async () => {
      try {
        const res = await BuscarRemitentesPorAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          idAgencia,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerRemitentes(res.data);
        }
        establecerCargandoRemitentes(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRemitentes();
  }, [filtro]);

  return { remitentes, cargandoRemitentes, filtro, establecerFiltro };
}
