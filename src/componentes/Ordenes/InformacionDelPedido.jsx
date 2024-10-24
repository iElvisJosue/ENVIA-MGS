/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";
import { usePedidos } from "../../context/PedidosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import ModalInformacionDeLaAgencia from "./ModalInformacionDeLaAgencia";
import ModalInformacionDelRemitente from "./ModalInformacionDelRemitente";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerProductosPorAgencia from "../../hooks/useObtenerProductosPorAgencia";
import useObtenerTiposDeCarga from "../../hooks/useObtenerTiposDeCarga";
import useObtenerTiposDeEnvio from "../../hooks/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS A USAR
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../helpers/Regexs";

// REUTILIZAMOS LAS AYUDAS
import {
  CalcularCostoSobrePeso,
  CalcularCostoDelEnvio,
  CalcularCostoSeguro,
  CalcularTotalPedido,
  CalcularTotalProducto,
  CalcularIdUnico,
} from "../../helpers/RealizarPedido/Calculos";
import { ManejarMensajesDeRespuesta } from "../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/ObtenerCookie";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/InformacionDelPedidoOrden.css";

export default function InformacionDelPedido({
  agencia,
  remitente,
  destinatario,
  orden,
  paso,
  establecerPaso,
  pedido,
  establecerPedido,
  establecerDetallesPedido,
}) {
  const [mostrarModalAgencia, establecerMostrarModalAgencia] = useState(false);
  const [mostrarModalRemitente, establecerMostrarModalRemitente] =
    useState(false);
  // OBTENEMOS LOS PRODUCTOS, TIPOS DE CARGA Y TIPOS DE ENVIO
  const { productos } = useObtenerProductosPorAgencia(agencia.idAgencia);
  const { cargas, cargandoCargas } = useObtenerTiposDeCarga();
  const { envios } = useObtenerTiposDeEnvio();

  // CREAMOS EL ESTADO DONDE ALMACENAREMOS EL PORCENTAJE DE LA CARGA
  const [porcentajeCarga, establecerPorcentajeCarga] = useState(0);
  // ALMACENAMOS LA INFORMACIÓN DEL PRODUCTO SELECCIONADO
  const [productoSeleccionado, establecerProductoSeleccionado] = useState(null);

  useEffect(() => {
    if (!cargandoCargas) {
      // LO ESTABLECEMOS CON EL ELEMENTO 0 PORQUE ES EL PORCENTAJE DE CARGA POR DEFECTO
      establecerPorcentajeCarga(cargas[0].PorcentajeCarga);
    }
  }, [cargandoCargas]);

  // OBTENEMOS LA INFORMACIÓN DEL USUARIO
  const { usuario } = useGlobal();
  // OBTENEMOS LA FUNCIÓN PARA GUARDAR TODA LA INFORMACIÓN
  const { GuardarTodaLaInformacion } = usePedidos();

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
    const {
      ValorDeclarado,
      ValorAsegurado,
      Peso,
      Largo,
      Ancho,
      Alto,
      Producto,
      TipoDeCarga,
      TipoDeEnvio,
    } = data;
    if (
      Producto === "Invalido" ||
      TipoDeCarga === "Invalido" ||
      TipoDeEnvio === "Invalido"
    ) {
      return toast.error(
        "¡Oops! Te olvidaste de seleccionar el producto, el tipo de carga o el tipo de envío.",
        {
          theme: "colored",
        }
      );
    }
    if (Number(ValorAsegurado) > Number(ValorDeclarado)) {
      return toast.warning(
        "¡El valor asegurado no puede ser mayor al valor declarado!",
        {
          theme: "colored",
        }
      );
    }
    if (Number(ValorAsegurado) > 500) {
      return toast.error("¡El valor asegurado no puede ser mayor a $500.00!", {
        theme: "colored",
      });
    }
    if (Number(Peso) > Number(productoSeleccionado.PesoMaximoProducto)) {
      return toast.warning(
        `¡El peso no puede ser mayor a ${productoSeleccionado.PesoMaximoProducto}!`,
        {
          theme: "colored",
        }
      );
    }
    const cantidadDeProductos = Number(data.Cantidad);
    const nuevoPedido = [...pedido]; // Crear una copia del pedido actual
    for (let i = 1; i <= cantidadDeProductos; i++) {
      const nuevoProducto = {
        ...data, // Copia del objeto data
        UsuarioResponsable: usuario?.Usuario,
        idProducto: CalcularIdUnico(), // Usar nuevoPedido para mantener el id correcto
        CostoEnvio: CalcularCostoDelEnvio(
          Number(data.Peso),
          Number(data.ValorDeclarado),
          Number(productoSeleccionado.PesoSinCobroProducto),
          Number(productoSeleccionado.LibraExtraProducto)
        ),
        CostoSeguro: CalcularCostoSeguro(
          Number(data.ValorAsegurado),
          porcentajeCarga
        ),
        CostoSobrePeso: CalcularCostoSobrePeso(
          Number(data.Peso),
          Number(productoSeleccionado.PesoSinCobroProducto),
          Number(productoSeleccionado.LibraExtraProducto)
        ),
        PieCubico: ((Largo * Ancho * Alto) / 1728).toString().slice(0, 6),
        Total: CalcularTotalProducto(
          CalcularCostoSobrePeso(
            Number(data.Peso),
            Number(productoSeleccionado.PesoSinCobroProducto),
            Number(productoSeleccionado.LibraExtraProducto)
          ),
          CalcularCostoSeguro(Number(data.ValorAsegurado), porcentajeCarga),
          CalcularCostoDelEnvio(
            Number(data.Peso),
            Number(data.ValorDeclarado),
            Number(productoSeleccionado.PesoSinCobroProducto),
            Number(productoSeleccionado.LibraExtraProducto)
          )
        ),
        idAgencia: agencia.idAgencia,
        NombreAgencia: agencia.NombreAgencia,
        idOrden: orden.idOrden,
        GuiaOrden: orden.GuiaOrden,
      };
      nuevoPedido.push(nuevoProducto); // Añadir el nuevo producto al pedido
    }
    establecerPedido(nuevoPedido); // Actualizar el pedido fuera del bucle
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido agregado con éxito al pedido!`,
      {
        theme: "colored",
      }
    );
    reset();
    // LO ESTABLECEMOS CON EL ELEMENTO 0 PORQUE ES EL PORCENTAJE DE CARGA POR DEFECTO
    // Y AL HACER EL RESET, SE RESETEA EL PORCENTAJE DE CARGA POR DEFECTO
    establecerPorcentajeCarga(cargas[0].PorcentajeCarga);
  });

  const EliminarProductoDelPedido = (Producto, id) => {
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido eliminado con éxito del pedido!`,
      {
        theme: "colored",
      }
    );
    const nuevoPedido = pedido.filter((item) => item.idProducto !== id);
    establecerPedido(nuevoPedido);
  };

  const ObtenerInformacionDelProductoSeleccionado = (event) => {
    const idDelProductoSeleccionado = Number(
      event.target.selectedOptions[0].getAttribute("id")
    );
    const informacionProductoSeleccionado = productos.filter(
      (producto) => producto.idProducto === idDelProductoSeleccionado
    );

    setValue("Ancho", informacionProductoSeleccionado[0].AnchoProducto);
    setValue("Largo", informacionProductoSeleccionado[0].LargoProducto);
    setValue("Alto", informacionProductoSeleccionado[0].AltoProducto);
    setValue(
      "ValorDeclarado",
      informacionProductoSeleccionado[0].PrecioProducto
    );

    establecerProductoSeleccionado(informacionProductoSeleccionado[0]);
  };

  const ObtenerPorcentajeDeCarga = (event) => {
    // OBTENEMOS EL ID DEL ELEMENTO SELECT SELECCIONADO
    const idDelTipoDeCarga = event.target.selectedOptions[0].getAttribute("id");

    // OBTENEMOS EL PORCENTAJE DE CARGA CORRESPONDIENTE
    const PorcentajeDeCargaSelecciona = cargas.filter(
      ({ idCarga }) => idCarga === Number(idDelTipoDeCarga)
    );

    // ACTUALIZAMOS EL PORCENTAJE DE CARGA
    establecerPorcentajeCarga(PorcentajeDeCargaSelecciona[0].PorcentajeCarga);
  };

  const GuardarTodaLaInformacionEnLaBD = async () => {
    const TodaLaInformacion = {
      CookieConToken: COOKIE_CON_TOKEN,
      destinatario,
      remitente,
      pedido,
    };
    try {
      const res = await GuardarTodaLaInformacion(TodaLaInformacion);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        toast.success("El pedido ha sido creado con éxito!", {
          theme: "colored",
        });
        establecerDetallesPedido(res.data);
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
            <small key={type} className="RealizarPedido__MensajeDeError">
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
        className="InformacionDelPedidoOrden"
        onSubmit={GuardarInformacionDelProducto}
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
        <span className="InformacionDelPedidoOrden__Opciones">
          <button
            type="button"
            className="InformacionDelPedidoOrden__Opciones--Boton Remitente"
            onClick={() => establecerMostrarModalRemitente(true)}
          >
            <ion-icon name="person-circle"></ion-icon>
          </button>
          <button
            type="button"
            className="InformacionDelPedidoOrden__Opciones--Boton Agencia"
            onClick={() => establecerMostrarModalAgencia(true)}
          >
            <ion-icon name="business"></ion-icon>
          </button>
        </span>
        <h1 className="InformacionDelPedidoOrden__Titulo">
          Información del pedido
        </h1>
        <span
          className="InformacionDelPedidoOrden__Campo"
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
            {productos.map((producto) => (
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
        <span className="InformacionDelPedidoOrden__Campo">
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
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Cantidad")}
        </span>
        <span
          className="InformacionDelPedidoOrden__Campo"
          onChange={ObtenerPorcentajeDeCarga}
        >
          <p>
            <ion-icon name="cube"></ion-icon> Tipo de carga
          </p>
          <select
            name="TipoDeCarga"
            id="TipoDeCarga"
            {...register("TipoDeCarga", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
          >
            <option value="Invalido">Selecciona un tipo de carga</option>
            {cargas.map((carga) => (
              <option
                key={carga.idCarga}
                value={carga.TipoCarga}
                id={carga.idCarga}
              >
                {carga.TipoCarga}
              </option>
            ))}
          </select>
          {MensajeDeError("TipoDeCarga")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo">
          <p>
            <ion-icon name="airplane"></ion-icon> Tipo de envío
          </p>
          <select
            name="TipoDeEnvio"
            id="TipoDeEnvio"
            {...register("TipoDeEnvio", {
              required: "¡Este campo es obligatorio! ⚠️",
            })}
          >
            <option value="Invalido">Selecciona un tipo de envío</option>
            {envios.map((envio) => (
              <option
                key={envio.idTipoEnvio}
                value={envio.TipoEnvio}
                id={envio.idTipoEnvio}
              >
                {envio.TipoEnvio}
              </option>
            ))}
          </select>
          {MensajeDeError("TipoDeEnvio")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual">
          <p>
            <ion-icon name="scale"></ion-icon> Peso
          </p>
          <input
            id="Peso"
            type="text"
            name="Peso"
            placeholder="Escriba aquí..."
            {...register("Peso", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Peso")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual">
          <p>
            <ion-icon name="swap-horizontal"></ion-icon> Ancho
          </p>
          <input
            id="Ancho"
            type="text"
            name="Ancho"
            placeholder="Escriba aquí..."
            {...register("Ancho", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Ancho")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual">
          <p>
            <ion-icon name="swap-vertical"></ion-icon> Largo
          </p>
          <input
            id="Largo"
            type="text"
            name="Largo"
            placeholder="Escriba aquí..."
            {...register("Largo", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Largo")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual">
          <p>
            <ion-icon name="arrow-up"></ion-icon> Alto
          </p>
          <input
            id="Alto"
            type="text"
            name="Alto"
            placeholder="Escriba aquí..."
            {...register("Alto", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 5,
                message: "¡Este campo no puede tener más de 5 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("Alto")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual Completo">
          <p>
            <ion-icon name="document-text"></ion-icon> Contenido del envío
          </p>
          <input
            id="ContenidoDeEnvio"
            type="text"
            name="ContenidoDeEnvio"
            placeholder="Escriba aquí..."
            {...register("ContenidoDeEnvio", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
              maxLength: {
                value: 1000,
                message:
                  "¡Este campo no puede tener más de 1000 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("ContenidoDeEnvio")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual Individual">
          <p>
            <ion-icon name="cash"></ion-icon> Valor declarado
          </p>
          <input
            id="ValorDeclarado"
            type="text"
            name="ValorDeclarado"
            placeholder="Escriba aquí..."
            {...register("ValorDeclarado", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("ValorDeclarado")}
        </span>
        <span className="InformacionDelPedidoOrden__Campo Individual Individual">
          <p>
            <ion-icon name="shield-checkmark"></ion-icon> Valor asegurado
          </p>
          <input
            id="ValorAsegurado"
            type="text"
            name="ValorAsegurado"
            placeholder="Escriba aquí..."
            {...register("ValorAsegurado", {
              required: "¡Este campo es obligatorio! ⚠️",
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 10,
                message: "¡Este campo no puede tener más de 10 caracteres! 🔠",
              },
            })}
          />
          {MensajeDeError("ValorAsegurado")}
        </span>
        <div className="InformacionDelPedidoOrden__BotonPedido">
          <button>Agregar producto</button>
        </div>
      </form>
      {pedido.length > 0 && (
        <section className="InformacionDelPedidoOrden__ListaProductos">
          <span className="InformacionDelPedidoOrden__ListaProductos__Titulo">
            <p className="InformacionDelPedidoOrden__ListaProductos__Titulo__Texto">
              <ion-icon name="cube"></ion-icon>Productos agregados:{" "}
              {pedido.length}
            </p>
            <p className="InformacionDelPedidoOrden__ListaProductos__Titulo__Texto">
              Total: {CalcularTotalPedido(pedido)}
            </p>
          </span>
          <div className="InformacionDelPedidoOrden__ListaProductos__Encabezado">
            <p>Detalles</p>
            <p>Importe</p>
            <p>Opciones</p>
          </div>
          {pedido.map(
            (
              {
                idProducto,
                Producto,
                Peso,
                Ancho,
                Largo,
                Alto,
                ContenidoDeEnvio,
                ValorDeclarado,
                ValorAsegurado,
                CostoEnvio,
                CostoSobrePeso,
                CostoSeguro,
                PieCubico,
              },
              index
            ) => (
              <div
                className="InformacionDelPedidoOrden__ListaProductos__Cuerpo"
                key={index}
              >
                <span className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles">
                  <p>
                    <ion-icon name="basket"></ion-icon> <b>Producto:</b>{" "}
                    {Producto}
                  </p>
                  <p>
                    <ion-icon name="expand"></ion-icon> <b>Medidas:</b> {Ancho}x
                    {Largo}x{Alto}
                  </p>
                  <p>
                    <ion-icon name="document-text"></ion-icon> <b>Envío:</b>{" "}
                    {ContenidoDeEnvio}
                  </p>
                  <p>
                    <ion-icon name="scale"></ion-icon> <b>Peso:</b> {Peso}
                  </p>
                  <p>
                    <ion-icon name="cube"></ion-icon> <b>FT³:</b>
                    {PieCubico}
                  </p>
                </span>
                <span className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles">
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon> <b>Declarado:</b>{" "}
                    {Number(ValorDeclarado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto Rojo">
                    <ion-icon name="shield-checkmark"></ion-icon>{" "}
                    <b>Asegurado:</b>{" "}
                    {Number(ValorAsegurado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon> <b>TCF:</b> $0.00
                  </p>
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="airplane"></ion-icon> <b>Envío:</b>{" "}
                    {CostoEnvio.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="shield"></ion-icon> <b>Costo seguro:</b>{" "}
                    {CostoSeguro.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="scale"></ion-icon> <b>Cargo sobrepeso:</b>{" "}
                    {CostoSobrePeso.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </span>
                <span className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles">
                  <button
                    className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles__Boton Eliminar"
                    onClick={() =>
                      EliminarProductoDelPedido(Producto, idProducto)
                    }
                  >
                    Eliminar
                  </button>
                  <button className="InformacionDelPedidoOrden__ListaProductos__Cuerpo__Detalles__Boton UltimaMilla">
                    Ultima milla
                  </button>
                </span>
              </div>
            )
          )}
        </section>
      )}
      <footer className="InformacionDelPedidoOrden__Footer">
        <button
          className="InformacionDelPedidoOrden__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        {pedido.length > 0 && (
          <button
            className="InformacionDelPedidoOrden__Footer__Boton Finalizar"
            onClick={GuardarTodaLaInformacionEnLaBD}
          >
            Finalizar
          </button>
        )}
      </footer>
    </>
  );
}
