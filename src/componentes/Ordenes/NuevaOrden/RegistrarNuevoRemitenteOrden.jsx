/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/NuevaOrden/RegistrarNuevoRemitenteOrden.css";

export default function RegistrarNuevoRemitenteOrden({
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
  paso,
}) {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
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
      // establecerDetallesDeLaDireccion({
      //   PAIS: remitente?.PaisRemitente,
      //   CODIGO_PAIS: remitente?.CodigoPaisRemitente,
      //   ESTADO: remitente?.EstadoRemitente,
      //   CODIGO_ESTADO: remitente?.CodigoEstadoRemitente,
      //   CIUDAD: remitente?.CiudadRemitente,
      //   CODIGO_POSTAL: remitente?.CodigoPostalRemitente,
      //   DIRECCION: remitente?.DireccionRemitente,
      // });
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    if (!detallesDeLaDireccion) {
      return toast.warning(
        "¡Para registrar el remitente, debe seleccionar una dirección!",
        {
          theme: "colored",
        }
      );
    }
    data.idRemitente = false;
    data.PaisRemitente = detallesDeLaDireccion.PAIS;
    data.CodigoPaisRemitente = detallesDeLaDireccion.CODIGO_PAIS;
    data.EstadoRemitente = detallesDeLaDireccion.ESTADO;
    data.CodigoEstadoRemitente = detallesDeLaDireccion.CODIGO_ESTADO;
    data.CiudadRemitente = detallesDeLaDireccion.CIUDAD;
    data.CodigoPostalRemitente = detallesDeLaDireccion.CODIGO_POSTAL;
    data.DireccionRemitente = detallesDeLaDireccion.DIRECCION;
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 1 (Remitente) completado con éxito!", {
      theme: "colored",
    });
  });

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us", "mx"],
  };

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="NuevaOrden__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarNuevoRemitenteOrden"
      onSubmit={GuardaInformacionDelRemitente}
    >
      <span className="RegistrarNuevoRemitenteOrden__Opciones">
        <button
          type="button"
          className="RegistrarNuevoRemitenteOrden__Opciones--Boton"
          onClick={() => establecerVistaRemitente(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>

      <h1 className="RegistrarNuevoRemitenteOrden__Titulo">
        Registrar Remitente
      </h1>
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
      <span className="RegistrarNuevoRemitenteOrden__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #1
        </p>
        <input
          id="TelefonoUnoRemitente"
          type="text"
          name="TelefonoUnoRemitente"
          placeholder="Escriba aquí..."
          {...register("TelefonoUnoRemitente", {
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
        {MensajeError("TelefonoUnoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo">
        <p>
          <ion-icon name="call"></ion-icon> Teléfono #2 (Opcional)
        </p>
        <input
          id="TelefonoDosRemitente"
          type="text"
          name="TelefonoDosRemitente"
          placeholder="Escriba aquí..."
          {...register("TelefonoDosRemitente", {
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
        {MensajeError("TelefonoDosRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo Dos">
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
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="RegistrarNuevoRemitenteOrden__Footer">
        <button
          type="submit"
          className="RegistrarNuevoRemitenteOrden__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
    </form>
  );
}
