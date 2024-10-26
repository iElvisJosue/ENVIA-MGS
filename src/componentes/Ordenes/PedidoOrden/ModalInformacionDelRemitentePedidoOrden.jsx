/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS (REUTILIZAMOS ESTILOS)
import "../../../estilos/componentes/Ordenes/PedidoOrden/ModalInformacionDelRemitentePedidoOrden.css";

export default function ModalInformacionDelRemitentePedidoOrden({
  informacionDelRemitente,
  establecerMostrarModalRemitente,
}) {
  return (
    <div className="ModalInformacionDelRemitentePedidoOrden">
      <article className="ModalInformacionDelRemitentePedidoOrden__Contenido">
        <button
          className="ModalInformacionDelRemitentePedidoOrden__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalRemitente(false)}
          type="button"
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDelRemitentePedidoOrden__Contenido--Titulo">
          Información del remitente
        </h1>
        <small className="ModalInformacionDelRemitentePedidoOrden__Contenido--Informacion Col2">
          <ion-icon name="person"></ion-icon>
          <b>Nombre</b>
          {informacionDelRemitente.NombreRemitente}{" "}
          {informacionDelRemitente.ApellidosRemitente}
        </small>
        <small className="ModalInformacionDelRemitentePedidoOrden__Contenido--Informacion">
          <ion-icon name="phone-portrait"></ion-icon>
          <b>Celular</b> {informacionDelRemitente.CelularRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitentePedidoOrden__Contenido--Informacion">
          <ion-icon name="call"></ion-icon>
          <b>Teléfono Casa </b>{" "}
          {informacionDelRemitente.TelefonoCasaRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitentePedidoOrden__Contenido--Informacion Col2">
          <ion-icon name="mail"></ion-icon>
          <b>Correo</b> {informacionDelRemitente.CorreoRemitente || "N/A"}
        </small>
        <small className="ModalInformacionDelRemitentePedidoOrden__Contenido--Informacion Col2">
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
