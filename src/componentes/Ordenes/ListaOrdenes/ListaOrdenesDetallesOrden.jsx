/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorPaquete from "../../../hooks/useBuscarOrdenesPorPaquete";
// import useBuscarMovimientosDeUnaOrden from "../../../hooks/useBuscarMovimientosDeUnaOrden";

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

  // const { movimientos, cargandoMovimientos } = useBuscarMovimientosDeUnaOrden(
  //   paquete?.[indiceOrden]?.GuiaOrden // Usa acceso condicional por si el paquete o el índice son indefinidos
  // );

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
            <img src="LogoEnvio.png" alt="Logo Detalles de orden" />
            <h1>Detalles de orden</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles Guia">
            <ion-icon name="document-text"></ion-icon> <b>Orden ID</b>{" "}
            {paquete[indiceOrden].idOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Folio">
            <ion-icon name="folder"></ion-icon> <b>Código Itinerario</b>
            COL-42082-66866
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="folder"></ion-icon> <b>Tipo</b>
            <select
              name="TipoOrden"
              id="TipoOrden"
              className="ListaOrdenesDetallesOrden__Detalles--Select Tipo"
              tabIndex={-1}
            >
              <option value="Recolectar">Recolectar</option>
              <option value="Comercial">Comercial</option>
              <option value="Dejar">Dejar</option>
              <option value="Entregar">Entregar</option>
              <option value="Sin actualizar">Sin actualizar</option>
            </select>
          </div>
          <div
            className={`ListaOrdenesDetallesOrden__Detalles ${paquete[indiceOrden].EstadoOrden}`}
          >
            <ion-icon name="stopwatch"></ion-icon> <b>Estado de orden</b>{" "}
            <select
              name="EstadoOrden"
              id="EstadoOrden"
              className="ListaOrdenesDetallesOrden__Detalles--Select"
              tabIndex={-1}
            >
              <option value="Confirmada">Confirmada</option>
              <option value="Entregada">Entregada</option>
              <option value="Extraviada">Extraviada</option>
              <option value="Liquidada">Liquidada</option>
              <option value="Pagada">Pagada</option>
              <option value="Retornada">Retornada</option>
            </select>
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Declarado Dos">
            <ion-icon name="cash"></ion-icon> <b>Valor Declarado</b>
            {paquete[indiceOrden].CostoCajaVaciaOrden.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Dos Total">
            <ion-icon name="cash"></ion-icon> <b>A cobrar</b>
            {paquete[indiceOrden].TotalProductosOrden.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          {/* <div className="ListaOrdenesDetallesOrden__Detalles Agencia">
            <ion-icon name="business"></ion-icon> <b>Agencia</b>{" "}
            {paquete[indiceOrden].NombreAgencia}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Fecha">
            <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div> */}
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="VenedorUsuario.png" alt="Logo Usuario y Vendedor" />
            <h1>Usuario y Vendedor</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="color-palette"></ion-icon> <b>Paleta</b> FDSIMMY2
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Vendedor">
            <ion-icon name="storefront"></ion-icon> <b>Vendedor</b>{" "}
            {paquete[indiceOrden].UsuarioResponsableOrden} (34485)
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="person-circle"></ion-icon> <b>Manager</b> (36053)
            ARIEL U
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="eye"></ion-icon> <b>Verificador</b> Sin definir
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoRemitente.png" alt="Logo Remitente" />
            <h1>Remitente</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="person-circle"></ion-icon> <b>Nombre</b>{" "}
            {paquete[indiceOrden].NombreRemitente}{" "}
            {paquete[indiceOrden].ApellidosRemitente}
            {/* <p className="ListaOrdenesDetallesOrden__Detalles__Encabezado">
              <ion-icon name="paper-plane"></ion-icon>{" "}
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
            )} */}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="call"></ion-icon> <b>Teléfono (1)</b>{" "}
            {paquete[indiceOrden].CelularRemitente}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="call"></ion-icon> <b>Teléfono (2)</b>{" "}
            {paquete[indiceOrden].TelefonoCasaRemitente || "N/A"}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="mail"></ion-icon> <b>Correo</b>{" "}
            {paquete[indiceOrden].CorreoRemitente}
          </div>
          {/* <section className="ListaOrdenesDetallesOrden__Seccion">
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
          </div> */}
          {/* <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoRastreo.png" alt="Logo Rastreo" />
            <h1>Movimientos de la orden</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles Movimiento">
            {cargandoMovimientos ? (
              <Cargando />
            ) : (
              <>
                <span className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado">
                  <p className="ListaOrdenesDetallesOrden__Detalles__Movimiento--Encabezado--Descripcion">
                    <ion-icon name="bag-handle"></ion-icon>{" "}
                    <b>Estado de la orden</b>
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
          </div> */}
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoDestinatario.png" alt="Logo Destinatario" />
            <h1>Destinatario</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="flag"></ion-icon> <b>País</b>{" "}
            {paquete[indiceOrden].PaisRemitente}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="location"></ion-icon> <b>Estado</b>{" "}
            {paquete[indiceOrden].EstadoRemitente}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="locate"></ion-icon> <b>Ciudad</b>{" "}
            {paquete[indiceOrden].CiudadRemitente}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="pin"></ion-icon> <b>Código Postal</b>{" "}
            {paquete[indiceOrden].CodigoPostalRemitente}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Cuatro">
            <ion-icon name="trail-sign"></ion-icon> <b>Dirección</b>{" "}
            {paquete[indiceOrden].DireccionRemitente}
            <br />
            {paquete[indiceOrden].ReferenciaRemitente &&
              paquete[indiceOrden].ReferenciaRemitente}
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoFechas.png" alt="Logo Fechas" />
            <h1>Fechas</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="log-in"></ion-icon> <b>Ingreso</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="checkmark-circle"></ion-icon> <b>Verificación</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="send"></ion-icon> <b>Envío</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Recibio">
            <ion-icon name="bag-check"></ion-icon> <b>Recibió</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoEntrega.png" alt="Logo Entrega" />
            <h1>Entrega</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles Dos MedioDeEnvio">
            <ion-icon name="airplane"></ion-icon> <b>Medio de envío</b>
            <select
              name="MedioDeEnvio"
              id="MedioDeEnvio"
              className="ListaOrdenesDetallesOrden__Detalles--Select"
              tabIndex={-1}
            >
              <option value="Aereo">Aereo</option>
              <option value="Cita">Cita</option>
              <option value="Oficina">Oficina</option>
              <option value="Retiro en local">Retiro en local</option>
              <option value="Ruta">Ruta</option>
              <option value="SPF">SPF</option>
            </select>
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="calendar"></ion-icon> <b>Fecha de entrega</b>{" "}
            {FormatearFecha(
              paquete[indiceOrden].FechaCreacionOrden.slice(0, 10)
            )}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="time"></ion-icon> <b>Horario</b>{" "}
            {paquete[indiceOrden].HoraCreacionOrden}
          </div>
          <section className="ListaOrdenesDetallesOrden__Seccion">
            <img src="LogoRastreo.png" alt="Logo Rastreo" />
            <h1>Seguimiento</h1>
          </section>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="document-text"></ion-icon> <b>Guía</b>{" "}
            {paquete[indiceOrden].GuiaOrden}
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles">
            <ion-icon name="search"></ion-icon> <b>Rastreo</b> RF123456789US
          </div>
          <div className="ListaOrdenesDetallesOrden__Detalles Dos">
            <ion-icon name="color-palette"></ion-icon>{" "}
            <b>Numeración de paleta</b> PLT-00012345
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
