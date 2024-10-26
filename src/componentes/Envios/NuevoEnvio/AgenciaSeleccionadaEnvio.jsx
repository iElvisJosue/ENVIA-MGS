/* eslint-disable react/prop-types */
// LOS ESTILOS ESTÁN EN NuevoEnvio.css
export default function AgenciaSeleccionada({ NombreAgencia }) {
  return (
    <small className="NuevoEnvio__AgenciaSeleccionada">
      Pedido para la agencia: <b>{NombreAgencia}</b>
    </small>
  );
}
