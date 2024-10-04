import axios from "./axios";

// PETICIÓN PARA REGISTRAR GUARDAR LA INFORMACIÓN DEL REMITENTE, DESTINATARIO Y PEDIDO
export const SolicitudGuardarTodaLaInformacion = (data) =>
  axios.post("/pedidos/GuardarTodaLaInformacion", data);
// PETICIÓN PARA BUSCAR LOS PEDIDOS POR FILTRO
export const SolicitudBuscarPedidosPorFiltro = (data) =>
  axios.post("/pedidos/BuscarPedidosPorFiltro", data);
// PETICIÓN PARA BUSCAR PEDIDOS POR PAQUETE
export const SolicitudBuscarPedidosPorPaquete = (data) =>
  axios.post("/pedidos/BuscarPedidosPorPaquete", data);
// PETICIÓN PARA BUSCAR LOS REMITENTES POR AGENCIA
export const SolicitudBuscarRemitentesPorAgencia = (data) =>
  axios.post("/pedidos/BuscarRemitentesPorAgencia", data);
// PETICIÓN PARA BUSCAR LOS DESTINATARIOS POR AGENCIA
export const SolicitudBuscarDestinatariosPorAgencia = (data) =>
  axios.post("/pedidos/BuscarDestinatariosPorAgencia", data);
// PETICIÓN PARA BUSCAR LOS ÚLTIMOS 10 PEDIDOS REALIZADO
export const SolicitudBuscarUltimosDiezPedidos = () =>
  axios.get("/pedidos/BuscarUltimosDiezPedidos");
// PETICIÓN PARA BUSCAR LOS MOVIMIENTOS DE UN PEDIDO
export const SolicitudBuscarMovimientosDeUnPedido = (data) =>
  axios.post("/pedidos/BuscarMovimientosDeUnPedido", data);
// PETICIÓN PARA BUSCAR PEDIDOS POR NUMERO DE GUIA
export const SolicitudBuscarPedidoPorNumeroDeGuia = (GuiaPedido) =>
  axios.get(`/pedidos/BuscarPedidoPorNumeroDeGuia/${GuiaPedido}`);
// PETICIÓN PARA BUSCAR PEDIDOS POR  FECHA
export const SolicitudBuscarPedidosPorFecha = (data) =>
  axios.post("/pedidos/BuscarPedidosPorFecha", data);
