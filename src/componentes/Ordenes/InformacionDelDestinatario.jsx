/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatario from "./RegistrarNuevoDestinatario";
import SeleccionarDestinatario from "./SeleccionarDestinatario";

export default function InformacionDelDestinatario({
  establecerVista,
  paso,
  establecerPaso,
  destinatario,
  establecerDestinatario,
  agencia,
  remitente,
}) {
  const [vistaDestinatario, establecerVistaDestinatario] = useState(0);

  const PropsParaRegistrarNuevoDestinatario = {
    establecerVista,
    paso,
    establecerPaso,
    destinatario,
    establecerVistaDestinatario,
    establecerDestinatario,
    agencia,
    remitente,
  };

  return vistaDestinatario === 0 ? (
    <RegistrarNuevoDestinatario {...PropsParaRegistrarNuevoDestinatario} />
  ) : (
    <SeleccionarDestinatario {...PropsParaRegistrarNuevoDestinatario} />
  );
}
