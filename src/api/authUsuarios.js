import axios from "./axios";

// SOLICITUD PARA REGISTRAR UN USUARIO
export const SolicitudRegistrarUsuario = (data) =>
  axios.post("/usuarios/RegistrarUsuario", data);
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE TIENE EL USUARIO
export const SolicitudBuscarAgenciasQueTieneElUsuario = (data) =>
  axios.post("/usuarios/BuscarAgenciasQueTieneElUsuario", data);
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE NO TIENE EL USUARIO
export const SolicitudBuscarAgenciasQueNoTieneElUsuario = (data) =>
  axios.post("/usuarios/BuscarAgenciasQueNoTieneElUsuario", data);
// SOLICITUD PARA ASIGNAR UNA AGENCIA AL USUARIO
export const SolicitudAsignarAgenciaAlUsuario = (data) =>
  axios.post("/usuarios/AsignarAgenciaAlUsuario", data);
// SOLICITUD PARA DESASIGNAR UNA AGENCIA AL USUARIO
export const SolicitudDesasignarAgenciaAlUsuario = (data) =>
  axios.post("/usuarios/DesasignarAgenciaAlUsuario", data);
// SOLICITUD PARA BUSCAR USUARIOS PARA ADMINISTRAR POR FILTRO
export const SolicitudBuscarUsuariosParaAdministrarPorFiltro = (data) =>
  axios.post("/usuarios/BuscarUsuariosParaAdministrarPorFiltro", data);
// SOLICITUD PARA ACTIVAR O DESACTIVAR UN USUARIO
export const SolicitudActualizarEstadoUsuario = (data) =>
  axios.put("/usuarios/ActualizarEstadoUsuario", data);
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UN USUARIO
export const SolicitudActualizarInformacionDeUnUsuario = (data) =>
  axios.put("/usuarios/ActualizarInformacionDeUnUsuario", data);
