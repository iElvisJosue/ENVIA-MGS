/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS COMPONENTES A USAR
import GoogleAPI from "../../GoogleAPI";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../../../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/ListaOrdenes/ListaDeOrdenesCompletarInformacionOrden.css";

export default function ListaDeOrdenesCompletarInformacionOrden({
  informacionDeLaOrden,
  esListaCompleta,
  establecerVistaOrden,
}) {
  // ESTADOS AQUI
  const [direccion, establecerDireccion] = useState(null);
  const [detallesDeLaDireccion, establecerDetallesDeLaDireccion] =
    useState(null);
  const { CompletarInformacionDeUnaOrden } = usePedidos();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const CompletarInformacionDeLaOrden = handleSubmit(async (data) => {
    if (!detallesDeLaDireccion) {
      return toast.warning(
        "¡Para completar la información de la, debe seleccionar una dirección!",
        {
          theme: "colored",
        }
      );
    }
    data.CookieConToken = COOKIE_CON_TOKEN;
    data.idOrden = informacionDeLaOrden.idOrden;
    data.PaisEntregaOrden = detallesDeLaDireccion.PAIS;
    data.CodigoPaisEntregaOrden = detallesDeLaDireccion.CODIGO_PAIS;
    data.EstadoEntregaOrden = detallesDeLaDireccion.ESTADO;
    data.CodigoEstadoEntregaOrden = detallesDeLaDireccion.CODIGO_ESTADO;
    data.CiudadEntregaOrden = detallesDeLaDireccion.CIUDAD;
    data.CodigoPostalEntregaOrden = detallesDeLaDireccion.CODIGO_POSTAL;
    data.DireccionEntregaOrden = detallesDeLaDireccion.DIRECCION;
    try {
      const res = await CompletarInformacionDeUnaOrden(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerVistaOrden(esListaCompleta ? 0 : 1);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });
  const MensajeError = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="NuevaOrden__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  const PropsGoogleAPI = {
    direccion,
    establecerDireccion,
    detallesDeLaDireccion,
    establecerDetallesDeLaDireccion,
    ciudadesPermitidas: ["us", "mx"],
  };

  return (
    <form
      className="ListaDeOrdenesCompletarInformacionOrden"
      onSubmit={CompletarInformacionDeLaOrden}
    >
      <section className="ListaDeOrdenesCompletarInformacionOrden__Opciones">
        <button
          className="ListaDeOrdenesCompletarInformacionOrden__Opciones--Boton Regresar"
          onClick={() => establecerVistaOrden(esListaCompleta ? 0 : 1)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </section>
      <h1 className="ListaDeOrdenesCompletarInformacionOrden__Titulo">
        Información de los usuarios y vendedores
      </h1>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="color-palette"></ion-icon> Nombre paleta
        </p>
        <select
          name="NombrePaletaOrden"
          id="NombrePaletaOrden"
          {...register("NombrePaletaOrden")}
        >
          <option value="FDSIMMY2">FDSIMMY2</option>
          <option value="HFJJFUR0">HFJJFUR0</option>
          <option value="ALOPEEU3">ALOPEEU3</option>
        </select>
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="storefront"></ion-icon> Vendedor
        </p>
        <select
          name="VendedorOrden"
          id="VendedorOrden"
          {...register("VendedorOrden")}
        >
          <option value="OMAR VARGAS (34485)">OMAR VARGAS (34485)</option>
          <option value="ELIAS CARMONA (25896)">ELIAS CARMONA (25896)</option>
          <option value="JOSUE CORTEZ (12398)">JOSUE CORTEZ (34485)</option>
        </select>
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="person-circle"></ion-icon> Manager
        </p>
        <select
          name="NombreManagerOrden"
          id="NombreManagerOrden"
          {...register("NombreManagerOrden")}
        >
          <option value="(36056) ARIEL U">(36056) ARIEL U</option>
          <option value="(58965) MARIA E">(58965) MARIA E</option>
          <option value="(32569) ARMANDO O">(32569) ARMANDO O</option>
        </select>
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="eye"></ion-icon> Verificador
        </p>
        <select
          name="NombreVerificadorOrden"
          id="NombreVerificadorOrden"
          {...register("NombreVerificadorOrden")}
        >
          <option value="Sin definir">Sin definir</option>
          <option value="Sebastian Mendoza">Sebastian Mendoza</option>
          <option value="Alejandra Piedra">Alejandra Piedra</option>
        </select>
      </span>
      <h1 className="ListaDeOrdenesCompletarInformacionOrden__Titulo">
        Fechas
      </h1>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="log-in"></ion-icon> Ingreso
        </p>
        <input
          id="FechaIngresoOrden"
          type="date"
          name="FechaIngresoOrden"
          {...register("FechaIngresoOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("FechaIngresoOrden")}
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="checkmark-circle"></ion-icon> Verificación
        </p>
        <input
          id="FechaVerificacionOrden"
          type="date"
          name="FechaVerificacionOrden"
          {...register("FechaVerificacionOrden")}
        />
        {MensajeError("FechaVerificacionOrden")}
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="send"></ion-icon> Envío
        </p>
        <input
          id="FechaEnvioOrden"
          type="date"
          name="FechaEnvioOrden"
          {...register("FechaEnvioOrden")}
        />
        {MensajeError("FechaEnvioOrden")}
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="bag-check"></ion-icon> Recibió
        </p>
        <input
          id="FechaRecibioOrden"
          type="date"
          name="FechaRecibioOrden"
          {...register("FechaRecibioOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("FechaRecibioOrden")}
      </span>
      <h1 className="ListaDeOrdenesCompletarInformacionOrden__Titulo">
        Entrega
      </h1>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo Dos">
        <p>
          <ion-icon name="airplane"></ion-icon> Medio de envío
        </p>
        <select
          name="MedioDeEnvioOrden"
          id="MedioDeEnvioOrden"
          {...register("MedioDeEnvioOrden")}
        >
          <option value="Areo">AEREO</option>
          <option value="Cita">CITA</option>
          <option value="Oficina">OFICINA</option>
          <option value="Retiro en local">RETIRO EN LOCAL</option>
          <option value="Ruta">RUTA</option>
          <option value="SPF">SPF</option>
        </select>
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="calendar"></ion-icon> Fecha de entrega
        </p>
        <input
          id="FechaEntregaOrden"
          type="date"
          name="FechaEntregaOrden"
          {...register("FechaEntregaOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("FechaEntregaOrden")}
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="time"></ion-icon> Horario
        </p>
        <input
          id="HorarioOrden"
          type="time"
          name="HorarioOrden"
          {...register("HorarioOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("HorarioOrden")}
      </span>
      <h1 className="ListaDeOrdenesCompletarInformacionOrden__Titulo">
        Seguimiento
      </h1>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="document-text"></ion-icon> Guía
        </p>
        <input
          type="text"
          value={informacionDeLaOrden.GuiaOrden}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "#000",
            pointerEvents: "none",
          }}
          disabled
        />
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo">
        <p>
          <ion-icon name="search"></ion-icon> Rastreo
        </p>
        <input
          id="RastreoOrden"
          name="RastreoOrden"
          type="text"
          placeholder="Escriba aquí..."
          {...register("RastreoOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("RastreoOrden")}
      </span>
      <span className="ListaDeOrdenesCompletarInformacionOrden__Campo Dos">
        <p>
          <ion-icon name="color-palette"></ion-icon> Numeración de paleta
        </p>
        <input
          id="NumeracionPaletaOrden"
          name="NumeracionPaletaOrden"
          type="text"
          placeholder="Escriba aquí..."
          {...register("NumeracionPaletaOrden", {
            required: "¡Este campo es obligatorio! ⚠️",
          })}
        />
        {MensajeError("NumeracionPaletaOrden")}
      </span>
      <h1 className="ListaDeOrdenesCompletarInformacionOrden__Titulo">
        Dirección de entrega
      </h1>
      <GoogleAPI {...PropsGoogleAPI} />
      <footer className="ListaDeOrdenesCompletarInformacionOrden__Footer">
        <button
          type="submit"
          className="ListaDeOrdenesCompletarInformacionOrden__Footer__Boton Finalizar"
        >
          Finalizar
        </button>
      </footer>
    </form>
  );
}
