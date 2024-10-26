/* eslint-disable react/prop-types */
// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";
import { usePedidos } from "../../../context/PedidosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import AgenciaSeleccionadaEnvio from "./AgenciaSeleccionadaEnvio";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerProductosPorAgencia from "../../../hooks/useObtenerProductosPorAgencia";
import useObtenerTiposDeCarga from "../../../hooks/useObtenerTiposDeCarga";
import useObtenerTiposDeEnvio from "../../../hooks/useObtenerTiposDeEnvio";

// IMPORTAMOS LAS AYUDAS A USAR
import {
  CalcularCostoSobrePeso,
  CalcularCostoDelEnvio,
  CalcularCostoSeguro,
  CalcularTotalPedido,
  CalcularTotalProducto,
  CalcularIdUnico,
} from "../../../helpers/NuevoEnvio/Calculos";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import {
  REGEX_LETRAS_NUMEROS_ACENTOS_ESPACIOS,
  REGEX_SOLO_NUMEROS,
} from "../../../helpers/Regexs";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Envios/NuevoEnvio/InformacionDelEnvio.css";

export default function InformacionDelEnvio({
  agencia,
  remitente,
  destinatario,
  paso,
  establecerPaso,
  pedido,
  establecerPedido,
  establecerDetallesPedido,
}) {
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
      return toast.warning(
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
      return toast.warning(
        "¡El valor asegurado no puede ser mayor a $500.00!",
        {
          theme: "colored",
        }
      );
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
      };
      nuevoPedido.push(nuevoProducto); // Añadir el nuevo producto al pedido
    }
    establecerPedido(nuevoPedido); // Actualizar el pedido fuera del bucle
    toast.success(
      `¡El producto ${Producto.toUpperCase()} ha sido agregado con éxito al envío!`,
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
      `¡El producto ${Producto.toUpperCase()} ha sido eliminado con éxito del envío!`,
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
        toast.success("El envío ha sido creado con éxito!", {
          theme: "colored",
        });
        establecerDetallesPedido(res.data);
        establecerPaso(4);
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
            <small key={type} className="NuevoEnvio__MensajeDeError">
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
        className="InformacionDelEnvio"
        onSubmit={GuardarInformacionDelProducto}
      >
        <h1 className="InformacionDelEnvio__Titulo">Información del envío</h1>
        <span
          className="InformacionDelEnvio__Campo"
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
        <span className="InformacionDelEnvio__Campo">
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
          className="InformacionDelEnvio__Campo"
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
        <span className="InformacionDelEnvio__Campo">
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
        <span className="InformacionDelEnvio__Campo Individual">
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
        <span className="InformacionDelEnvio__Campo Individual">
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
        <span className="InformacionDelEnvio__Campo Individual">
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
        <span className="InformacionDelEnvio__Campo Individual">
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
        <span className="InformacionDelEnvio__Campo Individual Completo">
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
        <span className="InformacionDelEnvio__Campo Individual Individual">
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
        <span className="InformacionDelEnvio__Campo Individual Individual">
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
        <div className="InformacionDelEnvio__BotonPedido">
          <button>Agregar producto</button>
        </div>
        <AgenciaSeleccionadaEnvio NombreAgencia={agencia?.NombreAgencia} />
      </form>
      {pedido.length > 0 && (
        <section className="InformacionDelEnvio__ListaProductos">
          <span className="InformacionDelEnvio__ListaProductos__Titulo">
            <p className="InformacionDelEnvio__ListaProductos__Titulo__Texto">
              <ion-icon name="cube"></ion-icon>Productos agregados:{" "}
              {pedido.length}
            </p>
            <p className="InformacionDelEnvio__ListaProductos__Titulo__Texto">
              Total: {CalcularTotalPedido(pedido)}
            </p>
          </span>
          <div className="InformacionDelEnvio__ListaProductos__Encabezado">
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
                className="InformacionDelEnvio__ListaProductos__Cuerpo"
                key={index}
              >
                <span className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles">
                  <p>
                    <ion-icon name="basket"></ion-icon> <b>Producto:</b>{" "}
                    {Producto}
                  </p>
                  <p>
                    <ion-icon name="expand"></ion-icon> <b>Medidas:</b> {Ancho}x
                    {Largo}x{Alto}
                  </p>
                  <p>
                    <ion-icon name="document-text"></ion-icon> <b>Contenido:</b>{" "}
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
                <span className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles">
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon> <b>Declarado:</b>{" "}
                    {Number(ValorDeclarado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto Rojo">
                    <ion-icon name="shield-checkmark"></ion-icon>{" "}
                    <b>Asegurado:</b>{" "}
                    {Number(ValorAsegurado).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto">
                    <ion-icon name="cash"></ion-icon> <b>TCF:</b> $0.00
                  </p>
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="airplane"></ion-icon> <b>Envío:</b>{" "}
                    {CostoEnvio.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="shield"></ion-icon> <b>Costo seguro:</b>{" "}
                    {CostoSeguro.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <p className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles--Texto Verde">
                    <ion-icon name="scale"></ion-icon> <b>Cargo sobrepeso:</b>{" "}
                    {CostoSobrePeso.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </span>
                <span className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles">
                  <button
                    className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles__Boton Eliminar"
                    onClick={() =>
                      EliminarProductoDelPedido(Producto, idProducto)
                    }
                  >
                    Eliminar
                  </button>
                  <button className="InformacionDelEnvio__ListaProductos__Cuerpo__Detalles__Boton UltimaMilla">
                    Ultima milla
                  </button>
                </span>
              </div>
            )
          )}
        </section>
      )}
      <footer className="InformacionDelEnvio__Footer">
        <button
          className="InformacionDelEnvio__Footer__Boton Regresar"
          onClick={() => establecerPaso(paso - 1)}
          type="button"
        >
          Regresar
        </button>
        {pedido.length > 0 && (
          <button
            className="InformacionDelEnvio__Footer__Boton Finalizar"
            onClick={GuardarTodaLaInformacionEnLaBD}
          >
            Finalizar
          </button>
        )}
      </footer>
    </>
  );
}
