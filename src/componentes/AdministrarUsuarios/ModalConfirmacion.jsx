/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarUsuarios/ModalConfirmacion.css";

export default function ModalConfirmacion({
  Activar = true,
  infUsuario,
  establecerMostrarModalConfirmacion,
  obtenerUsuariosNuevamente,
  establecerObtenerUsuariosNuevamente,
}) {
  const { ActualizarEstadoUsuario } = useUsuarios();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacion__Contenido--Titulo Activar"
    : "ModalConfirmacion__Contenido--Titulo Desactivar";
  const TituloModal = Activar ? "Activar usuario" : "Desactivar usuario";
  const ClaseBotonModal = Activar
    ? "ModalConfirmacion__Contenido--Boton Activar"
    : "ModalConfirmacion__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar ? "Activar" : "Desactivar";
  const ClaseTextoModal = Activar
    ? "ModalConfirmacion__Contenido--Texto Activar"
    : "ModalConfirmacion__Contenido--Texto Desactivar";
  const EstadoUsuarioParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarUsuario = async () => {
    try {
      const res = await ActualizarEstadoUsuario({
        idUsuario: infUsuario.idUsuario,
        EstadoUsuario: EstadoUsuarioParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
      }
      establecerObtenerUsuariosNuevamente(!obtenerUsuariosNuevamente);
      establecerMostrarModalConfirmacion(false);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  return (
    <div className="ModalConfirmacion">
      <article className="ModalConfirmacion__Contenido">
        <button
          className="ModalConfirmacion__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          ¿Esta seguro que desea {Activar ? "activar" : "desactivar"} al usuario{" "}
          <b>{infUsuario.Usuario}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? `El usuario se activara una vez confirmada esta acción, por lo cual, el usuario ${infUsuario.Usuario} tendrá acceso al sistema nuevamente.`
              : `El usuario se desactivara una vez confirmada esta opción, por lo cual, el usuario ${infUsuario.Usuario} no tendrá acceso al sistema hasta que vuelva a ser activado.`}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarUsuario()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
