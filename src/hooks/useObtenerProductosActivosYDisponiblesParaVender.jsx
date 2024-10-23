import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useObtenerProductosActivosYDisponiblesParaVender() {
  const { ObtenerProductosActivosYDisponiblesParaVender } = useProductos();

  const [productos, establecerProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await ObtenerProductosActivosYDisponiblesParaVender({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerProductos(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, []);

  return { productos };
}
