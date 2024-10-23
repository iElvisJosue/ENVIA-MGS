import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarAgenciasAsignadasYNoAsignadasPorUsuario(
  idUsuario
) {
  const { BuscarAgenciasQueTieneElUsuario, BuscarAgenciasQueNoTieneElUsuario } =
    useUsuarios();
  const [
    agenciasAsignadasYNoAsignadasDelUsuario,
    establecerAgenciasAsignadasYNoAsignadasDelUsuario,
  ] = useState(null);
  const [
    cargandoAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerCargandoAgenciasAsignadasYNoAsignadasDelUsuario,
  ] = useState(true);
  const [
    filtroAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelUsuario,
  ] = useState("");
  const [
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  ] = useState(false);

  useEffect(() => {
    const obtenerAgenciasAsignadasYNoAsignadas = async () => {
      try {
        const resAsignadas = await BuscarAgenciasQueTieneElUsuario({
          CookieConToken: COOKIE_CON_TOKEN,
          idUsuario,
        });
        const resNoAsignadas = await BuscarAgenciasQueNoTieneElUsuario({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroAgenciasAsignadasYNoAsignadasDelUsuario,
          idUsuario,
        });
        if (resAsignadas.response || resNoAsignadas.response) {
          const { status, data } =
            resAsignadas.response || resNoAsignadas.response;
          ManejarMensajesDeRespuesta({ status, data });
          establecerAgenciasAsignadasYNoAsignadasDelUsuario({
            AgenciasAsignadas: [],
            AgenciasNoAsignadas: [],
          });
        } else {
          establecerAgenciasAsignadasYNoAsignadasDelUsuario({
            AgenciasAsignadas: resAsignadas.data,
            AgenciasNoAsignadas: resNoAsignadas.data,
          });
        }
        establecerCargandoAgenciasAsignadasYNoAsignadasDelUsuario(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgenciasAsignadasYNoAsignadas();
  }, [
    filtroAgenciasAsignadasYNoAsignadasDelUsuario,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  ]);

  return {
    agenciasAsignadasYNoAsignadasDelUsuario,
    cargandoAgenciasAsignadasYNoAsignadasDelUsuario,
    filtroAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelUsuario,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  };
}
