export const CamposDestinatario = [
  {
    idCampo: "NombreDestinatario",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "NombreDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "ApellidoPaternoDestinatario",
    iconoCampo: "man",
    tituloCampo: "Apellido paterno",
    nombreCampo: "ApellidoPaternoDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "ApellidoMaternoDestinatario",
    iconoCampo: "woman",
    tituloCampo: "Apellido materno",
    nombreCampo: "ApellidoMaternoDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "TelefonoCasaDestinatario",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "TelefonoCasaDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "CelularDestinatario",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "CelularDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "CorreoDestinatario",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "CorreoDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "ColoniaDestinatario",
    iconoCampo: "golf",
    tituloCampo: "Colonia",
    nombreCampo: "ColoniaDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "MunicipioDelegacionDestinatario",
    iconoCampo: "navigate",
    tituloCampo: "Municipio o delegación",
    nombreCampo: "MunicipioDelegacionDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CodigoPostalDestinatario",
    iconoCampo: "pin",
    tituloCampo: "Código Postal",
    nombreCampo: "CodigoPostalDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
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
    idCampo: "CiudadDestinatario",
    iconoCampo: "locate",
    tituloCampo: "Ciudad",
    nombreCampo: "CiudadDestinatario",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    tipoCampo: "text",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "EstadoDestinatario",
    iconoCampo: "location",
    tituloCampo: "Estado",
    nombreCampo: "EstadoDestinatario",
    placeholderCampo: "Escriba aquí...",
    // tipoCampo: "select",
    tipoCampo: "text",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "DireccionDestinatario",
    iconoCampo: "trail-sign",
    tituloCampo: "Dirección",
    nombreCampo: "DireccionDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ReferenciaDestinatario",
    iconoCampo: "document-text",
    tituloCampo: "Referencia",
    nombreCampo: "ReferenciaDestinatario",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
];
