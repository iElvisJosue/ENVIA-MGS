/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../../context/PedidosContext";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerProductosActivosYDisponiblesParaVender from "../../hooks/useObtenerProductosActivosYDisponiblesParaVender";

// IMPORTAMOS LAS AYUDAS A USAR
import {
  CrearIDUnico,
  CalcularTotalDeLaOrden,
} from "../../helpers/RealizarOrden/Calculos";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarOrden/InformacionDeLaCaja.css";

export default function InformacionDeLaCaja({
  remitente,
  usuario,
  paso,
  establecerPaso,
  orden,
  establecerOrden,
  idAgencia,
  NombreAgencia,
  establecerDetallesOrden,
}) {
  // OBTENEMOS LOS PRODUCTOS, TIPOS DE CARGA Y TIPOS DE ENVIO
  const { productos } = useObtenerProductosActivosYDisponiblesParaVender();

  // OBTENEMOS LA FUNCIÓN PARA GUARDAR TODA LA INFORMACIÓN
  const { GuardarInformacionDeLaOrden } = usePedidos();

  // OBTENEMOS LOS CAMPOS DEL PEDIDO
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const GuardarInformacionDelProducto = handleSubmit(async (data) => {
    const { Producto } = data;
    if (Producto === "Invalido") {
      return toast.error(
        "¡Oops! Parece que no has seleccionado ningún producto.",
        {
          theme: "colored",
        }
      );
    }
    const cantidadDeProductos = Number(data.Cantidad);
    const nuevaOrden = [...orden]; // Crear una copia de la orden actual
    for (let i = 1; i <= cantidadDeProductos; i++) {
      const nuevoProducto = {
        ...data, // Copia del objeto data
        UsuarioResponsable: usuario?.Usuario,
        idProducto: CrearIDUnico(), // Usar nuevaOrden para mantener el id correcto
        idAgencia,
        NombreAgencia,
      };
      nuevaOrden.push(nuevoProducto); // Añadir el nuevo producto al pedido
    }
    establecerOrden(nuevaOrden); // Actualizar la orden fuera del bucle
    toast.success(
      `¡El producto ${data.Producto.toUpperCase()} ha sido añadido con éxito a la orden!`,
      {
        theme: "colored",
      }
    );
    reset();
  });

  const EliminarProductoDeLaOrden = (Producto, id) => {
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido eliminado con éxito de la orden!`,
      {
        theme: "colored",
      }
    );
    const nuevaOrden = orden.filter((item) => item.idProducto !== id);
    establecerOrden(nuevaOrden);
  };

  const ObtenerInformacionDelProductoSeleccionado = (event) => {
    const idDelProductoSeleccionado = Number(
      event.target.selectedOptions[0].getAttribute("id")
    );
    const informacionProductoSeleccionado = productos.filter(
      (producto) => producto.idProducto === idDelProductoSeleccionado
    );

    // CREAMOS LOS VALORES AUNQUE NO ESTÉN EN INPUTS PARA EL FORM
    setValue("Ancho", informacionProductoSeleccionado[0].AnchoProducto);
    setValue("Largo", informacionProductoSeleccionado[0].LargoProducto);
    setValue("Alto", informacionProductoSeleccionado[0].AltoProducto);
    setValue(
      "CostoCajaVaciaProducto",
      informacionProductoSeleccionado[0].CostoCajaVaciaProducto
    );
  };

  const GuardarTodaLaInformacionEnLaBD = async () => {
    orden.forEach(
      (item) => (
        (item.CostoCajaVaciaProducto = Number(item.CostoCajaVaciaProducto)),
        (item.TotalDeLaOrden = CalcularTotalDeLaOrden(orden))
      )
    );
    const TodaLaInformacion = {
      CookieConToken: COOKIE_CON_TOKEN,
      remitente,
      orden,
    };
    try {
      const res = await GuardarInformacionDeLaOrden(TodaLaInformacion);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success(`¡La orden ha sido creada con éxito!`, {
          theme: "colored",
        });
        establecerDetallesOrden(res.data);
        establecerPaso(2);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
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
            <small key={type} className="RealizarOrden__MensajeDeError">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <>
      <form
        className="InformacionDeLaCaja"
        onSubmit={GuardarInformacionDelProducto}
      >
        <h1 className="InformacionDeLaCaja__Titulo">Información del pedido</h1>
        <span
          className="InformacionDeLaCaja__Campo"
          onChange={ObtenerInformacionDelProductoSeleccionado}
        >
          <p>
            <ion-icon name="basket"></ion-icon> Producto
          </p>
          <select
            name="Producto"
            id="Producto"
            {...register("Producto", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
          >
            <option value="Invalido">Selecciona un producto</option>
            {productos?.map((producto) => (
              <option
                key={producto.idProducto}
                value={producto.NombreProducto}
                id={producto.idProducto}
              >
                {producto.NombreProducto}
              </option>
            ))}
          </select>
          {MensajeDeError("Producto")}
        </span>
        <span className="InformacionDeLaCaja__Campo">
          <p>
            <ion-icon name="apps"></ion-icon> Cantidad
          </p>
          <input
            id="Cantidad"
            type="text"
            name="Cantidad"
            placeholder="Escriba aquí..."
            {...register("Cantidad", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: {
                value: /^\d+$/,
                message: "¡Este campo solo acepta números! 🔢",
              },
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Cantidad")}
        </span>
        <div className="InformacionDeLaCaja__BotonPedido">
          <button>Agregar producto</button>
        </div>
      </form>
      {orden.length > 0 && (
        <section className="InformacionDeLaCaja__ListaProductos">
          <span className="InformacionDeLaCaja__ListaProductos__Titulo">
            <p className="InformacionDeLaCaja__ListaProductos__Titulo__Texto">
              <ion-icon name="cube"></ion-icon>Productos agregados:{" "}
              {orden.length}
            </p>
            <p className="InformacionDeLaCaja__ListaProductos__Titulo__Texto">
              Total:{" "}
              {CalcularTotalDeLaOrden(orden).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </span>
          <div className="InformacionDeLaCaja__ListaProductos__Encabezado">
            <p>Detalles</p>
            <p>Importe</p>
            <p>Opciones</p>
          </div>
          {orden.map(
            (
              {
                idProducto,
                Producto,
                Ancho,
                Largo,
                Alto,
                CostoCajaVaciaProducto,
              },
              index
            ) => (
              <div
                className="InformacionDeLaCaja__ListaProductos__Cuerpo"
                key={index}
              >
                <span className="InformacionDeLaCaja__ListaProductos__Cuerpo__Detalles">
                  <p>
                    <ion-icon name="basket"></ion-icon> <b>Producto:</b>{" "}
                    {Producto}
                  </p>
                  <p>
                    <ion-icon name="swap-horizontal"></ion-icon> <b>Ancho:</b>{" "}
                    {Ancho || "-"}
                  </p>
                  <p>
                    <ion-icon name="swap-vertical"></ion-icon> <b>Largo:</b>{" "}
                    {Largo || "-"}
                  </p>
                  <p>
                    <ion-icon name="arrow-up"></ion-icon> <b>Alto:</b>{" "}
                    {Alto || "-"}
                  </p>
                </span>
                <span className="InformacionDeLaCaja__ListaProductos__Cuerpo__Detalles">
                  <p className="InformacionDeLaCaja__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon> <b>Costo:</b>{" "}
                    {Number(CostoCajaVaciaProducto).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </span>
                <span className="InformacionDeLaCaja__ListaProductos__Cuerpo__Detalles">
                  <button
                    className="InformacionDeLaCaja__ListaProductos__Cuerpo__Detalles__Boton Eliminar"
                    onClick={() =>
                      EliminarProductoDeLaOrden(Producto, idProducto)
                    }
                  >
                    Eliminar
                  </button>
                </span>
              </div>
            )
          )}
        </section>
      )}
      <footer className="InformacionDeLaCaja__Footer">
        <button
          className="InformacionDeLaCaja__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        {orden.length > 0 && (
          <button
            className="InformacionDeLaCaja__Footer__Boton Finalizar"
            onClick={GuardarTodaLaInformacionEnLaBD}
          >
            Finalizar
          </button>
        )}
      </footer>
    </>
  );
}
