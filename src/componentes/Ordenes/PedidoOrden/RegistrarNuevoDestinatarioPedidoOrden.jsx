/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalInformacionDeLaAgenciaPedidoOrden from "./ModalInformacionDeLaAgenciaPedidoOrden";
import ModalInformacionDelRemitentePedidoOrden from "./ModalInformacionDelRemitentePedidoOrden";
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LAS AYUDAS
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
  REGEX_CORREO,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/PedidoOrden/RegistrarNuevoDestinatarioPedidoOrden.css";

export default function RegistrarNuevoDestinatario({
  paso,
  establecerPaso,
  establecerVista,
  destinatario,
  establecerVistaDestinatario,
  establecerDestinatario,
  agencia,
  remitente,
}) {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const [mostrarModalAgencia, establecerMostrarModalAgencia] = useState(false);
  const [mostrarModalRemitente, establecerMostrarModalRemitente] =
    useState(false);

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
      establecerDetallesDeLaDireccion({
        PAIS: destinatario?.PaisDestinatario,
        CODIGO_PAIS: destinatario?.CodigoPaisDestinatario,
        ESTADO: destinatario?.EstadoDestinatario,
        CODIGO_ESTADO: destinatario?.CodigoEstadoDestinatario,
        CIUDAD: destinatario?.CiudadDestinatario,
        CODIGO_POSTAL: destinatario?.CodigoPostalDestinatario,
        DIRECCION: destinatario?.DireccionDestinatario,
      });
    }
  }, []);

  const GuardarInformacionDelDestinatario = handleSubmit(async (data) => {
    if (!detallesDeLaDireccion) {
      return toast.warning(
        "¡Para registrar el destinatario, debe seleccionar una dirección!",
        {
          theme: "colored",
        }
      );
    }
    // SON TEMPORALES
    data.idDestinatario = false;
    data.PaisDestinatario = detallesDeLaDireccion.PAIS;
    data.CodigoPaisDestinatario = detallesDeLaDireccion.CODIGO_PAIS;
    data.EstadoDestinatario = detallesDeLaDireccion.ESTADO;
    data.CodigoEstadoDestinatario = detallesDeLaDireccion.CODIGO_ESTADO;
    data.CiudadDestinatario = detallesDeLaDireccion.CIUDAD;
    data.CodigoPostalDestinatario = detallesDeLaDireccion.CODIGO_POSTAL;
    data.DireccionDestinatario = detallesDeLaDireccion.DIRECCION;
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("¡Paso 2 (Destinatario) completado con éxito!", {
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
      className="RegistrarNuevoDestinatarioPedidoOrden"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      {mostrarModalAgencia && (
        <ModalInformacionDeLaAgenciaPedidoOrden
          informacionDeLaAgencia={agencia}
          establecerMostrarModalAgencia={establecerMostrarModalAgencia}
        />
      )}
      {mostrarModalRemitente && (
        <ModalInformacionDelRemitentePedidoOrden
          informacionDelRemitente={remitente}
          establecerMostrarModalRemitente={establecerMostrarModalRemitente}
        />
      )}
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedidoOrden__Opciones--Boton Remitente"
          onClick={() => establecerMostrarModalRemitente(true)}
        >
          <ion-icon name="person-circle"></ion-icon>
        </button>
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedidoOrden__Opciones--Boton Agencia"
          onClick={() => establecerMostrarModalAgencia(true)}
        >
          <ion-icon name="business"></ion-icon>
        </button>
        <button
          type="button"
          className="RegistrarNuevoDestinatarioPedidoOrden__Opciones--Boton Lista"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatarioPedidoOrden__Titulo">
        Registrar nuevo destinatario
      </h1>
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="RegistrarNuevoDestinatarioPedidoOrden__Footer">
        <button
          className="RegistrarNuevoDestinatarioPedidoOrden__Footer__Boton Regresar"
          onClick={() => establecerVista(0)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatarioPedidoOrden__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
    </form>
  );
}
