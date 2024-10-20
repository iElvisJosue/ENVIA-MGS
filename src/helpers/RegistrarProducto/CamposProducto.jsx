export const CamposProducto = [
  {
    idCampo: "NombreProducto",
    iconoCampo: "basket",
    tituloCampo: "Nombre",
    nombreCampo: "NombreProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
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
    idCampo: "AnchoProducto",
    iconoCampo: "swap-horizontal",
    tituloCampo: "Ancho",
    nombreCampo: "AnchoProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      // required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "LargoProducto",
    iconoCampo: "swap-vertical",
    tituloCampo: "Largo",
    nombreCampo: "LargoProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      // required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "AltoProducto",
    iconoCampo: "arrow-up",
    tituloCampo: "Alto",
    nombreCampo: "AltoProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      // required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CostoCajaVaciaProducto",
    iconoCampo: "logo-dropbox",
    tituloCampo: "Costo caja vacía",
    nombreCampo: "CostoCajaVaciaProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "SeVendeProducto",
    iconoCampo: "storefront",
    tituloCampo: "Se vende",
    nombreCampo: "SeVendeProducto",
    tipoCampo: "select",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
    },
  },
  {
    idCampo: "PrecioProducto",
    iconoCampo: "cash",
    tituloCampo: "Precio",
    nombreCampo: "PrecioProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "CostoLibraExtraProducto",
    iconoCampo: "scale",
    tituloCampo: "Costo libra extra",
    nombreCampo: "CostoLibraExtraProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "PesoSinCobroProducto",
    iconoCampo: "thumbs-up",
    tituloCampo: "Peso sin cobro",
    nombreCampo: "PesoSinCobroProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "PesoMaximoProducto",
    iconoCampo: "warning",
    tituloCampo: "Peso máximo",
    nombreCampo: "PesoMaximoProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ComisionProducto",
    iconoCampo: "receipt",
    tituloCampo: "Comisión",
    nombreCampo: "ComisionProducto",
    tipoCampo: "text",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "InformacionDelProducto__Titulo__Campo Dos",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: {
        value: /^\d+$/,
        message: "¡Este campo solo acepta números! 🔢",
      },
      maxLength: {
        value: 5,
        message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
      },
    },
  },
];
