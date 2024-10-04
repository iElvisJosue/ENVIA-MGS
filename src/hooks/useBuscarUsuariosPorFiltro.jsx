import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";

export default function useBuscarUsuariosPorFiltro() {
  const { BuscarUsuariosPorFiltro } = useUsuarios();

  const [usuarios, establecerUsuarios] = useState([]);
  const [cargandoUsuarios, establecerCargandoUsuarios] = useState(true);
  const [filtroUsuario, establecerFiltroUsuario] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await BuscarUsuariosPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroUsuario,
        });
        establecerUsuarios(res.data);
        establecerCargandoUsuarios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUsuarios();
  }, [filtroUsuario]);

  return { usuarios, cargandoUsuarios, filtroUsuario, establecerFiltroUsuario };
}
