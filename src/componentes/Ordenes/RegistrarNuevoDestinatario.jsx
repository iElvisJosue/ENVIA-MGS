/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalInformacionDeLaAgencia from "./ModalInformacionDeLaAgencia";
import ModalInformacionDelRemitente from "./ModalInformacionDelRemitente";

// IMPORTAMOS LAS AYUDAS
import { CamposDestinatario } from "../../helpers/RealizarPedido/CamposDestinatario";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/RegistrarNuevoDestinatarioPedidoOrden.css";

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
    toast.success("Destinatario completado con éxito ✨");
  });

  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RealizarOrden__MensajeDeError">
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
        <ModalInformacionDeLaAgencia
          informacionDeLaAgencia={agencia}
          establecerMostrarModalAgencia={establecerMostrarModalAgencia}
        />
      )}
      {mostrarModalRemitente && (
        <ModalInformacionDelRemitente
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
      {CamposDestinatario.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            placeholderCampo,
            claseCampo,
            validadorCampo,
          },
          index
        ) => (
          <span className={claseCampo} key={index}>
            <p>
              <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
            </p>
            <input
              id={idCampo}
              type="text"
              name={nombreCampo}
              placeholder={placeholderCampo}
              {...register(nombreCampo, validadorCampo)}
            />
            {MensajeError(nombreCampo)}
          </span>
        )
      )}
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo Dos">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo">
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
      <span className="RegistrarNuevoDestinatarioPedidoOrden__Campo Dos">
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
