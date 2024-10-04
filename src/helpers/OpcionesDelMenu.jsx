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
          icono: "cube",
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
    {
      icono: "business",
      nombre: "Agencias",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Agencia",
          url: `${HOST}Registrar-Agencia`,
        },
        {
          icono: "cog",
          nombre: "Administrar Agencias",
          url: `${HOST}Administrar-Agencias`,
        },
      ],
    },
    {
      icono: "basket",
      nombre: "Productos",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "add-circle",
          nombre: "Registrar Producto",
          url: `${HOST}Registrar-Producto`,
        },
        {
          icono: "cog",
          nombre: "Administrar Productos",
          url: `${HOST}Administrar-Productos`,
        },
      ],
    },
    {
      icono: "people-circle",
      nombre: "Usuarios",
      url: "#",
      opcionesSecundarias: [
        {
          icono: "person-add",
          nombre: "Registrar Usuario",
          url: `${HOST}Registrar-Usuario`,
        },
        {
          icono: "cog",
          nombre: "Administrar Usuarios",
          url: `${HOST}Administrar-Usuarios`,
        },
      ],
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
          icono: "cube",
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
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
          icono: "cube",
          nombre: "Realizar pedido",
          url: `${HOST}Realizar-Pedido`,
        },
        {
          icono: "bag-handle",
          nombre: "Pedidos",
          url: `${HOST}Pedidos`,
        },
      ],
    },
  ],
};
