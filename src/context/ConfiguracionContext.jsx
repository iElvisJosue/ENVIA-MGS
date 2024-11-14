/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import {
  SolicitudObtenerTiposDeCarga,
  SolicitudObtenerTiposDeEnvio,
  SolicitudObtenerApiGoogleMapsAutoCompletado,
} from "../api/authConfiguracion";

export const ConfiguracionContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useConfiguracion = () => {
  const context = useContext(ConfiguracionContext);
  if (!context) {
    throw new Error(
      "useConfiguracion debería ser usado dentro de Proveedor configuracion"
    );
  }
  return context;
};
export const ProveedorConfiguracion = ({ children }) => {
  const ObtenerTiposDeCarga = async (data) => {
    try {
      const res = await SolicitudObtenerTiposDeCarga(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const ObtenerTiposDeEnvio = async (data) => {
    try {
      const res = await SolicitudObtenerTiposDeEnvio(data);
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const ObtenerApiGoogleMapsAutoCompletado = async (data) => {
    try {
      const res = await SolicitudObtenerApiGoogleMapsAutoCompletado(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <ConfiguracionContext.Provider
      value={{
        ObtenerTiposDeCarga,
        ObtenerTiposDeEnvio,
        ObtenerApiGoogleMapsAutoCompletado,
      }}
    >
      {children}
    </ConfiguracionContext.Provider>
  );
};
