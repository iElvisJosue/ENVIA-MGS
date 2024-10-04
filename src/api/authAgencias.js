import axios from "./axios";

// SOLICITUD PARA REGISTRAR UNA AGENCIA
export const SolicitudRegistrarAgencia = (data) =>
  axios.post("/agencias/RegistrarAgencia", data);
// SOLICITUD PARA BUSCAR LAS AGENCIAS POR FILTRO Y TIPO DE USUARIO
export const SolicitudBuscarAgenciasPorFiltroYTipoDeUsuario = (data) =>
  axios.post("/agencias/BuscarAgenciasPorFiltroYTipoDeUsuario", data);
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE TIENE LA AGENCIA
export const SolicitudBuscarProductosQueTieneLaAgencia = (data) =>
  axios.post("/agencias/BuscarProductosQueTieneLaAgencia", data);
// SOLICITUD PARA BUSCAR LOS PRODUCTOS QUE NO TIENE LA AGENCIA
export const SolicitudBuscarProductosQueNoTieneLaAgencia = (data) =>
  axios.post("/agencias/BuscarProductosQueNoTieneLaAgencia", data);
// SOLICITUD PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudAsignarProductoAgencia = (data) =>
  axios.post("/agencias/AsignarProductoAgencia", data);
// SOLICITUD PARA DESASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudDesasignarProductoAgencia = (data) =>
  axios.post("/agencias/DesasignarProductoAgencia", data);
// SOLICITUD PARA ACTIVAR O DESACTIVAR UNA AGENCIA
export const SolicitudActualizarEstadoAgencia = (data) =>
  axios.put("/agencias/ActualizarEstadoAgencia", data);
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UNA AGENCIA
export const SolicitudActualizarInformacionAgencia = (data) =>
  axios.put("/agencias/ActualizarInformacionAgencia", data);
// SOLICITUD PARA BUSCAR UNA AGENCIAS POR FILTRO
export const SolicitudBuscarAgenciasPorFiltro = (data) =>
  axios.post("/agencias/BuscarAgenciasPorFiltro", data);
