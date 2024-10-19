/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarUsuarios/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  informacionDelUsuario,
  informacionDeLaAgencia,
  establecerMostrarModal,
  buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
  establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario,
}) {
  const { AsignarAgenciaAlUsuario } = useUsuarios();

  const PeticionAsignarAgenciaAlUsuario = async (idAgencia) => {
    try {
      const res = await AsignarAgenciaAlUsuario({
        CookieConToken: COOKIE_CON_TOKEN,
        idUsuario: informacionDelUsuario.idUsuario,
        idAgencia,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario(
          !buscarNuevamenteAgenciasAsignadasYNoAsignadasDelUsuario
        );
        establecerMostrarModal(false);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  return (
    <div className="ModalInformacionDeLaAgencia">
      <article className="ModalInformacionDeLaAgencia__Contenido">
        <button
          className="ModalInformacionDeLaAgencia__Contenido--CerrarModal"
          onClick={() => establecerMostrarModal(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDeLaAgencia__Contenido--Titulo">
          Información de la agencia
        </h1>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="business"></ion-icon>
          <b>Agencia</b>
          {informacionDeLaAgencia.NombreAgencia}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion">
          <ion-icon name="person-circle"></ion-icon>
          <b>Nombre Contacto</b> {informacionDeLaAgencia.NombreContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>Teléfono Contacto </b>{" "}
          {informacionDeLaAgencia.TelefonoContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>Correo</b> {informacionDeLaAgencia.CorreoContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgencia__Contenido--Informacion Col2">
          <ion-icon name="location"></ion-icon>
          <b>Locación</b>
          {informacionDeLaAgencia.PaisAgencia}
          <br />
          {informacionDeLaAgencia.EstadoAgencia},{" "}
          {informacionDeLaAgencia.CiudadAgencia},{" "}
          {informacionDeLaAgencia.DireccionAgencia}{" "}
          {informacionDeLaAgencia.CodigoPostalAgencia}
        </small>
        {informacionDeLaAgencia.Editable && (
          <button
            className="ModalInformacionDeLaAgencia__Contenido--Boton"
            onClick={() =>
              PeticionAsignarAgenciaAlUsuario(informacionDeLaAgencia.idAgencia)
            }
          >
            Asignar
          </button>
        )}
      </article>
    </div>
  );
}
