/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ModalConfirmacionAgencias.css";

export default function ModalConfirmacionAgencias({
  Activar = true,
  infAgencia,
  establecerMostrarModalConfirmacion,
  obtenerAgenciasNuevamente,
  establecerObtenerAgenciasNuevamente,
}) {
  const { ActualizarEstadoAgencia } = useAgencias();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionAgencias__Contenido--Titulo Activar"
    : "ModalConfirmacionAgencias__Contenido--Titulo Desactivar";
  const TituloModal = Activar ? "Activar agencia" : "Desactivar agencia";
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionAgencias__Contenido--Boton Activar"
    : "ModalConfirmacionAgencias__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar ? "Activar" : "Desactivar";
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionAgencias__Contenido--Texto Activar"
    : "ModalConfirmacionAgencias__Contenido--Texto Desactivar";
  const EstadoAgenciaParaBD = Activar ? "Activa" : "Desactivada";

  const ActivarDesactivarUsuario = async () => {
    try {
      const res = await ActualizarEstadoAgencia({
        idAgencia: infAgencia.idAgencia,
        StatusAgencia: EstadoAgenciaParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
      }
      establecerObtenerAgenciasNuevamente(!obtenerAgenciasNuevamente);
      establecerMostrarModalConfirmacion(false);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  return (
    <div className="ModalConfirmacionAgencias">
      <article className="ModalConfirmacionAgencias__Contenido">
        <button
          className="ModalConfirmacionAgencias__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          ¿Esta seguro que desea {Activar ? "activar" : "desactivar"} la agencia{" "}
          <b>{infAgencia.NombreAgencia}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? `La agencia se activara una vez confirmada esta acción, por lo cual, la agencia ${infAgencia.NombreAgencia} podrá trabajar con normalidad en el sistema.`
              : `La agencia se desactivara una vez confirmada esta opción, por lo cual, con la agencia ${infAgencia.NombreAgencia} no sé podrá realizar ninguna operación.`}
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
