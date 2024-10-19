/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDeOrdenesCompleta from "./ListaDeOrdenesCompleta";
import BuscarOrdenesPorFecha from "./BuscarOrdenesPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/ListaDeOrdenes.css";

export default function ListaDeOrdenes({
  establecerDetallesDeLaOrden,
  establecerVista,
  establecerInformacionDelRemitente,
  establecerInformacionDeLaOrden,
  establecerInformacionDeLaAgencia,
}) {
  const [vistaOrden, establecerVistaOrden] = useState(0);

  const EstablecerLosDetallesDeLaOrden = (orden) => {
    establecerDetallesDeLaOrden(orden);
    establecerVista(1);
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

    establecerVista(2);
  };

  return (
    <div className="ListaDeOrdenes">
      <span className="ListaDeOrdenes__Opciones">
        {vistaOrden === 0 ? (
          <button
            type="button"
            className="ListaDeOrdenes__Opciones--Boton BuscarPorFecha"
            onClick={() => establecerVistaOrden(1)}
          >
            <ion-icon name="calendar"></ion-icon>
          </button>
        ) : (
          <button
            type="button"
            className="ListaDeOrdenes__Opciones--Boton ListaCompleta"
            onClick={() => establecerVistaOrden(0)}
          >
            <ion-icon name="list"></ion-icon>
          </button>
        )}
      </span>
      {vistaOrden === 0 ? (
        <ListaDeOrdenesCompleta
          EstablecerLosDetallesDeLaOrden={EstablecerLosDetallesDeLaOrden}
          EstablecerElRemitenteYLaOrden={EstablecerElRemitenteYLaOrden}
        />
      ) : (
        <BuscarOrdenesPorFecha
          EstablecerLosDetallesDeLaOrden={EstablecerLosDetallesDeLaOrden}
          EstablecerElRemitenteYLaOrden={EstablecerElRemitenteYLaOrden}
        />
      )}
    </div>
  );
}
