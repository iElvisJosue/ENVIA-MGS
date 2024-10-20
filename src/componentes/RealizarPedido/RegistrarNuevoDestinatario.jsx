/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LAS AYUDAS
import { CamposDestinatario } from "../../helpers/RealizarPedido/CamposDestinatario";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/RegistrarNuevoDestinatario.css";

export default function RegistrarNuevoDestinatario({
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
            <small key={type} className="RealizarPedido__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="RegistrarNuevoDestinatario"
      onSubmit={GuardarInformacionDelDestinatario}
    >
      <span className="RegistrarNuevoDestinatario__Opciones">
        <button
          type="button"
          className="RegistrarNuevoDestinatario__Opciones--Boton"
          onClick={() => establecerVistaDestinatario(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>
      <h1 className="RegistrarNuevoDestinatario__Titulo">
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
      <span className="RegistrarNuevoDestinatario__Campo">
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
      <span className="RegistrarNuevoDestinatario__Campo">
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
      <span className="RegistrarNuevoDestinatario__Campo">
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
      <span className="RegistrarNuevoDestinatario__Campo">
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
      <span className="RegistrarNuevoDestinatario__Campo Dos">
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
      <span className="RegistrarNuevoDestinatario__Campo">
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
      <span className="RegistrarNuevoDestinatario__Campo Dos">
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
      <footer className="RegistrarNuevoDestinatario__Footer">
        <button
          className="RegistrarNuevoDestinatario__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoDestinatario__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionada NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
