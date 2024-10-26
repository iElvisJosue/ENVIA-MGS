/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaEnvio from "./AgenciaSeleccionadaEnvio";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Envios/NuevoEnvio/RegistrarNuevoRemitenteEnvio.css";

export default function RegistrarNuevoRemitenteEnvio({
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
  paso,
  agencia,
}) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    if (remitente?.idRemitente === false) {
      setValue("NombreRemitente", remitente?.NombreRemitente);
      setValue("ApellidosRemitente", remitente?.ApellidosRemitente);
      setValue("TelefonoCasaRemitente", remitente?.TelefonoCasaRemitente);
      setValue("CelularRemitente", remitente?.CelularRemitente);
      setValue("CorreoRemitente", remitente?.CorreoRemitente);
      setValue("CodigoPostalRemitente", remitente?.CodigoPostalRemitente);
      setValue("CiudadRemitente", remitente?.CiudadRemitente);
      setValue("EstadoRemitente", remitente?.EstadoRemitente);
      setValue("DireccionRemitente", remitente?.DireccionRemitente);
      setValue("ReferenciaRemitente", remitente?.ReferenciaRemitente);
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    // SON TEMPORALES
    data.CodigoPaisRemitente = data.PaisRemitente.split(" | ")[0];
    data.idRemitente = false;
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 1 (Remitente) completado con éxito!", {
      theme: "colored",
    });
  });

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="NuevoEnvio__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarNuevoRemitenteEnvio"
      onSubmit={GuardaInformacionDelRemitente}
    >
      <span className="RegistrarNuevoRemitenteEnvio__Opciones">
        <button
          type="button"
          className="RegistrarNuevoRemitenteEnvio__Opciones--Boton"
          onClick={() => establecerVistaRemitente(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>

      <h1 className="RegistrarNuevoRemitenteEnvio__Titulo">
        Registrar Remitente
      </h1>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          id="NombreRemitente"
          type="text"
          name="NombreRemitente"
          placeholder="Escriba aquí..."
          {...register("NombreRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Apellidos
        </p>
        <input
          id="ApellidosRemitente"
          type="text"
          name="ApellidosRemitente"
          placeholder="Escriba aquí..."
          {...register("ApellidosRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ApellidosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono casa
        </p>
        <input
          id="TelefonoCasaRemitente"
          type="text"
          name="TelefonoCasaRemitente"
          placeholder="Escriba aquí..."
          {...register("TelefonoCasaRemitente", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("TelefonoCasaRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="phone-portrait"></ion-icon> Celular
        </p>
        <input
          id="CelularRemitente"
          type="text"
          name="CelularRemitente"
          placeholder="Escriba aquí..."
          {...register("CelularRemitente", {
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
          })}
        />
        {MensajeError("CelularRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo Dos">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          id="CorreoRemitente"
          type="text"
          name="CorreoRemitente"
          placeholder="Escriba aquí..."
          {...register("CorreoRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CorreoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="earth"></ion-icon> País
        </p>
        <select
          name="PaisRemitente"
          id="PaisRemitente"
          defaultValue={""}
          {...register("PaisRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona un país</option>
          <option value="MEX | Mexico">MEX | Mexico</option>
          <option value="USA | United States">USA | United States</option>
        </select>
        {MensajeError("PaisRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="location"></ion-icon> Estado
        </p>
        <select
          name="EstadoRemitente"
          id="EstadoRemitente"
          defaultValue={""}
          {...register("EstadoRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona un estado</option>
          <option value="California">California</option>
        </select>
        {MensajeError("EstadoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="locate"></ion-icon> Ciudad
        </p>
        <select
          name="CiudadRemitente"
          id="CiudadRemitente"
          defaultValue={""}
          {...register("CiudadRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona una ciudad</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        {MensajeError("CiudadRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo">
        <p>
          <ion-icon name="pin"></ion-icon> Código Postal
        </p>
        <input
          id="CodigoPostalRemitente"
          type="text"
          name="CodigoPostalRemitente"
          maxLength="5"
          placeholder="Escriba aquí..."
          {...register("CodigoPostalRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 5,
              message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
            },
            minLength: {
              value: 5,
              message: "¡Este campo no puede tener menos de 5 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CodigoPostalRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo Dos">
        <p>
          <ion-icon name="trail-sign"></ion-icon> Dirección
        </p>
        <input
          id="DireccionRemitente"
          type="text"
          name="DireccionRemitente"
          placeholder="Escriba aquí..."
          {...register("DireccionRemitente", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("DireccionRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteEnvio__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          id="ReferenciaRemitente"
          type="text"
          name="ReferenciaRemitente"
          placeholder="Escriba aquí..."
          {...register("ReferenciaRemitente", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaRemitente")}
      </span>
      <footer className="RegistrarNuevoRemitenteEnvio__Footer">
        <button
          type="button"
          className="RegistrarNuevoRemitenteEnvio__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoRemitenteEnvio__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionadaEnvio NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
