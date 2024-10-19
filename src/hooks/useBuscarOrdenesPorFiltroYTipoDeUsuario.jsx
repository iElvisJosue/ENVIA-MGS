import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarOrdenesPorFiltroYTipoDeUsuario() {
  const { BuscarOrdenesPorFiltro } = usePedidos();
  const { usuario } = useGlobal();

  const [ordenes, establecerOrdenes] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [filtro, establecerFiltro] = useState("");

  useEffect(() => {
    const buscarOrdenes = async () => {
      try {
        const res = await BuscarOrdenesPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro,
          TipoDeUsuario: usuario.Permisos,
          idDelUsuario: usuario.idUsuario,
        });
        establecerOrdenes(res.data);
        establecerCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    buscarOrdenes();
  }, [filtro]);

  return { ordenes, cargando, filtro, establecerFiltro };
}
