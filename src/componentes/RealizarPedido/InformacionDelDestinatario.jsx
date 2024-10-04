/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoDestinatario from "./RegistrarNuevoDestinatario";
import SeleccionarDestinatario from "./SeleccionarDestinatario";

export default function InformacionDelDestinatario({
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
    <RegistrarNuevoDestinatario
      PropsParaRegistrarNuevoDestinatario={PropsParaRegistrarNuevoDestinatario}
    />
  ) : (
    <SeleccionarDestinatario
      PropsParaRegistrarNuevoDestinatario={PropsParaRegistrarNuevoDestinatario}
    />
  );
}
