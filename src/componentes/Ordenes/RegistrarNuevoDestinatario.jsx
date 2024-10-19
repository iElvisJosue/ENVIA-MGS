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
    data.PaisDestinatario = "MEX | Mexico";
    data.CodigoPaisDestinatario = "MEX";
    data.idDestinatario = false;
    establecerDestinatario(data);
    establecerPaso(paso + 1);
    toast.success("Destinatario completado con éxito ✨");
  });

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
            tipoCampo,
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
                  name={nombreCampo}
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
