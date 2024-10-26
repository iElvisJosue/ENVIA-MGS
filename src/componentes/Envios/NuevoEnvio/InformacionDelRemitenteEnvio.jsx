/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoRemitenteEnvio from "./RegistrarNuevoRemitenteEnvio";
import SeleccionarRemitenteEnvio from "./SeleccionarRemitenteEnvio";

export default function InformacionDelRemitenteEnvio({
  paso,
  establecerPaso,
  remitente,
  establecerRemitente,
  agencia,
}) {
  const [vistaRemitente, establecerVistaRemitente] = useState(0);

  const PropsParaEnvio = {
    establecerVistaRemitente,
    remitente,
    establecerRemitente,
    establecerPaso,
    agencia,
    paso,
  };

  return vistaRemitente === 0 ? (
    <RegistrarNuevoRemitenteEnvio {...PropsParaEnvio} />
  ) : (
    <SeleccionarRemitenteEnvio {...PropsParaEnvio} />
  );
}
