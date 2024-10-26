/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERIAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useAgencias } from "../../../context/AgenciasContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ModalInformacionDelProducto.css";

export default function ModalInformacionDelProducto({
  agencia,
  informacionDelProducto,
  establecerMostrarModal,
  buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
  establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia,
}) {
  const { AsignarProductoAgencia } = useAgencias();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue(
      "PesoSinCobroProducto",
      informacionDelProducto.PesoSinCobroProducto
    );
    setValue("PesoMaximoProducto", informacionDelProducto.PesoMaximoProducto);
    if (informacionDelProducto.Editable) {
      setValue("PrecioProducto", informacionDelProducto.PrecioProducto);
      setValue("ComisionProducto", informacionDelProducto.ComisionProducto);
      setValue("LibraExtraProducto", informacionDelProducto.LibraExtraProducto);
    } else {
      setValue(
        "PrecioProducto",
        Number(informacionDelProducto.PrecioProducto).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      );
      setValue(
        "ComisionProducto",
        Number(informacionDelProducto.ComisionProducto).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )
      );
      setValue(
        "LibraExtraProducto",
        Number(informacionDelProducto.LibraExtraProducto).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        )
      );
    }
  }, []);
  const PeticionAsignarProductoAgencia = handleSubmit(async (data) => {
    try {
      const res = await AsignarProductoAgencia({
        CookieConToken: COOKIE_CON_TOKEN,
        idAgencia: agencia.idAgencia,
        idProducto: informacionDelProducto.idProducto,
        PrecioProducto: data.PrecioProducto,
        ComisionProducto: data.ComisionProducto,
        LibraExtraProducto: data.LibraExtraProducto,
        PesoMaximoProducto: data.PesoMaximoProducto,
        PesoSinCobroProducto: data.PesoSinCobroProducto,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia(
          !buscarNuevamenteProductosAsignadosYNoAsignadosPorAgencia
        );
        establecerMostrarModal(false);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  const MensajeDeError = (NombreDelCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreDelCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small
              key={type}
              className="ModalInformacionDelProducto__MensajeDeError"
            >
              {message}
            </small>
          ))
        }
      />
    );
  };

  const ClaseInputs = informacionDelProducto.Editable
    ? "ModalInformacionDelProducto__Contenido--Informacion--Input"
    : "ModalInformacionDelProducto__Contenido--Informacion--Input Desactivado";

  return (
    <div className="ModalInformacionDelProducto">
      <form
        className="ModalInformacionDelProducto__Contenido"
        onSubmit={PeticionAsignarProductoAgencia}
      >
        <button
          type="button"
          className="ModalInformacionDelProducto__Contenido--CerrarModal"
          onClick={() => establecerMostrarModal(false)}
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h1 className="ModalInformacionDelProducto__Contenido--Titulo">
          Detalles del producto
        </h1>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="basket"></ion-icon> <b>Producto </b>
          {informacionDelProducto.NombreProducto}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="cash"></ion-icon> <b>Precio público </b>
          <input
            className={ClaseInputs}
            type="text"
            name="PrecioProducto"
            {...register("PrecioProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PrecioProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="cash"></ion-icon> <b>Comisión </b>
          <input
            className={ClaseInputs}
            type="text"
            name="ComisionProducto"
            {...register("ComisionProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("ComisionProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="scale"></ion-icon> <b>Libra extra </b>
          <input
            className={ClaseInputs}
            type="text"
            name="LibraExtraProducto"
            {...register("LibraExtraProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("LibraExtraProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion">
          <ion-icon name="thumbs-up"></ion-icon> <b>Peso sin cobro </b>
          <input
            className={ClaseInputs}
            type="text"
            name="PesoSinCobroProducto"
            {...register("PesoSinCobroProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PesoSinCobroProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="warning"></ion-icon> <b>Peso máximo </b>
          <input
            className={ClaseInputs}
            type="text"
            name="PesoMaximoProducto"
            {...register("PesoMaximoProducto", {
              required: "¡Campo obligatorio! ⚠️",
            })}
          />
          {MensajeDeError("PesoMaximoProducto")}
        </small>
        <small className="ModalInformacionDelProducto__Contenido--Informacion Col2">
          <ion-icon name="expand"></ion-icon> <b>Medidas </b>
          Ancho {informacionDelProducto.AnchoProducto} - Alto{" "}
          {informacionDelProducto.AltoProducto} - Altura{" "}
          {informacionDelProducto.LargoProducto}
        </small>
        {informacionDelProducto.Editable && (
          <button
            type="submit"
            className="ModalInformacionDelProducto__Contenido--Boton"
          >
            Asignar
          </button>
        )}
      </form>
    </div>
  );
}
