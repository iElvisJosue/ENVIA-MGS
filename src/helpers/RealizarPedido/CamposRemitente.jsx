export const CamposRemitente = [
  {
    idCampo: "NombreRemitente",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "NombreRemitente",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/,
        message: "¡Este campo solo acepta letras! 🔠",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ApellidosRemitente",
    iconoCampo: "person",
    tituloCampo: "Apellidos",
    nombreCampo: "ApellidosRemitente",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/,
        message: "¡Este campo solo acepta letras! 🔠",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "TelefonoCasaRemitente",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "TelefonoCasaRemitente",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CelularRemitente",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "CelularRemitente",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CorreoRemitente",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "CorreoRemitente",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "¡Formato de correo no valido! ⚠️",
      },
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
