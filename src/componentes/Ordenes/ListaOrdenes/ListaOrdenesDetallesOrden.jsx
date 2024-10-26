/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorPaquete from "../../../hooks/useBuscarOrdenesPorPaquete";
import useBuscarMovimientosDeUnaOrden from "../../../hooks/useBuscarMovimientosDeUnaOrden";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";
import { HOST_PDF } from "../../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/ListaOrdenes/ListaOrdenesDetallesOrden.css";

export default function ListaOrdenesDetallesOrden({
  esListaCompleta,
  detallesOrden,
  establecerVistaOrden,
}) {
  // LA GUIA SOLO VIENE CUANDO EL PEDIDO ES SELECCIONADO DESDE LA VISTA DE "ORDENES"
  const { CodigoRastreo, GuiaOrden } = detallesOrden;
  const [indiceOrden, establecerIndiceOrden] = useState(0);
  const { paquete, cargandoPaquete } = useBuscarOrdenesPorPaquete({
    CodigoRastreo,
    GuiaOrden,
  });

  const { movimientos, cargandoMovimientos } = useBuscarMovimientosDeUnaOrden(
    paquete?.[indiceOrden]?.GuiaOrden // Usa acceso condicional por si el paquete o el índice son indefinidos
  );

  const SiguientePedido = () => {
    if (indiceOrden < paquete.length - 1) {
      establecerIndiceOrden(indiceOrden + 1);
    }
  };
  const AnteriorPedido = () => {
    if (indiceOrden > 0) {
      establecerIndiceOrden(indiceOrden - 1);
    }
  };

  if (cargandoPaquete) return <Cargando />;

  // LA FUNCIÓN DE ReiniciarRealizarPedido ES PARA EL COMPONENTE DE "REALIZAR PEDIDO"
  return (
    <div className="ListaOrdenesDetallesOrden">
      {paquete.length > 0 ? (
        <>
          <section className="ListaOrdenesDetallesOrden__Opciones">
            <button
              className="ListaOrdenesDetallesOrden__Opciones--Boton Regresar"
              onClick={() => establecerVistaOrden(esListaCompleta ? 0 : 1)}
            >
              <ion-icon name="arrow-back"></ion-icon>
            </button>
            <span className="ListaOrdenesDetallesOrden__Opciones--Botones">
              <a
                className="ListaOrdenesDetallesOrden__Opciones--Boton Ticket"
                href={`${HOST_PDF}/${paquete[indiceOrden].TicketOrden}`}
                target="_blank"
              >
                <ion-icon name="ticket"></ion-icon>
              </a>
              {paquete.length > 1 && (
                <a
                  className="ListaOrdenesDetallesOrden__Opciones--Boton PaqueteTickets"
                  href={`${HOST_PDF}/${paquete[indiceOrden].PaqueteTicketsOrden}`}
                  target="_blank"
                >
                  <ion-icon name="cube"></ion-icon>
                </a>
              )}
            </span>
          </section>
          {paquete.length > 1 && (
            <section className="ListaOrdenesDetallesOrden__OtrasOrdenes">
              <small className="ListaOrdenesDetallesOrden__OtrasOrdenes--Texto">
                ¡Se han creado otros {paquete.length - 1} pedidos junto a este!{" "}
                <ion-icon name="documents"></ion-icon>
              </small>
              <div className="ListaOrdenesDetallesOrden__OtrasOrdenes--Botones">
                {indiceOrden > 0 && (
                  <button
                    className="ListaOrdenesDetallesOrden__OtrasOrdenes--Botones--Boton Anterior"
                    onClick={AnteriorPedido}
                  >
                    <ion-icon name="chevron-back"></ion-icon>
                  </button>
                )}
                {indiceOrden < paquete.length - 1 && (
                  <button
                    className="ListaOrdenesDetallesOrden__OtrasOrdenes--Botones--Boton Siguiente"
                    onClick={SiguientePedido}
                  >
                    <ion-icon name="chevron-forward"></ion-icon>
                  </button>
                )}
              </div>
              <small className="ListaOrdenesDetallesOrden__OtrasOrdenes--Texto">
                ({indiceOrden + 1}/{paquete.length})
              </small>
            </section>
          )}
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoEnvio.png" alt="Logo Envio" />
            <h1>Detalles de envío</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles Folio">
            <ion-icon name="folder"></ion-icon> <b>Folio</b> MGS
            {paquete[indiceOrden].idOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Guia">
            <ion-icon name="document-text"></ion-icon> <b>Orden</b>{" "}
            {paquete[indiceOrden].GuiaOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Usuario">
            <ion-icon name="person-circle"></ion-icon> <b>Usuario</b>{" "}
            {paquete[indiceOrden].UsuarioResponsableOrden}
          </div>
          <div
            className={`ListaOrdenesDetallesOrden__Detalles ${paquete[indiceOrden].EstadoOrden}`}
          >
            <ion-icon name="cash"></ion-icon> <b>Estado de pago</b>{" "}
            {paquete[indiceOrden].EstadoOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Agencia">
            <ion-icon name="business"></ion-icon> <b>Agencia</b>{" "}
            {paquete[indiceOrden].NombreAgencia}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Fecha">
            <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Remitente">
            <p className="ListaOrdenesDetallesOrden__Detalles__Encabezado">
              <ion-icon name="paper-plane"></ion-icon>{" "}
              <b>INFORMACIÓN DEL REMITENTE</b>
            </p>
            <p>
              <b>Nombre: </b>
              {paquete[indiceOrden].NombreRemitente}{" "}
              {paquete[indiceOrden].ApellidosRemitente}
            </p>
            <p>
              <b>Teléfono(s): </b>
              {paquete[indiceOrden].CelularRemitente}
              {paquete[indiceOrden].TelefonoCasaRemitente &&
                ` - ${paquete[indiceOrden].TelefonoCasaRemitente}`}
            </p>
            <p>
              <b>Correo: </b>
              {paquete[indiceOrden].CorreoRemitente}
            </p>
            <p>
              <b>Dirección: </b>
              <br />
              {paquete[indiceOrden].PaisRemitente} <br />{" "}
              {paquete[indiceOrden].EstadoRemitente},{" "}
              {paquete[indiceOrden].CiudadRemitente},{" "}
              {paquete[indiceOrden].DireccionRemitente}{" "}
              {paquete[indiceOrden].CodigoPostalRemitente}
            </p>
            {paquete[indiceOrden].ReferenciaRemitente && (
              <p>
                <b>Referencia: </b>
                {paquete[indiceOrden].ReferenciaRemitente}
              </p>
            )}
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoImportes.png" alt="Logo Importes" />
            <h1>Importes</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="apps"></ion-icon> <b>Cantidad</b>
            {paquete[indiceOrden].CantidadProductosOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="logo-dropbox"></ion-icon>{" "}
            <b>Costo de la caja vacía</b>
            {paquete[indiceOrden].CostoCajaVaciaOrden.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Total">
            <ion-icon name="cash"></ion-icon> <b>Total</b>
            {paquete[indiceOrden].TotalProductosOrden.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoRastreo.png" alt="Logo Rastreo" />
            <h1>Movimientos del pedido</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles Movimiento">
            {cargandoMovimientos ? (
              <Cargando />
            ) : (
              <>
                <span className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado">
                  <p className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="bag-handle"></ion-icon>{" "}
                    <b>Estado del pedido</b>
                  </p>
                  <p className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="car"></ion-icon> <b>Movimiento</b>
                  </p>
                  <p className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>
                  </p>
                  <p className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="locate"></ion-icon> <b>Origen</b>
                  </p>
                </span>
                {movimientos.length > 0 ? (
                  movimientos.map((movimiento, index) => (
                    <span
                      key={index}
                      className={`ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado ${movimiento.EstadoMovimiento}`}
                    >
                      <b className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.EstadoMovimiento.toUpperCase()}
                      </b>
                      <b className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.DetallesMovimiento}
                      </b>
                      <b className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.FechaCreacionMovimiento.slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}{" "}
                        {movimiento.HoraCreacionMovimiento}
                      </b>
                      <b className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                        {movimiento.OrigenMovimiento}
                      </b>
                    </span>
                  ))
                ) : (
                  <MensajeGeneral
                    Imagen={"SinResultados.png"}
                    Texto={"¡Oops! No se encontraron resultados."}
                  />
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={"No se encontraron resultados."}
        />
      )}
    </div>
  );
}
