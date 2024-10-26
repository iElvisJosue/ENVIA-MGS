/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS (REUTILIZAMOS ESTILOS)
import "../../../estilos/componentes/Ordenes/PedidoOrden/ModalInformacionDeLaAgenciaPedidoOrden.css";

export default function ModalInformacionDeLaAgenciaPedidoOrden({
  informacionDeLaAgencia,
  establecerMostrarModalAgencia,
}) {
  return (
    <div className="ModalInformacionDeLaAgenciaPedidoOrden">
      <article className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido">
        <button
          className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalAgencia(false)}
          type="button"
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Titulo">
          Información de la agencia
        </h1>
        <small className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Informacion Col2">
          <ion-icon name="business"></ion-icon>
          <b>Agencia</b>
          {informacionDeLaAgencia.NombreAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Informacion">
          <ion-icon name="person-circle"></ion-icon>
          <b>Nombre Contacto</b> {informacionDeLaAgencia.NombreContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>Teléfono Contacto </b>{" "}
          {informacionDeLaAgencia.TelefonoContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>Correo</b> {informacionDeLaAgencia.CorreoContactoAgencia}
        </small>
        <small className="ModalInformacionDeLaAgenciaPedidoOrden__Contenido--Informacion Col2">
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
