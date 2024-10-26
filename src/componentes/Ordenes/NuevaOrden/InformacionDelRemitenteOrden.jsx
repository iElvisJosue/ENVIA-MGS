/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import RegistrarNuevoRemitenteOrden from "./RegistrarNuevoRemitenteOrden";
import SeleccionarRemitenteOrden from "./SeleccionarRemitenteOrden";

export default function InformacionDelRemitenteOrden({
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
    <RegistrarNuevoRemitenteOrden {...PropsParaRegistrarNuevoRemitente} />
  ) : (
    <SeleccionarRemitenteOrden {...PropsParaRegistrarNuevoRemitente} />
  );
}
