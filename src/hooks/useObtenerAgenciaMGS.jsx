import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerAgenciaMGS() {
  const { ObtenerAgenciaMGS } = useAgencias();
  const [agenciaMGS, establecerAgenciaMGS] = useState(null);
  const [cargandoAgenciaMGS, establecerCargandoAgenciaMGS] = useState(true);

  useEffect(() => {
    const obtenerCargas = async () => {
      try {
        const res = await ObtenerAgenciaMGS({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerAgenciaMGS(res.data[0]);
        }
        establecerCargandoAgenciaMGS(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCargas();
  }, []);

  return { agenciaMGS, cargandoAgenciaMGS };
}
