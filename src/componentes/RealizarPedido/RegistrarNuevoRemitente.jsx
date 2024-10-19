/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LAS AYUDAS
import { CamposRemitente } from "../../helpers/RealizarPedido/CamposRemitente";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/RegistrarNuevoRemitente.css";

export default function RegistrarNuevoRemitente({
  establecerVistaRemitente,
  remitente,
  establecerRemitente,
  establecerPaso,
  paso,
  agencia,
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
      setValue("CodigoPostalRemitente", remitente?.CodigoPostalRemitente);
      setValue("CiudadRemitente", remitente?.CiudadRemitente);
      setValue("EstadoRemitente", remitente?.EstadoRemitente);
      setValue("DireccionRemitente", remitente?.DireccionRemitente);
      setValue("ReferenciaRemitente", remitente?.ReferenciaRemitente);
    }
  }, []);

  const GuardaInformacionDelRemitente = handleSubmit(async (data) => {
    // SON TEMPORALES
    data.PaisRemitente = "MEX | Mexico";
    data.CodigoPaisRemitente = "MEX";
    data.idRemitente = false;
    establecerRemitente(data);
    establecerPaso(paso + 1);
    toast.success("Remitente completado con éxito ✨");
  });

  return (
    <form
      className="RegistrarNuevoRemitente"
      onSubmit={GuardaInformacionDelRemitente}
    >
      <span className="RegistrarNuevoRemitente__Opciones">
        <button
          type="button"
          className="RegistrarNuevoRemitente__Opciones--Boton"
          onClick={() => establecerVistaRemitente(1)}
        >
          <ion-icon name="list"></ion-icon>
        </button>
      </span>

      <h1 className="RegistrarNuevoRemitente__Titulo">
        Registrar Nuevo Remitente
      </h1>
      {CamposRemitente.map(
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
                        className="RealizarPedido__MensajeDeError"
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
                        className="RealizarPedido__MensajeDeError"
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
      <footer className="RegistrarNuevoRemitente__Footer">
        <button
          type="button"
          className="RegistrarNuevoRemitente__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
        >
          Regresar
        </button>
        <button
          type="submit"
          className="RegistrarNuevoRemitente__Footer__Boton Siguiente"
        >
          Siguiente
        </button>
      </footer>
      <AgenciaSeleccionada NombreAgencia={agencia?.NombreAgencia} />
    </form>
  );
}
