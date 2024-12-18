/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudGuardarTodaLaInformacion,
  SolicitudBuscarPedidosPorFiltro,
  SolicitudBuscarPedidosPorPaquete,
  SolicitudBuscarRemitentesPorAgencia,
  SolicitudBuscarDestinatariosPorAgencia,
  SolicitudBuscarUltimosDiezPedidos,
  SolicitudBuscarMovimientosDeUnPedido,
  SolicitudBuscarPedidoPorNumeroDeGuia,
  SolicitudBuscarPedidosPorFecha,
  SolicitudGuardarInformacionDeLaOrden,
  SolicitudBuscarOrdenesPorFiltro,
  SolicitudBuscarOrdenesPorFecha,
  SolicitudBuscarMovimientosDeUnaOrden,
  SolicitudBuscarOrdenesPorPaquete,
  SolicitudCompletarInformacionDeUnaOrden,
} from "../api/authPedidos";

export const PedidosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos debería ser usado dentro de Proveedor pedidos");
  }
  return context;
};
export const ProveedorPedidos = ({ children }) => {
  const GuardarTodaLaInformacion = async (data) => {
    try {
      const res = await SolicitudGuardarTodaLaInformacion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidosPorPaquete = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosPorPaquete(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarRemitentesPorAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarRemitentesPorAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDestinatariosPorAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarDestinatariosPorAgencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarUltimosDiezPedidos = async () => {
    try {
      const res = await SolicitudBuscarUltimosDiezPedidos();
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarMovimientosDeUnPedido = async (data) => {
    try {
      const res = await SolicitudBuscarMovimientosDeUnPedido(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarPedidoPorNumeroDeGuia = async (data) => {
    try {
      const res = await SolicitudBuscarPedidoPorNumeroDeGuia(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const BuscarPedidosPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarPedidosPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const GuardarInformacionDeLaOrden = async (data) => {
    try {
      const res = await SolicitudGuardarInformacionDeLaOrden(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarOrdenesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarOrdenesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarOrdenesPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarOrdenesPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarMovimientosDeUnaOrden = async (data) => {
    try {
      const res = await SolicitudBuscarMovimientosDeUnaOrden(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarOrdenesPorPaquete = async (data) => {
    try {
      const res = await SolicitudBuscarOrdenesPorPaquete(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const CompletarInformacionDeUnaOrden = async (data) => {
    try {
      const res = await SolicitudCompletarInformacionDeUnaOrden(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        GuardarTodaLaInformacion,
        BuscarPedidosPorFiltro,
        BuscarPedidosPorPaquete,
        BuscarRemitentesPorAgencia,
        BuscarDestinatariosPorAgencia,
        BuscarUltimosDiezPedidos,
        BuscarMovimientosDeUnPedido,
        BuscarPedidoPorNumeroDeGuia,
        BuscarPedidosPorFecha,
        GuardarInformacionDeLaOrden,
        BuscarOrdenesPorFiltro,
        BuscarOrdenesPorFecha,
        BuscarMovimientosDeUnaOrden,
        BuscarOrdenesPorPaquete,
        CompletarInformacionDeUnaOrden,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};
