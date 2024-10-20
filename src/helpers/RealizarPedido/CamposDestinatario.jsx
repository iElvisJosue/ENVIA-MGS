import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../helpers/Regexs";

export const CamposDestinatario = [
  {
    idCampo: "NombreDestinatario",
    iconoCampo: "person",
    tituloCampo: "Nombre",
    nombreCampo: "NombreDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ApellidoPaternoDestinatario",
    iconoCampo: "man",
    tituloCampo: "Apellido paterno",
    nombreCampo: "ApellidoPaternoDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "ApellidoMaternoDestinatario",
    iconoCampo: "woman",
    tituloCampo: "Apellido materno",
    nombreCampo: "ApellidoMaternoDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
  {
    idCampo: "TelefonoCasaDestinatario",
    iconoCampo: "call",
    tituloCampo: "Teléfono casa",
    nombreCampo: "TelefonoCasaDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      pattern: REGEX_SOLO_NUMEROS,
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔢",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔢",
      },
    },
  },
  {
    idCampo: "CelularDestinatario",
    iconoCampo: "phone-portrait",
    tituloCampo: "Celular",
    nombreCampo: "CelularDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_SOLO_NUMEROS,
      maxLength: {
        value: 10,
        message: "¡Este campo no puede tener más de 10 caracteres! 🔢",
      },
      minLength: {
        value: 10,
        message: "¡Este campo no puede tener menos de 10 caracteres! 🔢",
      },
    },
  },
  {
    idCampo: "CorreoDestinatario",
    iconoCampo: "mail",
    tituloCampo: "Correo electrónico",
    nombreCampo: "CorreoDestinatario",
    placeholderCampo: "Escriba aquí...",
    claseCampo: "RegistrarNuevoDestinatario__Campo",
    validadorCampo: {
      required: "¡Este campo es obligatorio! ⚠️",
      pattern: REGEX_CORREO,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
