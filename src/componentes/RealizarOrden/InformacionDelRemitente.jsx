/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoRemitente from "./RegistrarNuevoRemitente";
import SeleccionarRemitente from "./SeleccionarRemitente";

export default function InformacionDelRemitente({
  idAgencia,
  paso,
  establecerPaso,
  remitente,
  establecerRemitente,
}) {
  const [vistaRemitente, establecerVistaRemitente] = useState(0);

  const PropsParaRegistrarNuevoRemitente = {
    idAgencia,
    establecerVistaRemitente,
    remitente,
    establecerRemitente,
    establecerPaso,
    paso,
  };

  return vistaRemitente === 0 ? (
    <RegistrarNuevoRemitente {...PropsParaRegistrarNuevoRemitente} />
  ) : (
    <SeleccionarRemitente {...PropsParaRegistrarNuevoRemitente} />
  );
}
