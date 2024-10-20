/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorPaquete from "../../hooks/useBuscarOrdenesPorPaquete";
import useBuscarMovimientosDeUnaOrden from "../../hooks/useBuscarMovimientosDeUnaOrden";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";
import { HOST_PDF } from "../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/DetallesDeLaOrden.css";

export default function DetallesDeLaOrden({
  detallesOrden,
  establecerVista,
  ReiniciarRealizarPedido,
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
    <div className="DetallesDeLaOrden">
      <section className="DetallesDeLaOrden__Opciones">
        {ReiniciarRealizarPedido ? (
          <button
            className="DetallesDeLaOrden__Opciones--Boton OtraOrden"
            onClick={() => ReiniciarRealizarPedido()}
          >
            <ion-icon name="repeat"></ion-icon>
          </button>
        ) : (
          <button
            className="DetallesDeLaOrden__Opciones--Boton Regresar"
            onClick={() => establecerVista(0)}
          >
            <ion-icon name="arrow-back"></ion-icon>
          </button>
        )}
        <span className="DetallesDeLaOrden__Opciones--Botones">
          <a
            className="DetallesDeLaOrden__Opciones--Boton Ticket"
            href={`${HOST_PDF}/${paquete[indiceOrden].TicketOrden}`}
            target="_blank"
          >
            <ion-icon name="ticket"></ion-icon>
          </a>
          {paquete.length > 1 && (
            <a
              className="DetallesDeLaOrden__Opciones--Boton PaqueteTickets"
              href={`${HOST_PDF}/${paquete[indiceOrden].PaqueteTicketsOrden}`}
              target="_blank"
            >
              <ion-icon name="cube"></ion-icon>
            </a>
          )}
        </span>
      </section>
      {paquete.length > 1 && (
        <section className="DetallesDeLaOrden__OtrasOrdenes">
          <small className="DetallesDeLaOrden__OtrasOrdenes--Texto">
            ¡Se han creado otros {paquete.length - 1} pedidos junto a este!{" "}
            <ion-icon name="documents"></ion-icon>
          </small>
          <div className="DetallesDeLaOrden__OtrasOrdenes--Botones">
            {indiceOrden > 0 && (
              <button
                className="DetallesDeLaOrden__OtrasOrdenes--Botones--Boton Anterior"
                onClick={AnteriorPedido}
              >
                <ion-icon name="chevron-back"></ion-icon>
              </button>
            )}
            {indiceOrden < paquete.length - 1 && (
              <button
                className="DetallesDeLaOrden__OtrasOrdenes--Botones--Boton Siguiente"
                onClick={SiguientePedido}
              >
                <ion-icon name="chevron-forward"></ion-icon>
              </button>
            )}
          </div>
          <small className="DetallesDeLaOrden__OtrasOrdenes--Texto">
            ({indiceOrden + 1}/{paquete.length})
          </small>
        </section>
      )}
      <section className="DetallesDeLaOrden__Seccion">
        <img src="LogoEnvio.png" alt="Logo Envio" />
        <h1>Detalles de envío</h1>
      </section>
      <div className="DetallesDeLaOrden__Detalles Folio">
        <ion-icon name="folder"></ion-icon> <b>Folio</b> MGS
        {paquete[indiceOrden].idOrden}
      </div>
      <div className="DetallesDeLaOrden__Detalles Guia">
        <ion-icon name="document-text"></ion-icon> <b>Guia</b>{" "}
        {paquete[indiceOrden].GuiaOrden}
      </div>
      <div className="DetallesDeLaOrden__Detalles Usuario">
        <ion-icon name="person-circle"></ion-icon> <b>Usuario</b>{" "}
        {paquete[indiceOrden].UsuarioResponsableOrden}
      </div>
      <div
        className={`DetallesDeLaOrden__Detalles ${paquete[indiceOrden].EstadoOrden}`}
      >
        <ion-icon name="cash"></ion-icon> <b>Estado de pago</b>{" "}
        {paquete[indiceOrden].EstadoOrden}
      </div>
      <div className="DetallesDeLaOrden__Detalles Agencia">
        <ion-icon name="business"></ion-icon> <b>Agencia</b>{" "}
        {paquete[indiceOrden].NombreAgencia}
      </div>
      <div className="DetallesDeLaOrden__Detalles Fecha">
        <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>{" "}
        {FormatearFecha(paquete[indiceOrden].FechaCreacionOrden.slice(0, 10))}{" "}
        {paquete[indiceOrden].HoraCreacionOrden}
      </div>
      <div className="DetallesDeLaOrden__Detalles Remitente">
        <p className="DetallesDeLaOrden__Detalles__Encabezado">
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
      {/* <section className="DetallesDeLaOrden__Seccion">
        <img src="LogoPaquete.png" alt="Logo Paquete" />
        <h1>Detalles del paquete</h1>
      </section>
      <div className="DetallesDeLaOrden__Detalles Largo">
        <ion-icon name="swap-vertical"></ion-icon> <b>Largo</b>
        {paquete[indiceOrden].LargoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles Ancho">
        <ion-icon name="swap-horizontal"></ion-icon> <b>Ancho</b>
        {paquete[indiceOrden].AnchoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles Alto">
        <ion-icon name="arrow-up"></ion-icon> <b>Alto</b>
        {paquete[indiceOrden].AltoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles PieCubico">
        <ion-icon name="cube"></ion-icon> <b>Pie cubico</b>
        {paquete[indiceOrden].PieCubicoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles Volumen">
        <ion-icon name="cube"></ion-icon> <b>Volumen</b>
        {paquete[indiceOrden].LargoPedido} x {paquete[indiceOrden].AnchoPedido}{" "}
        x {paquete[indiceOrden].AltoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles Peso">
        <ion-icon name="cube"></ion-icon> <b>Peso</b>
        {paquete[indiceOrden].PesoPedido}
      </div>
      <div className="DetallesDeLaOrden__Detalles Contenido">
        <ion-icon name="document-text"></ion-icon> <b>Contenido</b>
        {paquete[indiceOrden].ContenidoPedido}
      </div> */}
      <section className="DetallesDeLaOrden__Seccion">
        <img src="LogoImportes.png" alt="Logo Importes" />
        <h1>Importes</h1>
      </section>
      <div className="DetallesDeLaOrden__Detalles Total">
        <ion-icon name="cube"></ion-icon> <b>Costo de la caja vacía</b>
        {paquete[indiceOrden].CostoCajaVaciaOrden.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <section className="DetallesDeLaOrden__Seccion">
        <img src="LogoRastreo.png" alt="Logo Rastreo" />
        <h1>Movimientos del pedido</h1>
      </section>
      <div className="DetallesDeLaOrden__Detalles Movimiento">
        {cargandoMovimientos ? (
          <Cargando />
        ) : (
          <>
            <span className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado">
              <p className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                <ion-icon name="bag-handle"></ion-icon> <b>Estado del pedido</b>
              </p>
              <p className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                <ion-icon name="car"></ion-icon> <b>Movimiento</b>
              </p>
              <p className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                <ion-icon name="calendar"></ion-icon> <b>Fecha y hora</b>
              </p>
              <p className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                <ion-icon name="locate"></ion-icon> <b>Origen</b>
              </p>
            </span>

            {movimientos.map((movimiento, index) => (
              <span
                key={index}
                className={`DetallesDeLaOrden__Detalles__Movimiento--Encabezado ${movimiento.EstadoMovimiento}`}
              >
                <b className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                  {movimiento.EstadoMovimiento.toUpperCase()}
                </b>
                <b className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                  {movimiento.DetallesMovimiento}
                </b>
                <b className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                  {movimiento.FechaCreacionMovimiento.slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}{" "}
                  {movimiento.HoraCreacionMovimiento}
                </b>
                <b className="DetallesDeLaOrden__Detalles__Movimiento--Encabezado--Descripcion">
                  {movimiento.OrigenMovimiento}
                </b>
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
