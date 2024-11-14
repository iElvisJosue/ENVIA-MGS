// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Agencias/RegistrarAgencia/RegistrarAgencia.css";

export default function RegistrarAgencia() {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const { RegistrarAgencia } = useAgencias();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDeLaAgencia = handleSubmit(async (info) => {
    if (!detallesDeLaDireccion) {
      return toast.warning(
        "¡Para registrar la agencia, debe seleccionar una dirección!",
        {
          theme: "colored",
        }
      );
    }
    try {
      info.PaisAgencia = detallesDeLaDireccion.PAIS;
      info.CodigoPaisAgencia = detallesDeLaDireccion.CODIGO_PAIS;
      info.EstadoAgencia = detallesDeLaDireccion.ESTADO;
      info.CodigoEstadoAgencia = detallesDeLaDireccion.CODIGO_ESTADO;
      info.CiudadAgencia = detallesDeLaDireccion.CIUDAD;
      info.CodigoPostalAgencia = detallesDeLaDireccion.CODIGO_POSTAL;
      info.DireccionAgencia = detallesDeLaDireccion.DIRECCION;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        ReiniciarFormulario();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us", "mx"],
  };

  const ReiniciarFormulario = () => {
    reset();
    establecerDireccion(null);
    establecerDetallesDeLaDireccion(null);
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarAgencia__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <div className="RegistrarAgencia">
      <form
        className="RegistrarAgencia__InformacionDeLaAgencia"
        onSubmit={GuardaInformacionDeLaAgencia}
      >
        <h1 className="RegistrarAgencia__InformacionDeLaAgencia__Titulo">
          Registrar Agencia
        </h1>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="business"></ion-icon> Nombre de la agencia
          </p>
          <input
            id="NombreAgencia"
            type="text"
            name="NombreAgencia"
            placeholder="Escriba aquí..."
            {...register("NombreAgencia", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("NombreAgencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del contacto
          </p>
          <input
            id="NombreContacto"
            type="text"
            name="NombreContacto"
            placeholder="Escriba aquí..."
            {...register("NombreContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("NombreContacto")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="call"></ion-icon> Teléfono del contacto
          </p>
          <input
            id="TelefonoContacto"
            type="text"
            name="TelefonoContacto"
            placeholder="Escriba aquí..."
            {...register("TelefonoContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
              },
              minLength: {
                value: 10,
                message:
                  "¡Este campo no puede tener menos de 10 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("TelefonoContacto")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Tres">
          <p>
            <ion-icon name="mail"></ion-icon> Correo del contacto
          </p>
          <input
            id="CorreoContacto"
            type="text"
            name="CorreoContacto"
            placeholder="Escriba aquí..."
            {...register("CorreoContacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("CorreoContacto")}
        </span>
        <GoogleAPI {...PropsGoogleAPI} />
        <footer className="RegistrarAgencia__InformacionDeLaAgencia__Footer">
          <button
            type="button"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="RegistrarAgencia__InformacionDeLaAgencia__Footer__Boton Guardar"
          >
            Guardar
          </button>
        </footer>
      </form>
    </div>
  );
}
