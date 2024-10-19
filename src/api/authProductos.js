import axios from "./axios";

// SOLICITUD PARA OBTENER REGISTRAR UN PRODUCTO
export const SolicitudRegistrarProducto = (data) =>
  axios.post("/productos/RegistrarProducto", data);
// SOLICITUD PARA OBTENER LOS PRODUCTOS DE UNA AGENCIA
export const SolicitudObtenerProductosPorAgencia = (data) =>
  axios.post("/productos/ObtenerProductosPorAgencia", data);
// SOLICITUD PARA BUSCAR LOS PRODUCTOS POR FILTRO
export const SolicitudBuscarProductosPorFiltro = (data) =>
  axios.post("/productos/BuscarProductosPorFiltro", data);
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE TIENE UN PRODUCTO
export const SolicitudBuscarAgenciasQueTieneUnProducto = (data) =>
  axios.post("/productos/BuscarAgenciasQueTieneUnProducto", data);
// SOLICITUD PARA BUSCAR LAS AGENCIAS QUE NO TIENE UN PRODUCTO
export const SolicitudBuscarAgenciasQueNoTieneUnProducto = (data) =>
  axios.post("/productos/BuscarAgenciasQueNoTieneUnProducto", data);
// SOLICITUD PARA ASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudAsignarAgenciaAlProducto = (data) =>
  axios.post("/productos/AsignarAgenciaAlProducto", data);
// SOLICITUD PARA DESASIGNAR UN PRODUCTO A UNA AGENCIA
export const SolicitudDesasignarAgenciaAlProducto = (data) =>
  axios.post("/productos/DesasignarAgenciaAlProducto", data);
// SOLICITUD PARA ACTUALIZAR LA INFORMACION DE UN PRODUCTO
export const SolicitudActualizarInformacionDeUnProducto = (data) =>
  axios.put("/productos/ActualizarInformacionDeUnProducto", data);
// SOLICITUD PARA ACTIVAR O DESACTIVAR UN PRODUCTO
export const SolicitudActualizarEstadoProducto = (data) =>
  axios.put("/productos/ActualizarEstadoProducto", data);
// SOLICITUD PARA ACTUALIZAR SI EL PRODUCTO SE VENDE
export const SolicitudActualizarSeVendeProducto = (data) =>
  axios.put("/productos/ActualizarSeVendeProducto", data);
// SOLICITUD PARA ACTUALIZAR SI EL PRODUCTO SE VENDE
export const SolicitudObtenerProductosActivosYDisponiblesParaVender = ({
  CookieConToken,
}) =>
  axios.get(
    `/productos/ObtenerProductosActivosYDisponiblesParaVender/${CookieConToken}`
  );
