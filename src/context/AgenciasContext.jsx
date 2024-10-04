/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudRegistrarAgencia,
  SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario,
  SolicitudBuscarProductosQueTieneLaAgencia,
  SolicitudBuscarProductosQueNoTieneLaAgencia,
  SolicitudAsignarProductoAgencia,
  SolicitudDesasignarProductoAgencia,
  SolicitudActualizarEstadoAgencia,
  SolicitudActualizarInformacionAgencia,
  SolicitudBuscarAgenciasPorFiltro,
} from "../api/authAgencias";

export const AgenciasContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAgencias = () => {
  const context = useContext(AgenciasContext);
  if (!context) {
    throw new Error(
      "useAgencias debería ser usado dentro de Proveedor agencias"
    );
  }
  return context;
};
export const ProveedorAgencias = ({ children }) => {
  const RegistrarAgencia = async (data) => {
    try {
      const res = await SolicitudRegistrarAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const BuscarAgenciasPorFiltroYTipoDeUsuario = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const BuscarProductosQueTieneLaAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarProductosQueTieneLaAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const BuscarProductosQueNoTieneLaAgencia = async (data) => {
    try {
      const res = await SolicitudBuscarProductosQueNoTieneLaAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const AsignarProductoAgencia = async (data) => {
    try {
      const res = await SolicitudAsignarProductoAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const DesasignarProductoAgencia = async (data) => {
    try {
      const res = await SolicitudDesasignarProductoAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const ActualizarEstadoAgencia = async (data) => {
    try {
      const res = await SolicitudActualizarEstadoAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const ActualizarInformacionAgencia = async (data) => {
    try {
      const res = await SolicitudActualizarInformacionAgencia(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const BuscarAgenciasPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarAgenciasPorFiltro(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <AgenciasContext.Provider
      value={{
        RegistrarAgencia,
        BuscarAgenciasPorFiltroYTipoDeUsuario,
        BuscarProductosQueTieneLaAgencia,
        BuscarProductosQueNoTieneLaAgencia,
        AsignarProductoAgencia,
        DesasignarProductoAgencia,
        ActualizarEstadoAgencia,
        ActualizarInformacionAgencia,
        BuscarAgenciasPorFiltro,
      }}
    >
      {children}
    </AgenciasContext.Provider>
  );
};
