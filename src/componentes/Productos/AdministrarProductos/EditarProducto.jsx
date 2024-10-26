/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Productos/AdministrarProductos/EditarProducto.css";

export default function EditarProducto({
  informacionDelProducto,
  establecerVista,
}) {
  const { ActualizarInformacionDeUnProducto } = useProductos();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreProducto", informacionDelProducto?.NombreProducto);
    setValue("AnchoProducto", informacionDelProducto?.AnchoProducto);
    setValue("LargoProducto", informacionDelProducto?.LargoProducto);
    setValue("AltoProducto", informacionDelProducto?.AltoProducto);
    setValue(
      "CostoCajaVaciaProducto",
      informacionDelProducto?.CostoCajaVaciaProducto
    );
    setValue("PrecioProducto", informacionDelProducto?.PrecioProducto);
    setValue(
      "CostoLibraExtraProducto",
      informacionDelProducto?.LibraExtraProducto
    );
    setValue(
      "PesoSinCobroProducto",
      informacionDelProducto?.PesoSinCobroProducto
    );
    setValue("PesoMaximoProducto", informacionDelProducto?.PesoMaximoProducto);
    setValue("ComisionProducto", informacionDelProducto?.ComisionProducto);
  }, []);

  const ActualizarInformacionDelProducto = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      info.idProducto = informacionDelProducto?.idProducto;
      const res = await ActualizarInformacionDeUnProducto(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarProducto__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="EditarProducto"
      onSubmit={ActualizarInformacionDelProducto}
    >
      <div className="EditarProducto__Opciones">
        <button
          className="EditarProducto__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarProducto__Titulo">Editar Producto</h1>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="basket"></ion-icon> Nombre del producto
        </p>
        <input
          id="NombreProducto"
          type="text"
          name="NombreProducto"
          placeholder="Escriba aquí..."
          {...register("NombreProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="swap-horizontal"></ion-icon> Ancho
        </p>
        <input
          id="AnchoProducto"
          type="text"
          name="AnchoProducto"
          placeholder="Escriba aquí..."
          {...register("AnchoProducto", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("AnchoProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="swap-vertical"></ion-icon> Largo
        </p>
        <input
          id="LargoProducto"
          type="text"
          name="LargoProducto"
          placeholder="Escriba aquí..."
          {...register("LargoProducto", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("LargoProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="arrow-up"></ion-icon> Alto
        </p>
        <input
          id="AltoProducto"
          type="text"
          name="AltoProducto"
          placeholder="Escriba aquí..."
          {...register("AltoProducto", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("AltoProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="logo-dropbox"></ion-icon> Costo caja vacía
        </p>
        <input
          id="CostoCajaVaciaProducto"
          type="text"
          name="CostoCajaVaciaProducto"
          placeholder="Escriba aquí..."
          {...register("CostoCajaVaciaProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CostoCajaVaciaProducto")}
      </span>

      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="cash"></ion-icon> Precio
        </p>
        <input
          id="PrecioProducto"
          type="text"
          name="PrecioProducto"
          placeholder="Escriba aquí..."
          {...register("PrecioProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("PrecioProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="scale"></ion-icon> Costo libra extra
        </p>
        <input
          id="CostoLibraExtraProducto"
          type="text"
          name="CostoLibraExtraProducto"
          placeholder="Escriba aquí..."
          {...register("CostoLibraExtraProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CostoLibraExtraProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="thumbs-up"></ion-icon> Peso sin cobro
        </p>
        <input
          id="PesoSinCobroProducto"
          type="text"
          name="PesoSinCobroProducto"
          placeholder="Escriba aquí..."
          {...register("PesoSinCobroProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("PesoSinCobroProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo">
        <p>
          <ion-icon name="warning"></ion-icon> Peso máximo
        </p>
        <input
          id="PesoMaximoProducto"
          type="text"
          name="PesoMaximoProducto"
          placeholder="Escriba aquí..."
          {...register("PesoMaximoProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("PesoMaximoProducto")}
      </span>
      <span className="RegistrarProducto__InformacionDelProducto__Titulo__Campo Tres">
        <p>
          <ion-icon name="receipt"></ion-icon> Comisión
        </p>
        <input
          id="ComisionProducto"
          type="text"
          name="ComisionProducto"
          placeholder="Escriba aquí..."
          {...register("ComisionProducto", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ComisionProducto")}
      </span>
      <footer className="EditarProducto__Footer">
        <button type="submit" className="EditarProducto__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
