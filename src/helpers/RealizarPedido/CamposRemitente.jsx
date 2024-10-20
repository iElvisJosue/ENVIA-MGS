import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../helpers/Regexs";

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
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
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
      pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
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
      pattern: REGEX_SOLO_NUMEROS,
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
      pattern: REGEX_SOLO_NUMEROS,
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
      pattern: REGEX_CORREO,
      maxLength: {
        value: 100,
        message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
      },
    },
  },
];
