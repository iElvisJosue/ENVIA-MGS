/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatarioPedidoOrden from "./RegistrarNuevoDestinatarioPedidoOrden";
import SeleccionarDestinatarioPedidoOrden from "./SeleccionarDestinatarioPedidoOrden";

export default function InformacionDelDestinatarioPedidoOrden({
  establecerVistaOrden,
  paso,
  establecerPaso,
  destinatario,
  establecerDestinatario,
  agencia,
  remitente,
}) {
  const [vistaDestinatario, establecerVistaDestinatario] = useState(0);

  const PropsParaRegistrarNuevoDestinatario = {
    establecerVistaOrden,
    paso,
    establecerPaso,
    destinatario,
    establecerVistaDestinatario,
    establecerDestinatario,
    agencia,
    remitente,
  };

  return vistaDestinatario === 0 ? (
    <RegistrarNuevoDestinatarioPedidoOrden
      {...PropsParaRegistrarNuevoDestinatario}
    />
  ) : (
    <SeleccionarDestinatarioPedidoOrden
      {...PropsParaRegistrarNuevoDestinatario}
    />
  );
}
