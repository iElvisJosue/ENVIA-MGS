import axios from "./axios";

// SOLICITUD PARA REGISTRAR GUARDAR LA INFORMACIÓN DEL REMITENTE, DESTINATARIO Y PEDIDO
export const SolicitudGuardarTodaLaInformacion = (data) =>
  axios.post("/pedidos/GuardarTodaLaInformacion", data);
// SOLICITUD PARA BUSCAR LOS PEDIDOS POR FILTRO
export const SolicitudBuscarPedidosPorFiltro = (data) =>
  axios.post("/pedidos/BuscarPedidosPorFiltro", data);
// SOLICITUD PARA BUSCAR PEDIDOS POR PAQUETE
export const SolicitudBuscarPedidosPorPaquete = (data) =>
  axios.post("/pedidos/BuscarPedidosPorPaquete", data);
// SOLICITUD PARA BUSCAR LOS REMITENTES POR AGENCIA
export const SolicitudBuscarRemitentesPorAgencia = (data) =>
  axios.post("/pedidos/BuscarRemitentesPorAgencia", data);
// SOLICITUD PARA BUSCAR LOS DESTINATARIOS POR AGENCIA
export const SolicitudBuscarDestinatariosPorAgencia = (data) =>
  axios.post("/pedidos/BuscarDestinatariosPorAgencia", data);
// SOLICITUD PARA BUSCAR LOS ÚLTIMOS 10 PEDIDOS REALIZADO
export const SolicitudBuscarUltimosDiezPedidos = () =>
  axios.get("/pedidos/BuscarUltimosDiezPedidos");
// SOLICITUD PARA BUSCAR LOS MOVIMIENTOS DE UN PEDIDO
export const SolicitudBuscarMovimientosDeUnPedido = (data) =>
  axios.post("/pedidos/BuscarMovimientosDeUnPedido", data);
// SOLICITUD PARA BUSCAR PEDIDOS POR NUMERO DE GUIA
export const SolicitudBuscarPedidoPorNumeroDeGuia = (GuiaPedido) =>
  axios.get(`/pedidos/BuscarPedidoPorNumeroDeGuia/${GuiaPedido}`);
// SOLICITUD PARA BUSCAR PEDIDOS POR  FECHA
export const SolicitudBuscarPedidosPorFecha = (data) =>
  axios.post("/pedidos/BuscarPedidosPorFecha", data);
// SOLICITUD PARA GUARDAR LA INFORMACIÓN DE LA ORDEN
export const SolicitudGuardarInformacionDeLaOrden = (data) =>
  axios.post("/pedidos/GuardarInformacionDeLaOrden", data);
// SOLICITUD PARA BUSCAR LAS ORDENES POR FILTRO
export const SolicitudBuscarOrdenesPorFiltro = (data) =>
  axios.post("/pedidos/BuscarOrdenesPorFiltro", data);
// SOLICITUD PARA BUSCAR ORDENES POR  FECHA
export const SolicitudBuscarOrdenesPorFecha = (data) =>
  axios.post("/pedidos/BuscarOrdenesPorFecha", data);
// SOLICITUD PARA BUSCAR LOS MOVIMIENTOS DE UNA ORDEN
export const SolicitudBuscarMovimientosDeUnaOrden = (data) =>
  axios.post("/pedidos/BuscarMovimientosDeUnaOrden", data);
// SOLICITUD PARA BUSCAR PEDIDOS POR PAQUETE
export const SolicitudBuscarOrdenesPorPaquete = (data) =>
  axios.post("/pedidos/BuscarOrdenesPorPaquete", data);
