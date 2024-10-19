/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LAS AYUDAS
import { CamposRemitente } from "../../helpers/RealizarOrden/CamposRemitente";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarOrden/RegistrarNuevoRemitenteOrden.css";

export default function RegistrarNuevoRemitente({
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
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
    if (remitente?.idRemitente === false) {
      setValue("NombreRemitente", remitente?.NombreRemitente);
      setValue("ApellidosRemitente", remitente?.ApellidosRemitente);
      setValue("TelefonoCasaRemitente", remitente?.TelefonoCasaRemitente);
      setValue("CelularRemitente", remitente?.CelularRemitente);
      setValue("CorreoRemitente", remitente?.CorreoRemitente);
      setValue("PaisRemitente", remitente?.PaisRemitente);
      setValue("EstadoRemitente", remitente?.EstadoRemitente);
      setValue("CiudadRemitente", remitente?.CiudadRemitente);
      setValue("CodigoPostalRemitente", remitente?.CodigoPostalRemitente);
      setValue("DireccionRemitente", remitente?.DireccionRemitente);
      setValue("ReferenciaRemitente", remitente?.ReferenciaRemitente);
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    data.idRemitente = false;
    data.CodigoPaisRemitente = data.PaisRemitente.split(" | ")[0];
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("Remitente completado con éxito ✨");
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
        Registrar Nuevo Remitente
      </h1>
      {CamposRemitente.map(
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
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
          <option value="USA | United States">USA | United Stateso</option>
        </select>
        {MensajeError("PaisRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
          <option value="Estado de prueba 1">Estado de prueba 1</option>
          <option value="Estado de prueba 2">Estado de prueba 2</option>
        </select>
        {MensajeError("EstadoRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
          <option value="Ciudad de prueba 1">Ciudad de prueba 1</option>
          <option value="Ciudad de prueba 2">Ciudad de prueba 2</option>
        </select>
        {MensajeError("CiudadRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo">
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
            pattern: {
              value: /^\d+$/,
              message: "¡Este campo solo acepta números! 🔢",
            },
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
      <span className="RegistrarNuevoRemitenteOrden__Campo Dos">
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
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("DireccionRemitente")}
      </span>
      <span className="RegistrarNuevoRemitenteOrden__Campo Tres">
        <p>
          <ion-icon name="document-text"></ion-icon> Referencia
        </p>
        <input
          id="ReferenciaRemitente"
          type="text"
          name="ReferenciaRemitente"
          placeholder="Escriba aquí..."
          {...register("ReferenciaRemitente", {
            maxLength: {
              value: 1000,
              message: "¡Este campo no puede tener más de 1000 caracteres! 🔠",
            },
          })}
        />
        {MensajeError("ReferenciaRemitente")}
      </span>
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
