import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarProductosPorFiltro() {
  const { BuscarProductosPorFiltro } = useProductos();

  const [productos, establecerProductos] = useState(null);
  const [cargandoProductos, establecerCargandoProductos] = useState(true);
  const [filtroProductos, establecerFiltroProductos] = useState("");
  const [buscarProductosNuevamente, establecerBuscarProductosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await BuscarProductosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroProductos,
        });
        establecerProductos(res.data);
        establecerCargandoProductos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductos();
  }, [filtroProductos, buscarProductosNuevamente]);

  return {
    productos,
    cargandoProductos,
    filtroProductos,
    establecerFiltroProductos,
    buscarProductosNuevamente,
    establecerBuscarProductosNuevamente,
  };
}
