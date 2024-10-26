// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS } from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Usuarios/RegistrarUsuario/RegistrarUsuario.css";

export default function RegistrarUsuario() {
  const { RegistrarUsuario } = useUsuarios();
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardaInformacionDelUsuario = handleSubmit(async (info) => {
    if (info.Contraseña !== info.ContraseñaConfirmar) {
      return toast.warning(
        "Las contraseñas no coinciden, por favor intente nuevamente.",
        {
          theme: "colored",
        }
      );
    }
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await RegistrarUsuario(info);
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

  const MostrarOcultarContraseña = () => {
    establecerMostrarContraseña(!mostrarContraseña);
    const CampoContraseña = document.querySelector("#Contraseña");
    const CampoContraseñaConfirmar = document.querySelector(
      "#ContraseñaConfirmar"
    );
    if (mostrarContraseña) {
      CampoContraseña.type = "password";
      CampoContraseñaConfirmar.type = "password";
    } else {
      CampoContraseña.type = "text";
      CampoContraseñaConfirmar.type = "text";
    }
  };

  const MensajeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarUsuario__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <div className="RegistrarUsuario">
      <form
        className="RegistrarUsuario__InformacionDelUsuario"
        onSubmit={GuardaInformacionDelUsuario}
      >
        <div className="RegistrarUsuario__InformacionDelUsuario__Opciones">
          <button
            className="RegistrarUsuario__InformacionDelUsuario__Opciones--Boton Contraseña"
            type="button"
            onClick={() => MostrarOcultarContraseña()}
          >
            <ion-icon name={mostrarContraseña ? "eye-off" : "eye"}></ion-icon>
          </button>
        </div>
        <h1 className="RegistrarUsuario__InformacionDelUsuario__Titulo">
          Registrar Usuario
        </h1>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="person"></ion-icon> Nombre del usuario
          </p>
          <input
            id="Usuario"
            type="text"
            name="Usuario"
            placeholder="Escriba aquí..."
            {...register("Usuario", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Usuario")}
        </span>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="hand-left"></ion-icon> Permisos
          </p>
          <select id="Permisos" name="Permisos" {...register("Permisos")}>
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
            <option value="Moderador">Moderador</option>
          </select>
          {MensajeError("Permisos")}
        </span>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="lock-closed"></ion-icon> Contraseña
          </p>
          <input
            id="Contraseña"
            type="password"
            name="Contraseña"
            placeholder="Escriba aquí..."
            {...register("Contraseña", {
              required: "¡Este campo es obligatorio! ⚠️",
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
              minLength: {
                value: 4,
                message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("Contraseña")}
        </span>
        <span className="RegistrarUsuario__InformacionDelUsuario__Titulo__Campo Dos">
          <p>
            <ion-icon name="checkmark-done-circle"></ion-icon> Confirmar
            contraseña
          </p>
          <input
            id="ContraseñaConfirmar"
            type="password"
            name="ContraseñaConfirmar"
            placeholder="Escriba aquí..."
            {...register("ContraseñaConfirmar", {
              required: "¡Este campo es obligatorio! ⚠️",
              maxLength: {
                value: 100,
                message: "¡Este campo no puede tener más de 100 caracteres! 🔠",
              },
              minLength: {
                value: 4,
                message: "¡Este campo no puede tener menos de 4 caracteres! 🔠",
              },
            })}
          />
          {MensajeError("ContraseñaConfirmar")}
        </span>
        <footer className="RegistrarUsuario__InformacionDelUsuario__Footer">
          <button
            type="button"
            className="RegistrarUsuario__InformacionDelUsuario__Footer__Boton Cancelar"
            onClick={ReiniciarFormulario}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="RegistrarUsuario__InformacionDelUsuario__Footer__Boton Guardar"
          >
            Guardar
          </button>
        </footer>
      </form>
    </div>
  );
}
