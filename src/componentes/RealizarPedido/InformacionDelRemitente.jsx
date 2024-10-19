/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoRemitente from "./RegistrarNuevoRemitente";
import SeleccionarRemitente from "./SeleccionarRemitente";

export default function InformacionDelRemitente({
  paso,
  establecerPaso,
  remitente,
  establecerRemitente,
  agencia,
}) {
  const [vistaRemitente, establecerVistaRemitente] = useState(0);

  const PropsParaRegistrarNuevoRemitente = {
    establecerVistaRemitente,
    remitente,
    establecerRemitente,
    establecerPaso,
    agencia,
    paso,
  };

  return vistaRemitente === 0 ? (
    <RegistrarNuevoRemitente {...PropsParaRegistrarNuevoRemitente} />
  ) : (
    <SeleccionarRemitente {...PropsParaRegistrarNuevoRemitente} />
  );
}
