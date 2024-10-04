/* eslint-disable react/prop-types */
// LOS ESTILOS ESTÁN EN RealizarPedido.css
export default function AgenciaSeleccionada({ NombreAgencia }) {
  return (
    <small className="RealizarPedido__AgenciaSeleccionada">
      Pedido para la agencia: <b>{NombreAgencia}</b>
    </small>
  );
}
