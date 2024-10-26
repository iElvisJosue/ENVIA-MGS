/* eslint-disable react/prop-types */
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ModalConfirmacionProductos.css";

export default function ModalConfirmacionProductos({
  Activar = true,
  infProducto,
  establecerMostrarModalConfirmacion,
  buscarProductosNuevamente,
  establecerBuscarProductosNuevamente,
}) {
  const { ActualizarEstadoDeUnProducto } = useProductos();
  const ClaseTituloModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Titulo Activar"
    : "ModalConfirmacionProductos__Contenido--Titulo Desactivar";
  const TituloModal = Activar ? "Activar producto" : "Desactivar producto";
  const ClaseBotonModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Boton Activar"
    : "ModalConfirmacionProductos__Contenido--Boton Desactivar";
  const TextoBotonModal = Activar ? "Activar" : "Desactivar";
  const ClaseTextoModal = Activar
    ? "ModalConfirmacionProductos__Contenido--Texto Activar"
    : "ModalConfirmacionProductos__Contenido--Texto Desactivar";
  const EstadoProductoParaBD = Activar ? "Activo" : "Desactivado";

  const ActivarDesactivarProducto = async () => {
    try {
      const res = await ActualizarEstadoDeUnProducto({
        idProducto: infProducto.idProducto,
        StatusProducto: EstadoProductoParaBD,
        CookieConToken: COOKIE_CON_TOKEN,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
      }
      establecerBuscarProductosNuevamente(!buscarProductosNuevamente);
      establecerMostrarModalConfirmacion(false);
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  return (
    <div className="ModalConfirmacionProductos">
      <article className="ModalConfirmacionProductos__Contenido">
        <button
          className="ModalConfirmacionProductos__Contenido--CerrarModal"
          onClick={() => establecerMostrarModalConfirmacion(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className={ClaseTituloModal}>{TituloModal}</h1>
        <small className={ClaseTextoModal}>
          ¿Esta seguro que desea {Activar ? "activar" : "desactivar"} el
          producto <b>{infProducto.NombreProducto}</b>?
          <br />
          <br />
          <i>
            {Activar
              ? `El producto se activara una vez confirmada esta acción, por lo cual, el producto ${infProducto.NombreProducto} podrá trabajar con normalidad en el sistema.`
              : `El producto se desactivara una vez confirmada esta opción, por lo cual, con el producto ${infProducto.NombreProducto} no sé podrá realizar ninguna operación.`}
          </i>
        </small>
        <button
          className={ClaseBotonModal}
          onClick={() => ActivarDesactivarProducto()}
        >
          {TextoBotonModal}
        </button>
      </article>
    </div>
  );
}
