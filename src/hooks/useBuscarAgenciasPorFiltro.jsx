import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarAgenciasPorFiltro() {
  const { BuscarAgenciasPorFiltro } = useAgencias();

  const [agencias, establecerAgencias] = useState([]);
  const [cargandoAgencias, establecerCargandoAgencias] = useState(true);
  const [filtroAgencias, establecerFiltroAgencias] = useState("");
  const [obtenerAgenciasNuevamente, establecerObtenerAgenciasNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerAgencias = async () => {
      try {
        const res = await BuscarAgenciasPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroAgencias,
        });
        establecerAgencias(res.data);
        establecerCargandoAgencias(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgencias();
  }, [filtroAgencias, obtenerAgenciasNuevamente]);

  return {
    agencias,
    cargandoAgencias,
    filtroAgencias,
    establecerFiltroAgencias,
    obtenerAgenciasNuevamente,
    establecerObtenerAgenciasNuevamente,
  };
}
