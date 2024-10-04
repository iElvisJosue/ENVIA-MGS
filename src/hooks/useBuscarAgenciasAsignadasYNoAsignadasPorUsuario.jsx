import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

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
        establecerAgenciasAsignadasYNoAsignadasDelUsuario({
          AgenciasAsignadas: resAsignadas.data,
          AgenciasNoAsignadas: resNoAsignadas.data,
        });
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
