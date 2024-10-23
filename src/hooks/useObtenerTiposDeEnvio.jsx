import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerTiposDeEnvio() {
  const { ObtenerTiposDeEnvio } = useConfiguracion();

  const [envios, establecerEnvios] = useState([]);

  useEffect(() => {
    const obtenerTiposDeEnvio = async () => {
      try {
        const res = await ObtenerTiposDeEnvio({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerEnvios(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerTiposDeEnvio();
  }, []);

  return { envios };
}
