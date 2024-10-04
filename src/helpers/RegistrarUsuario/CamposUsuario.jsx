export const CamposUsuario = [
  {
    idCampo: "Usuario",
    iconoCampo: "person",
    tituloCampo: "Nombre del usuario",
    nombreCampo: "Usuario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelUsuario__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 4,
        message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "Permisos",
    iconoCampo: "hand-left",
    tituloCampo: "Permisos",
    nombreCampo: "Permisos",
    tipoCampo: "select",
    claseCampo: "InformacionDelUsuario__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "Contraseña",
    iconoCampo: "lock-closed",
    tituloCampo: "Contraseña",
    nombreCampo: "Contraseña",
    tipoCampo: "password",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelUsuario__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 4,
        message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ContraseñaConfirmar",
    iconoCampo: "checkmark-done-circle",
    tituloCampo: "Confirmar contraseña",
    nombreCampo: "ContraseñaConfirmar",
    tipoCampo: "password",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelUsuario__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
      minLength: {
        value: 4,
        message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
      },
    },
  },
];
