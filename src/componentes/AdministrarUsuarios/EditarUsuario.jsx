/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";

// IMPORTAMOS LAS AYUDAS
import { CamposUsuario } from "../../helpers/RegistrarUsuario/CamposUsuario";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/AdministrarUsuarios/EditarUsuario.css";

export default function EditarUsuario({
  informacionDelUsuario,
  establecerVista,
}) {
  const { ActualizarInformacionDeUnUsuario } = useUsuarios();
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("Usuario", informacionDelUsuario?.Usuario);
    setValue("Permisos", informacionDelUsuario?.Permisos);
    setValue("Contraseña", informacionDelUsuario?.Contraseña);
    setValue("ContraseñaConfirmar", informacionDelUsuario?.Contraseña);
  }, []);

  const ActualizarInformacionDelUsuario = handleSubmit(async (info) => {
    if (info.Contraseña !== info.ContraseñaConfirmar) {
      return toast.error(
        "Las contraseñas no coinciden, por favor intente nuevamente.",
        {
          theme: "colored",
        }
      );
    }
    try {
      info.idUsuario = informacionDelUsuario?.idUsuario;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionDeUnUsuario(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        reset();
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

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

  const MensajeDeError = (NombreCampo) => {
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
    <form className="EditarUsuario" onSubmit={ActualizarInformacionDelUsuario}>
      <div className="EditarUsuario__Opciones">
        <button
          className="EditarUsuario__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
        <button
          className="EditarUsuario__Opciones--Boton Contraseña"
          type="button"
          onClick={() => MostrarOcultarContraseña()}
        >
          <ion-icon name={mostrarContraseña ? "eye-off" : "eye"}></ion-icon>
        </button>
      </div>
      <h1 className="EditarUsuario__Titulo">Editar Usuario</h1>
      {CamposUsuario.map(
        (
          {
            idCampo,
            iconoCampo,
            tituloCampo,
            nombreCampo,
            tipoCampo,
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
            {tipoCampo !== "select" ? (
              <>
                <input
                  id={idCampo}
                  type={tipoCampo}
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                {MensajeDeError(nombreCampo)}
              </>
            ) : (
              <>
                <select
                  name={nombreCampo}
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Moderador">Moderador</option>
                </select>
                {MensajeDeError(nombreCampo)}
              </>
            )}
          </span>
        )
      )}
      <footer className="EditarUsuario__Footer">
        <button type="submit" className="EditarUsuario__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
