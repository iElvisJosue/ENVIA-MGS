import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useConfiguracion } from "../context/ConfiguracionContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useObtenerTiposDeCarga() {
  const { ObtenerTiposDeCarga } = useConfiguracion();

  const [cargas, establecerCargas] = useState([]);
  const [cargandoCargas, establecerCargandoCargas] = useState(true);

  useEffect(() => {
    const obtenerCargas = async () => {
      try {
        const res = await ObtenerTiposDeCarga({
          CookieConToken: COOKIE_CON_TOKEN,
        });
        establecerCargas(res.data);
        establecerCargandoCargas(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCargas();
  }, []);

  return { cargas, cargandoCargas };
}
