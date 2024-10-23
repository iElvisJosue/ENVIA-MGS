// LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS
import { usePedidos } from "../context/PedidosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ObtenerFechaActual } from "../helpers/FuncionesGenerales";

export default function useBuscarOrdenesPorFecha() {
  const { BuscarOrdenesPorFecha } = usePedidos();
  const { usuario } = useGlobal();
  const [ordenesPorFecha, establecerOrdenesPorFecha] = useState([]);
  const [cargandoOrdenesPorFecha, establecerCargandoOrdenesPorFecha] =
    useState(true);
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  useEffect(() => {
    async function obtenerOrdenesPorFecha() {
      try {
        const res = await BuscarOrdenesPorFecha({
          CookieConToken: COOKIE_CON_TOKEN,
          primeraFecha,
          segundaFecha,
          idDelUsuario: usuario.idUsuario,
          PermisosUsuario: usuario.Permisos,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerOrdenesPorFecha(res.data);
        }
        establecerCargandoOrdenesPorFecha(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarMensajesDeRespuesta({ status, data });
      }
    }
    obtenerOrdenesPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    ordenesPorFecha,
    cargandoOrdenesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  };
}
