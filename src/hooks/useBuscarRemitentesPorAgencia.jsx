import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarRemitentesPorAgencia({ idAgencia }) {
  const { BuscarRemitentesPorAgencia } = usePedidos();
  const [remitentes, establecerRemitentes] = useState(null);
  const [cargandoRemitentes, establecerCargandoRemitentes] = useState(true);
  const [filtro, establecerFiltro] = useState("");
  console.log(idAgencia);

  useEffect(() => {
    const obtenerRemitentes = async () => {
      try {
        const res = await BuscarRemitentesPorAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          idAgencia,
        });
        establecerRemitentes(res.data);
        establecerCargandoRemitentes(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerRemitentes();
  }, [filtro]);

  return { remitentes, cargandoRemitentes, filtro, establecerFiltro };
}
