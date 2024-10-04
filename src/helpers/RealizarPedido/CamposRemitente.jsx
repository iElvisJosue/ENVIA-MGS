export const CamposRemitente = [
  {
    idCampo: "NombreRemitente",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "NombreRemitente",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
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
    idCampo: "ApellidosRemitente",
    iconoCampo: "person",
    tituloCampo: "Apellidos",
    nombreCampo: "ApellidosRemitente",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
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
    idCampo: "TelefonoCasaRemitente",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "TelefonoCasaRemitente",
    tipoCampo: "text",
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
    idCampo: "CelularRemitente",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "CelularRemitente",
    tipoCampo: "text",
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
    tipoCampo: "text",
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
  {
    idCampo: "CodigoPostalRemitente",
    iconoCampo: "pin",
    tituloCampo: "Código Postal",
    nombreCampo: "CodigoPostalRemitente",
    tipoCampo: "text",
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
    },
  },
  {
    idCampo: "CiudadRemitente",
    iconoCampo: "locate",
    tituloCampo: "Ciudad",
    nombreCampo: "CiudadRemitente",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select
    tipoCampo: "text",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "EstadoRemitente",
    iconoCampo: "location",
    tituloCampo: "Estado",
    nombreCampo: "EstadoRemitente",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "DireccionRemitente",
    iconoCampo: "trail-sign",
    tituloCampo: "Dirección",
    nombreCampo: "DireccionRemitente",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ReferenciaRemitente",
    iconoCampo: "document-text",
    tituloCampo: "Referencia",
    nombreCampo: "ReferenciaRemitente",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoRemitente__Campo",
    validadorCampo: {
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
];
