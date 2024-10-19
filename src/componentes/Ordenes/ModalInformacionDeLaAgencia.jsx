/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS (REUTILIZAMOS ESTILOS)
import "../../estilos/componentes/AdministrarProductos/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  informacionDeLaAgencia,
  establecerMostrarModalAgencia,
}) {
  return (
    <div className="ModalInformacionDeLaAgencia">
      <article className="ModalInformacionDeLaAgencia__Contenido">
        <button
          className="ModalInformacionDeLaAgencia__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalAgencia(false)}
          type="button"
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
      </article>
    </div>
  );
}
