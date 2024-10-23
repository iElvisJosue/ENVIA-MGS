import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarProductosAsignadosYNoAsignadosPorAgencia(
  idAgencia
) {
  const {
    BuscarProductosQueTieneLaAgencia,
    BuscarProductosQueNoTieneLaAgencia,
  } = useAgencias();

  const [
    productosAsignadosYNoAsignadosPorAgencia,
    establecerProductosAsignadosYNoAsignadosPorAgencia,
  ] = useState(null);
  const [
    cargandoProductosAsignadosYNoAsignadosPorAgencia,
    establecerCargandoProductosAsignadosYNoAsignadosPorAgencia,
  ] = useState(true);
  const [
    filtroProductosAsignadosYNoAsignadosPorAgencia,
    establecerFiltroProductosAsignadosYNoAsignadosPorAgencia,
  ] = useState("");
  const [
    buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
    establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  ] = useState(false);

  useEffect(() => {
    const obtenerProductosAsignadosYNoAsignadosPorAgencia = async () => {
      try {
        const resAsignados = await BuscarProductosQueTieneLaAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          idAgencia,
        });
        const resNoAsignadas = await BuscarProductosQueNoTieneLaAgencia({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroProductosAsignadosYNoAsignadosPorAgencia,
          idAgencia,
        });
        if (resAsignados.response || resNoAsignadas.response) {
          const { status, data } =
            resAsignados.response || resNoAsignadas.response;
          ManejarMensajesDeRespuesta({ status, data });
          establecerProductosAsignadosYNoAsignadosPorAgencia({
            ProductosAsignados: [],
            ProductosNoAsignados: [],
          });
        } else {
          establecerProductosAsignadosYNoAsignadosPorAgencia({
            ProductosAsignados: resAsignados.data,
            ProductosNoAsignados: resNoAsignadas.data,
          });
        }
        establecerCargandoProductosAsignadosYNoAsignadosPorAgencia(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductosAsignadosYNoAsignadosPorAgencia();
  }, [
    filtroProductosAsignadosYNoAsignadosPorAgencia,
    buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  ]);

  return {
    productosAsignadosYNoAsignadosPorAgencia,
    cargandoProductosAsignadosYNoAsignadosPorAgencia,
    filtroProductosAsignadosYNoAsignadosPorAgencia,
    establecerFiltroProductosAsignadosYNoAsignadosPorAgencia,
    buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
    establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  };
}
