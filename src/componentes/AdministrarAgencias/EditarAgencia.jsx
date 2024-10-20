/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { CamposAgencia } from "../../helpers/RegistrarAgencia/CamposAgencia";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/AdministrarAgencias/EditarAgencia.css";

export default function EditarAgencia({
  informacionDeLaAgencia,
  establecerVista,
}) {
  const { ActualizarInformacionAgencia } = useAgencias();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("Agencia", informacionDeLaAgencia?.NombreAgencia);
    setValue("Contacto", informacionDeLaAgencia?.NombreContactoAgencia);
    setValue("Telefono", informacionDeLaAgencia?.TelefonoContactoAgencia);
    setValue("Correo", informacionDeLaAgencia?.CorreoContactoAgencia);
    setValue("Estado", informacionDeLaAgencia?.EstadoAgencia);
    setValue("Ciudad", informacionDeLaAgencia?.CiudadAgencia);
    setValue("CP", informacionDeLaAgencia?.CodigoPostalAgencia);
    setValue("Direccion", informacionDeLaAgencia?.DireccionAgencia);
    if (informacionDeLaAgencia?.NombreAgencia === "Envía MGS") {
      document
        .getElementById("NombreAgencia")
        .classList.add("DesactivarNombreAgencia");
      document
        .getElementById("NombreAgencia")
        .setAttribute("disabled", "disabled");
    }
  }, []);

  const ActualizarInformacionDeLaAgencia = handleSubmit(async (info) => {
    if (
      informacionDeLaAgencia.NombreAgencia === "Envía MGS" &&
      info.Agencia !== "Envía MGS"
    ) {
      return toast.error(
        "El nombre de la agencia Envía MGS no puede ser cambiado ❌"
      );
    }
    try {
      info.idAgencia = informacionDeLaAgencia?.idAgencia;
      info.CookieConToken = COOKIE_CON_TOKEN;
      const res = await ActualizarInformacionAgencia(info);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVista(0);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });
  // LOS ESTILOS DE LOS CAMPOS ESTÁN EN COMPONENTES > REGISTRAR AGENCIA > INFORMACIÓN DE LA AGENCIA
  return (
    <form className="EditarAgencia" onSubmit={ActualizarInformacionDeLaAgencia}>
      <div className="EditarAgencia__Opciones">
        <button
          className="EditarAgencia__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarAgencia__Titulo">Editar Agencia</h1>
      {CamposAgencia.map(
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
            {tipoCampo === "text" && (
              <>
                <input
                  id={idCampo}
                  type="text"
                  name={nombreCampo}
                  placeholder={placeholderCampo}
                  {...register(nombreCampo, validadorCampo)}
                />
                <ErrorMessage
                  errors={errors}
                  name={nombreCampo}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="RegistrarAgencia__MensajeDeError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )}
            {tipoCampo === "select" && (
              <>
                <select
                  name=""
                  id={idCampo}
                  {...register(nombreCampo, validadorCampo)}
                >
                  <option value="">Elige una opción</option>
                  <option value="Prueba">Opción de prueba</option>
                </select>
                <ErrorMessage
                  errors={errors}
                  name={nombreCampo}
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <small
                        key={type}
                        className="RegistrarAgencia__MensajeDeError"
                      >
                        {message}
                      </small>
                    ))
                  }
                />
              </>
            )}
          </span>
        )
      )}
      <footer className="EditarAgencia__Footer">
        <button type="submit" className="EditarAgencia__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
