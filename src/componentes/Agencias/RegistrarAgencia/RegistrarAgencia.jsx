// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

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
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        reset();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const ReiniciarFormulario = () => {
    reset();
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
            name="Agencia"
            placeholder="Escriba aquí..."
            {...register("Agencia", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Agencia")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del contacto
          </p>
          <input
            id="NombreContacto"
            type="text"
            name="Contacto"
            placeholder="Escriba aquí..."
            {...register("Contacto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Contacto")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="call"></ion-icon> Teléfono del contacto
          </p>
          <input
            id="TelefonoContacto"
            type="text"
            name="Telefono"
            placeholder="Escriba aquí..."
            {...register("Telefono", {
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
          {MensajeError("Telefono")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="mail"></ion-icon> Correo del contacto
          </p>
          <input
            id="CorreoContacto"
            type="text"
            name="Correo"
            placeholder="Escriba aquí..."
            {...register("Correo", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_CORREO,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Correo")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="location"></ion-icon> Estado
          </p>
          <select
            id="EstadoAgencia"
            name="Estado"
            {...register("Estado", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
          >
            <option value="">Elige una opción</option>
            <option value="Prueba">Opción de prueba</option>
          </select>
          {MensajeError("Estado")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="locate"></ion-icon> Ciudad
          </p>
          <select
            id="CiudadAgencia"
            name="Ciudad"
            {...register("Ciudad", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
          >
            <option value="">Elige una opción</option>
            <option value="Prueba">Opción de prueba</option>
          </select>
          {MensajeError("Ciudad")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo">
          <p>
            <ion-icon name="pin"></ion-icon> Código Postal
          </p>
          <input
            id="CPAgencia"
            type="text"
            name="CP"
            placeholder="Escriba aquí..."
            {...register("CP", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("CP")}
        </span>
        <span className="RegistrarAgencia__InformacionDeLaAgencia__Titulo__Campo Tres">
          <p>
            <ion-icon name="trail-sign"></ion-icon> Dirección
          </p>
          <input
            id="DireccionAgencia"
            type="text"
            name="Direccion"
            placeholder="Escriba aquí..."
            {...register("Direccion", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 1000,
                message:
                  "¡Este campo no puede tener más de 1000 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Direccion")}
        </span>
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
