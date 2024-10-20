export const CamposAgencia = [
  {
    idCampo: "NombreAgencia",
    iconoCampo: "business",
    tituloCampo: "Nombre de la agencia",
    nombreCampo: "Agencia",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Dos",
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
    idCampo: "NombreContacto",
    iconoCampo: "person",
    tituloCampo: "Nombre del contacto",
    nombreCampo: "Contacto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Dos",
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
    idCampo: "TelefonoContacto",
    iconoCampo: "call",
    tituloCampo: "Teléfono del contacto",
    nombreCampo: "Telefono",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
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
    idCampo: "CorreoContacto",
    iconoCampo: "mail",
    tituloCampo: "Correo del contacto",
    nombreCampo: "Correo",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
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
    idCampo: "EstadoAgencia",
    iconoCampo: "location",
    tituloCampo: "Estado",
    nombreCampo: "Estado",
    tipoCampo: "select",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "CiudadAgencia",
    iconoCampo: "locate",
    tituloCampo: "Ciudad",
    nombreCampo: "Ciudad",
    tipoCampo: "select",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "CPAgencia",
    iconoCampo: "pin",
    tituloCampo: "Código Postal",
    nombreCampo: "CP",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
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
    idCampo: "DireccionAgencia",
    iconoCampo: "trail-sign",
    tituloCampo: "Dirección",
    nombreCampo: "Direccion",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDeLaAgencia__Titulo__Campo Tres",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/,
        message: "¡Este campo solo acepta letras y números! 🔢🔠",
      },
      maxLength: {
        value: 1000,
        message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
      },
    },
  },
  // {
  //   idCampo: "PrecioPublicoAgencia",
  //   iconoCampo: "cash",
  //   tituloCampo: "Precio público",
  //   nombreCampo: "PrecioPublico",
  //   tipoCampo: "text",
  //   placeholderCampo: "Escriba aquí...",
  //   claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
  //   validadorCampo: {
  //     required: "¡Este campo es obligatorio! ⚠️",
  //     pattern: {
  //       value: /^\d+$/,
  //       message: "¡Este campo solo acepta números! 🔢",
  //     },
  //     maxLength: {
  //       value: 10,
  //       message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
  //     },
  //   },
  // },
  // {
  //   idCampo: "LibraExtraAgencia",
  //   iconoCampo: "scale",
  //   tituloCampo: "Libra extra",
  //   nombreCampo: "LibraExtra",
  //   tipoCampo: "text",
  //   placeholderCampo: "Escriba aquí...",
  //   claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
  //   validadorCampo: {
  //     required: "¡Este campo es obligatorio! ⚠️",
  //     pattern: {
  //       value: /^\d+$/,
  //       message: "¡Este campo solo acepta números! 🔢",
  //     },
  //     maxLength: {
  //       value: 10,
  //       message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
  //     },
  //   },
  // },
  // {
  //   idCampo: "PesoSinCobroAgencia",
  //   iconoCampo: "thumbs-up",
  //   tituloCampo: "Peso sin cobro",
  //   nombreCampo: "PesoSinCobro",
  //   tipoCampo: "text",
  //   placeholderCampo: "Escriba aquí...",
  //   claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
  //   validadorCampo: {
  //     required: "¡Este campo es obligatorio! ⚠️",
  //     pattern: {
  //       value: /^\d+$/,
  //       message: "¡Este campo solo acepta números! 🔢",
  //     },
  //     maxLength: {
  //       value: 10,
  //       message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
  //     },
  //   },
  // },
  // {
  //   idCampo: "PesoMaximoAgencia",
  //   iconoCampo: "warning",
  //   tituloCampo: "Peso máximo",
  //   nombreCampo: "PesoMaximo",
  //   tipoCampo: "text",
  //   placeholderCampo: "Escriba aquí...",
  //   claseCampo: "InformacionDeLaAgencia__Titulo__Campo",
  //   validadorCampo: {
  //     required: "¡Este campo es obligatorio! ⚠️",
  //     pattern: {
  //       value: /^\d+$/,
  //       message: "¡Este campo solo acepta números! 🔢",
  //     },
  //     maxLength: {
  //       value: 10,
  //       message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
  //     },
  //   },
  // },
];
