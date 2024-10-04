// IMPORTAMOS LOS HOOKS A USAR

import useObtenerTiposDeCarga from "../../hooks/useObtenerTiposDeCarga";

export default function useCamposPedido() {
  const { cargas } = useObtenerTiposDeCarga();

  const CamposPedido = [
    {
      idCampo: "NombreProducto",
      iconoCampo: "basket",
      tituloCampo: "Producto",
      nombreCampo: "Producto",
      tipoCampo: "select",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo",
      validadorCampo: {
        required: "¡Este campo es obligatorio! ⚠️",
      },
    },
    {
      idCampo: "CantidadProducto",
      iconoCampo: "apps",
      tituloCampo: "Cantidad",
      nombreCampo: "Cantidad",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo",
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
      idCampo: "TipoCargaProducto",
      iconoCampo: "cube",
      tituloCampo: "Tipo de carga",
      nombreCampo: "TipoCarga",
      tipoCampo: "select",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo",
      validadorCampo: {
        required: "¡Este campo es obligatorio! ⚠️",
      },
    },
    {
      idCampo: "TipoEnvíoProducto",
      iconoCampo: "airplane",
      tituloCampo: "Tipo de envío",
      nombreCampo: "TipoEnvio",
      tipoCampo: "select",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo",
      validadorCampo: {
        required: "¡Este campo es obligatorio! ⚠️",
      },
    },
    {
      idCampo: "PesoProducto",
      iconoCampo: "scale",
      tituloCampo: "Peso",
      nombreCampo: "Peso",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
      idCampo: "AnchoProducto",
      iconoCampo: "swap-horizontal",
      tituloCampo: "Ancho",
      nombreCampo: "Ancho",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
      idCampo: "LargoProducto",
      iconoCampo: "swap-vertical",
      tituloCampo: "Largo",
      nombreCampo: "Largo",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
      idCampo: "AltoProducto",
      iconoCampo: "arrow-up",
      tituloCampo: "Alto",
      nombreCampo: "Alto",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
      idCampo: "ContenidoEnvíoProducto",
      iconoCampo: "document-text",
      tituloCampo: "Contenido del envío",
      nombreCampo: "ContenidoEnvio",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Completo",
      validadorCampo: {
        required: "¡Este campo es obligatorio! ⚠️",
        maxLength: {
          value: 1000,
          message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
        },
      },
    },
    {
      idCampo: "ValorDeclaradoProducto",
      iconoCampo: "cash",
      tituloCampo: "Valor declarado",
      nombreCampo: "ValorDeclarado",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
      idCampo: "ValorAseguradoProducto",
      iconoCampo: "shield-checkmark",
      tituloCampo: "Valor asegurado",
      nombreCampo: "ValorAsegurado",
      tipoCampo: "text",
      placeholderCampo: "Escriba aquí...",
      claseCampo: "RegistrarProductos__InformacionDelPedido__Campo Individual",
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
  ];

  return {
    cargas,
    CamposPedido,
  };
}
