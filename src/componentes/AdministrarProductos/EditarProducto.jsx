/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../context/ProductosContext";

// IMPORTAMOS LAS AYUDAS
import { CamposProducto } from "../../helpers/RegistrarProducto/CamposProducto";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/AdministrarProductos/EditarProducto.css";

export default function EditarProducto({
  informacionDelProducto,
  establecerVista,
}) {
  const { ActualizarInformacionDeUnProducto } = useProductos();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setValue("NombreProducto", informacionDelProducto?.NombreProducto);
    setValue("AnchoProducto", informacionDelProducto?.AnchoProducto);
    setValue("LargoProducto", informacionDelProducto?.LargoProducto);
    setValue("AltoProducto", informacionDelProducto?.AltoProducto);
    setValue(
      "CostoCajaVaciaProducto",
      informacionDelProducto?.CostoCajaVaciaProducto
    );
    setValue("PrecioProducto", informacionDelProducto?.PrecioProducto);
    setValue(
      "CostoLibraExtraProducto",
      informacionDelProducto?.LibraExtraProducto
    );
    setValue(
      "PesoSinCobroProducto",
      informacionDelProducto?.PesoSinCobroProducto
    );
    setValue("PesoMaximoProducto", informacionDelProducto?.PesoMaximoProducto);
    setValue("ComisionProducto", informacionDelProducto?.ComisionProducto);
  }, []);

  const ActualizarInformacionDelProducto = handleSubmit(async (info) => {
    try {
      info.CookieConToken = COOKIE_CON_TOKEN;
      info.idProducto = informacionDelProducto?.idProducto;
      const res = await ActualizarInformacionDeUnProducto(info);
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

  const MensajeDeError = (NombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="RegistrarProducto__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <form
      className="EditarProducto"
      onSubmit={ActualizarInformacionDelProducto}
    >
      <div className="EditarProducto__Opciones">
        <button
          className="EditarProducto__Opciones--Boton Regresar"
          type="button"
          onClick={() => establecerVista(0)}
        >
          <ion-icon name="arrow-back"></ion-icon>
        </button>
      </div>
      <h1 className="EditarProducto__Titulo">Editar Producto</h1>
      {CamposProducto.map(
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
        ) =>
          tipoCampo === "text" && (
            <span className={claseCampo} key={index}>
              <p>
                <ion-icon name={iconoCampo}></ion-icon> {tituloCampo}
              </p>
              <input
                id={idCampo}
                type={tipoCampo}
                name={nombreCampo}
                placeholder={placeholderCampo}
                {...register(nombreCampo, validadorCampo)}
              />
              {MensajeDeError(nombreCampo)}
            </span>
          )
      )}
      <footer className="EditarProducto__Footer">
        <button type="submit" className="EditarProducto__Footer__Boton Guardar">
          Actualizar
        </button>
      </footer>
    </form>
  );
}
