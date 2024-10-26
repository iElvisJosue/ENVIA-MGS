/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatarioEnvio from "./RegistrarNuevoDestinatarioEnvio";
import SeleccionarDestinatarioEnvio from "./SeleccionarDestinatarioEnvio";

export default function InformacionDelDestinatarioEnvio({
  paso,
  establecerPaso,
  destinatario,
  establecerDestinatario,
  agencia,
}) {
  const [vistaDestinatario, establecerVistaDestinatario] = useState(0);

  const PropsParaRegistrarNuevoDestinatario = {
    establecerVistaDestinatario,
    destinatario,
    establecerDestinatario,
    establecerPaso,
    agencia,
    paso,
  };

  return vistaDestinatario === 0 ? (
    <RegistrarNuevoDestinatarioEnvio {...PropsParaRegistrarNuevoDestinatario} />
  ) : (
    <SeleccionarDestinatarioEnvio {...PropsParaRegistrarNuevoDestinatario} />
  );
}
