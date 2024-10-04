import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarAgenciasAsignadasYNoAsignadasPorProducto(
  idProducto
) {
  const {
    BuscarAgenciasQueTieneUnProducto,
    BuscarAgenciasQueNoTieneUnProducto,
  } = useProductos();
  const [
    agenciasAsignadasYNoAsignadasDelProducto,
    establecerAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(null);
  const [
    cargandoAgenciasAsignadasYNoAsignadasDelProducto,
    establecerCargandoAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(true);
  const [
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState("");
  const [
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  ] = useState(false);

  useEffect(() => {
    const obtenerAgenciasAsignadasYNoAsignadas = async () => {
      try {
        const resAsignadas = await BuscarAgenciasQueTieneUnProducto({
          CookieConToken: COOKIE_CON_TOKEN,
          idProducto,
        });
        const resNoAsignadas = await BuscarAgenciasQueNoTieneUnProducto({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroAgenciasAsignadasYNoAsignadasDelProducto,
          idProducto,
        });
        establecerAgenciasAsignadasYNoAsignadasDelProducto({
          AgenciasAsignadas: resAsignadas.data,
          AgenciasNoAsignadas: resNoAsignadas.data,
        });
        establecerCargandoAgenciasAsignadasYNoAsignadasDelProducto(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerAgenciasAsignadasYNoAsignadas();
  }, [
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  ]);

  return {
    agenciasAsignadasYNoAsignadasDelProducto,
    cargandoAgenciasAsignadasYNoAsignadasDelProducto,
    filtroAgenciasAsignadasYNoAsignadasDelProducto,
    establecerFiltroAgenciasAsignadasYNoAsignadasDelProducto,
    buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
    establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  };
}
