import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../context/UsuariosContext";
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarUsuariosParaAdministrarPorFiltro() {
  const { BuscarUsuariosParaAdministrarPorFiltro } = useUsuarios();
  const { usuario } = useGlobal();

  const [usuarios, establecerUsuarios] = useState([]);
  const [cargandoUsuarios, establecerCargandoUsuarios] = useState(true);
  const [filtroUsuario, establecerFiltroUsuario] = useState("");
  const [obtenerUsuariosNuevamente, establecerObtenerUsuariosNuevamente] =
    useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await BuscarUsuariosParaAdministrarPorFiltro({
          CookieConToken: COOKIE_CON_TOKEN,
          filtro: filtroUsuario,
          idUsuario: usuario.idUsuario,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerUsuarios(res.data);
        }
        establecerCargandoUsuarios(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUsuarios();
  }, [filtroUsuario, obtenerUsuariosNuevamente]);

  return {
    usuarios,
    cargandoUsuarios,
    filtroUsuario,
    establecerFiltroUsuario,
    obtenerUsuariosNuevamente,
    establecerObtenerUsuariosNuevamente,
  };
}
