import { useState } from "react";

export default function useContraseña() {
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);

  const iconInputPassword = mostrarContraseña ? "eye-off" : "eye";

  const cambiarCampoDeContraseña = () => {
    establecerMostrarContraseña(!mostrarContraseña);
    const inputPassword = document.querySelector("#password");
    inputPassword.type = mostrarContraseña ? "password" : "text";
  };

  const iconoDeContraseña = (
    <span
      className="IniciarSesion__Form--ContenedorCampos--Icono Ojo"
      onClick={cambiarCampoDeContraseña}
    >
      <ion-icon name={iconInputPassword}></ion-icon>
    </span>
  );

  return {
    iconoDeContraseña,
  };
}
