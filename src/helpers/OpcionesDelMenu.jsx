// IMPORTAMOS LAS AYUDAS
import { HOST } from "./Urls";

export const OpcionesDelMenu = {
  Administrador: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: "#",
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "logo-dropbox",
          nombre: "Ordenes",
          url: `${HOST}Ordenes`,
        },
        {
          icono: "cube",
          nombre: "Envíos",
          url: `${HOST}Envios`,
        },
      ],
    },
    {
      icono: "business",
      nombre: "Agencias",
      url: `${HOST}Agencias`,
    },
    {
      icono: "basket",
      nombre: "Productos",
      url: `${HOST}Productos`,
    },
    {
      icono: "people-circle",
      nombre: "Usuarios",
      url: `${HOST}Usuarios`,
    },
    {
      icono: "settings",
      nombre: "Configuración",
      url: "#",
    },
  ],
  Usuario: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: "#",
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "logo-dropbox",
          nombre: "Ordenes",
          url: `${HOST}Ordenes`,
        },
        {
          icono: "cube",
          nombre: "Envíos",
          url: `${HOST}Envios`,
        },
      ],
    },
  ],
  Moderador: [
    {
      icono: "person-circle",
      nombre: "Perfil",
      url: "#",
    },
    {
      icono: "storefront",
      nombre: "Paquetería",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "logo-dropbox",
          nombre: "Ordenes",
          url: `${HOST}Ordenes`,
        },
        {
          icono: "cube",
          nombre: "Envíos",
          url: `${HOST}Envios`,
        },
      ],
    },
  ],
};
