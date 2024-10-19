/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS (REUTILIZAMOS ESTILOS)
import "../../estilos/componentes/Ordenes/ModalInformacionDelRemitente.css";

export default function ModalInformacionDelRemitente({
  informacionDelRemitente,
  establecerMostrarModalRemitente,
}) {
  return (
    <div className="ModalInformacionDelRemitente">
      <article className="ModalInformacionDelRemitente__Contenido">
        <button
          className="ModalInformacionDelRemitente__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalRemitente(false)}
          type="button"
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDelRemitente__Contenido--Titulo">
          Información del remitente
        </h1>
        <small className="ModalInformacionDelRemitente__Contenido--Informacion Col2">
          <ion-icon name="person"></ion-icon>
          <b>Nombre</b>
          {informacionDelRemitente.NombreRemitente}{" "}
          {informacionDelRemitente.ApellidosRemitente}
        </small>
        <small className="ModalInformacionDelRemitente__Contenido--Informacion">
          <ion-icon name="phone-portrait"></ion-icon>
          <b>Celular</b> {informacionDelRemitente.CelularRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitente__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>Teléfono Casa </b>{" "}
          {informacionDelRemitente.TelefonoCasaRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitente__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>Correo</b> {informacionDelRemitente.CorreoRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitente__Contenido--Informacion Col2">
          <ion-icon name="location"></ion-icon>
          <b>Locación</b>
          {informacionDelRemitente.PaisRemitente}
          <br />
          {informacionDelRemitente.EstadoRemitente},{" "}
          {informacionDelRemitente.CiudadRemitente},{" "}
          {informacionDelRemitente.DireccionRemitente}{" "}
          {informacionDelRemitente.CodigoPostalRemitente}
        </small>
      </article>
    </div>
  );
}
