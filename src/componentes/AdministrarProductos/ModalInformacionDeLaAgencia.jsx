/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarProductos/ModalInformacionDeLaAgencia.css";

export default function ModalInformacionDeLaAgencia({
  informacionDelProducto,
  informacionDeLaAgencia,
  establecerMostrarModal,
  buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
  establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto,
}) {
  const { AsignarAgenciaAlProducto } = useProductos();

  const PeticionAsignarAgenciaAlProducto = async (idAgencia) => {
    try {
      const res = await AsignarAgenciaAlProducto({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgencia,
        idProducto: informacionDelProducto.idProducto,
        PrecioProducto: informacionDelProducto.PrecioProducto,
        ComisionProducto: informacionDelProducto.ComisionProducto,
        LibraExtraProducto: informacionDelProducto.LibraExtraProducto,
        PesoSinCobroProducto: informacionDelProducto.PesoSinCobroProducto,
        PesoMaximoProducto: informacionDelProducto.PesoMaximoProducto,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto(
          !buscarNuevamenteAgenciasAsignadasYNoAsignadasDelProducto
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
          <b>Locación</b> {informacionDeLaAgencia.DireccionAgencia},{" "}
          {informacionDeLaAgencia.CiudadAgencia},{" "}
          {informacionDeLaAgencia.EstadoAgencia}{" "}
          {informacionDeLaAgencia.CodigoPostalAgencia}
        </small>
        {informacionDeLaAgencia.Editable && (
          <button
            className="ModalInformacionDeLaAgencia__Contenido--Boton"
            onClick={() =>
              PeticionAsignarAgenciaAlProducto(informacionDeLaAgencia.idAgencia)
            }
          >
            Asignar
          </button>
        )}
      </article>
    </div>
  );
}
