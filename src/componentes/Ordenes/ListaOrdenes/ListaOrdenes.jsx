/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeOrdenesCompleta from "./ListaOrdenesCompleta";
import ListaOrdenesPorFecha from "./ListaOrdenesPorFecha";
import ListaOrdenesDetallesOrden from "./ListaOrdenesDetallesOrden";
import ListaDeOrdenesRealizarPedidoOrden from "./ListaDeOrdenesRealizarPedidoOrden";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/ListaOrdenes/ListaOrdenes.css";

export default function ListaOrdenes() {
  const [vistaOrden, establecerVistaOrden] = useState(0);
  const [esListaCompleta, establecerEsListaCompleta] = useState(true);
  const [detallesOrden, establecerDetallesDeLaOrden] = useState(null);
  const [informacionDelRemitente, establecerInformacionDelRemitente] =
    useState(null);
  const [informacionDeLaOrden, establecerInformacionDeLaOrden] = useState(null);
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const EstablecerLosDetallesDeLaOrden = (orden, completa) => {
    establecerDetallesDeLaOrden(orden);
    establecerEsListaCompleta(completa);
    establecerVistaOrden(2);
  };

  const EstablecerElRemitenteYLaOrden = (infOrden) => {
    const remitente = {
      idRemitente: infOrden.idRemitente,
      NombreRemitente: infOrden.NombreRemitente,
      ApellidosRemitente: infOrden.ApellidosRemitente,
      TelefonoCasaRemitente: infOrden.TelefonoCasaRemitente,
      CelularRemitente: infOrden.CelularRemitente,
      CorreoRemitente: infOrden.CorreoRemitente,
      PaisRemitente: infOrden.PaisRemitente,
      CodigoPaisRemitente: infOrden.CodigoPaisRemitente,
      EstadoRemitente: infOrden.EstadoRemitente,
      CiudadRemitente: infOrden.CiudadRemitente,
      CodigoPostalRemitente: infOrden.CodigoPostalRemitente,
      DireccionRemitente: infOrden.DireccionRemitente,
      ReferenciaRemitente: infOrden.ReferenciaRemitente,
    };
    const orden = {
      idOrden: infOrden.idOrden,
      GuiaOrden: infOrden.GuiaOrden,
      ProductoOrden: infOrden.ProductoOrden,
      CostoCajaVaciaOrden: infOrden.CostoCajaVaciaOrden,
      EstadoOrden: infOrden.EstadoOrden,
      LargoOrden: infOrden.LargoOrden,
      AnchoOrden: infOrden.AnchoOrden,
      AltoOrden: infOrden.AltoOrden,
      TotalOrden: infOrden.TotalOrden,
      UsuarioResponsableOrden: infOrden.UsuarioResponsableOrden,
      TicketOrden: infOrden.TicketOrden,
      PaqueteTicketsOrden: infOrden.PaqueteTicketsOrden,
    };
    const agencia = {
      idAgencia: infOrden.idAgencia,
      NombreAgencia: infOrden.NombreAgencia,
      NombreContactoAgencia: infOrden.NombreContactoAgencia,
      TelefonoContactoAgencia: infOrden.TelefonoContactoAgencia,
      CorreoContactoAgencia: infOrden.CorreoContactoAgencia,
      PaisAgencia: infOrden.PaisAgencia,
      CodigoPaisAgencia: infOrden.CodigoPaisAgencia,
      EstadoAgencia: infOrden.EstadoAgencia,
      CiudadAgencia: infOrden.CiudadAgencia,
      CodigoPostalAgencia: infOrden.CodigoPostalAgencia,
      DireccionAgencia: infOrden.DireccionAgencia,
    };
    establecerInformacionDelRemitente(remitente);
    establecerInformacionDeLaOrden(orden);
    establecerInformacionDeLaAgencia(agencia);

    establecerVistaOrden(3);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vistaOrden,
    establecerVistaOrden,
    esListaCompleta,
    establecerEsListaCompleta,
    detallesOrden,
    establecerDetallesDeLaOrden,
    informacionDelRemitente,
    establecerInformacionDelRemitente,
    informacionDeLaOrden,
    establecerInformacionDeLaOrden,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
    EstablecerElRemitenteYLaOrden,
    EstablecerLosDetallesDeLaOrden,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeOrdenesCompleta,
    1: ListaOrdenesPorFecha,
    2: ListaOrdenesDetallesOrden,
    3: ListaDeOrdenesRealizarPedidoOrden,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vistaOrden];

  return (
    <div className="ListaOrdenes">
      {vistaOrden < 2 && (
        <span className="ListaOrdenes__Opciones">
          {vistaOrden === 0 ? (
            <button
              type="button"
              className="ListaOrdenes__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVistaOrden(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaOrdenes__Opciones--Boton ListaCompleta"
              onClick={() => establecerVistaOrden(0)}
            >
              <ion-icon name="list"></ion-icon>
            </button>
          )}
        </span>
      )}
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
