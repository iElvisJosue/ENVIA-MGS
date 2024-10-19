import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerAgenciaMGS() {
  const { ObtenerAgenciaMGS } = useAgencias();
  const [agenciaMGS, establecerAgenciaMGS] = useState(null);

  useEffect(() => {
    const obtenerCargas = async () => {
      try {
        const res = await ObtenerAgenciaMGS({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        establecerAgenciaMGS(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCargas();
  }, []);

  return { agenciaMGS };
}
