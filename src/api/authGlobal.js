import axios from "./axios";

// PETICIÓN PARA INICIAR SESIÓN
export const SolicitudIniciarSesion = (data) =>
  axios.post("/global/IniciarSesion", data);
// PETICIÓN PARA VERIFICAR TOKEN DEL NAVEGADOR
export const SolicitudVerificarToken = (data) =>
  axios.post("/global/VerificarToken", data);
// PETICIÓN PARA CERRAR SESIÓN
export const SolicitudCerrarSesion = (data) =>
  axios.post("/global/CerrarSesion", data);
