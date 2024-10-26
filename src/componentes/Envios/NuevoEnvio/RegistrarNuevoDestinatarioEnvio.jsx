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
import "../../../estilos/componentes/Envios/NuevoEnvio/RegistrarNuevoDestinatarioEnvio.css";

export default function RegistrarNuevoDestinatarioEnvio({
  establecerVistaDestinatario,
  destinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
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
    if (destinatario?.idDestinatario === false) {
      setValue("NombreDestinatario", destinatario?.NombreDestinatario);
      setValue(
        "ApellidoPaternoDestinatario",
        destinatario?.ApellidoPaternoDestinatario
      );
      setValue(
        "ApellidoMaternoDestinatario",
        destinatario?.ApellidoMaternoDestinatario
      );
      setValue(
        "TelefonoCasaDestinatario",
        destinatario?.TelefonoCasaDestinatario
      );
      setValue("CelularDestinatario", destinatario?.CelularDestinatario);
      setValue("CorreoDestinatario", destinatario?.CorreoDestinatario);
      setValue("ColoniaDestinatario", destinatario?.ColoniaDestinatario);
      setValue(
        "MunicipioDelegacionDestinatario",
        destinatario?.MunicipioDelegacionDestinatario
      );
      setValue(
        "CodigoPostalDestinatario",
        destinatario?.CodigoPostalDestinatario
      );
      setValue("CiudadDestinatario", destinatario?.CiudadDestinatario);
      setValue("EstadoDestinatario", destinatario?.EstadoDestinatario);
      setValue("DireccionDestinatario", destinatario?.DireccionDestinatario);
      setValue("ReferenciaDestinatario", destinatario?.ReferenciaDestinatario);
    }
  }, []);

  const GuardarInformacionDelDestinatario = handleSubmit(async (data) => {
    // SON TEMPORALES
    data.CodigoPaisDestinatario = data.PaisDestinatario.split(" | ")[0];
    data.idDestinatario = false;
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 2 (Destinatario) completado con éxito!", {
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
      className="RegistrarNuevoDestinatarioEnvio"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <span className="RegistrarNuevoDestinatarioEnvio__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatarioEnvio__Opciones--Boton"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatarioEnvio__Titulo">
        Registrar destinatario
      </h1>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="person"></ion-icon> Nombre
        </p>
        <input
          id="NombreDestinatario"
          type="text"
          name="NombreDestinatario"
          placeholder="Escriba aquí..."
          {...register("NombreDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("NombreDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="man"></ion-icon> Apellido paterno
        </p>
        <input
          id="ApellidoPaternoDestinatario"
          type="text"
          name="ApellidoPaternoDestinatario"
          placeholder="Escriba aquí..."
          {...register("ApellidoPaternoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ApellidoPaternoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="woman"></ion-icon> Apellido materno
        </p>
        <input
          id="ApellidoMaternoDestinatario"
          type="text"
          name="ApellidoMaternoDestinatario"
          placeholder="Escriba aquí..."
          {...register("ApellidoMaternoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ApellidoMaternoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono casa
        </p>
        <input
          id="TelefonoCasaDestinatario"
          type="text"
          name="TelefonoCasaDestinatario"
          placeholder="Escriba aquí..."
          {...register("TelefonoCasaDestinatario", {
            pattern: REGEX_SOLO_NUMEROS,
            maxLength: {
              value: 10,
              message: "¡Este campo no puede tener más de 10 caracteres! 🔢",
            },
            minLength: {
              value: 10,
              message: "¡Este campo no puede tener menos de 10 caracteres! 🔢",
            },
          })}
        />
        {MensajeError("TelefonoCasaDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="phone-portrait"></ion-icon> Celular
        </p>
        <input
          id="CelularDestinatario"
          type="text"
          name="CelularDestinatario"
          placeholder="Escriba aquí..."
          {...register("CelularDestinatario", {
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
          })}
        />
        {MensajeError("CelularDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="mail"></ion-icon> Correo electrónico
        </p>
        <input
          id="CorreoDestinatario"
          type="text"
          name="CorreoDestinatario"
          placeholder="Escriba aquí..."
          {...register("CorreoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_CORREO,
            maxLength: {
              value: 100,
              message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("CorreoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="earth"></ion-icon> País
        </p>
        <select
          name="PaisDestinatario"
          id="PaisDestinatario"
          defaultValue={""}
          {...register("PaisDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona un país</option>
          <option value="MEX | Mexico">MEX | Mexico</option>
          <option value="USA | United States">USA | United States</option>
        </select>
        {MensajeError("PaisDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="location"></ion-icon> Estado
        </p>
        <select
          name="EstadoDestinatario"
          id="EstadoDestinatario"
          defaultValue={""}
          {...register("EstadoDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona un estado</option>
          <option value="California">California</option>
        </select>
        {MensajeError("EstadoDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="locate"></ion-icon> Ciudad
        </p>
        <select
          name="CiudadDestinatario"
          id="CiudadDestinatario"
          defaultValue={""}
          {...register("CiudadDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        >
          <option value="">Selecciona una ciudad</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
        {MensajeError("CiudadDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="pin"></ion-icon> Código Postal
        </p>
        <input
          id="CodigoPostalDestinatario"
          type="text"
          name="CodigoPostalDestinatario"
          maxLength="5"
          placeholder="Escriba aquí..."
          {...register("CodigoPostalDestinatario", {
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
        {MensajeError("CodigoPostalDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo Dos">
        <p>
          <ion-icon name="trail-sign"></ion-icon> Dirección
        </p>
        <input
          id="DireccionDestinatario"
          type="text"
          name="DireccionDestinatario"
          placeholder="Escriba aquí..."
          {...register("DireccionDestinatario", {
            required: "¡Este campo es obligatorio! ⚠️",
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("DireccionDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo">
        <p>
          <ion-icon name="navigate"></ion-icon> Municipio o delegación
        </p>
        <input
          id="MunicipioDelegacionDestinatario"
          type="text"
          name="MunicipioDelegacionDestinatario"
          placeholder="Escriba aquí..."
          {...register("MunicipioDelegacionDestinatario", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("MunicipioDelegacionDestinatario")}
      </span>
      <span className="RegistrarNuevoDestinatarioEnvio__Campo Dos">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          id="ReferenciaDestinatario"
          type="text"
          name="ReferenciaDestinatario"
          placeholder="Escriba aquí..."
          {...register("ReferenciaDestinatario", {
            pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaDestinatario")}
      </span>
      <footer className="RegistrarNuevoDestinatarioEnvio__Footer">
        <button
          className="RegistrarNuevoDestinatarioEnvio__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatarioEnvio__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionadaEnvio NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}