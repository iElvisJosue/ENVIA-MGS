import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarDestinatariosPorAgencia({ idAgencia }) {
  const { BuscarDestinatariosPorAgencia } = usePedidos();
  const [destinatarios, establecerDestinatarios] = useState(null);
  const [cargandoDestinatarios, establecerCargandoDestinatarios] =
    useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const obtenerDestinatarios = async () => {
      try {
        const res = await BuscarDestinatariosPorAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          idAgencia,
        });
        establecerDestinatarios(res.data);
        establecerCargandoDestinatarios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDestinatarios();
  }, [filtro]);

  return { destinatarios, cargandoDestinatarios, filtro, establecerFiltro };
}
