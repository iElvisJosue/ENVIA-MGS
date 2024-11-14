import axios from "./axios";

// SOLICITUD PARA OBTENER LOS PRODUCTOS
export const SolicitudObtenerProductos = (data) =>
  axios.post("/configuracion/ObtenerProductos", data);
// SOLICITUD PARA OBTENER LOS TIPOS DE CARGA
export const SolicitudObtenerTiposDeCarga = (data) =>
  axios.post("/configuracion/ObtenerTiposDeCarga", data);
// SOLICITUD PARA OBTENER LOS TIPOS DE ENVIO
export const SolicitudObtenerTiposDeEnvio = (data) =>
  axios.post("/configuracion/ObtenerTiposDeEnvio", data);
// PETICIÓN PARA OBTENER LA API DE GOOGLE MAPS AUTO COMPLETADO
export const SolicitudObtenerApiGoogleMapsAutoCompletado = ({
  CookieConToken,
}) =>
  axios.get(
    `/configuracion/ObtenerApiGoogleMapsAutoCompletado/${CookieConToken}`
  );
