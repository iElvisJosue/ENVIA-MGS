/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useProductos } from "../../../context/ProductosContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacionProductos from "./ModalConfirmacionProductos";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosPorFiltro from "../../../hooks/useBuscarProductosPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LAS AYUDAS
import { COOKIE_CON_TOKEN } from "../../../helpers/ObtenerCookie";
import { ManejarMensajesDeRespuesta } from "../../../helpers/RespuestasServidor";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Productos/AdministrarProductos/ListaDeProductos.css";

export default function ListaDeProductos({
  establecerVista,
  establecerInformacionDelProducto,
}) {
  const { ActualizarSeVendeProducto } = useProductos();
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infProducto, establecerInfProducto] = useState(null);
  const {
    productos,
    cargandoProductos,
    establecerFiltroProductos,
    buscarProductosNuevamente,
    establecerBuscarProductosNuevamente,
  } = useBuscarProductosPorFiltro();
  const {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  } = usePaginacion();

  useEffect(() => {
    if (productos) {
      const cantidadDePaginasEnProductos = Math.ceil(
        productos.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnProductos);
    }
  }, [productos]);

  const ObtenerLosProductos = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductos(valorIntroducido);
      reiniciarValores();
    }
  };

  const ActualizarSiSeVendeUnProducto = async (SeVendeProducto, idProducto) => {
    try {
      const res = await ActualizarSeVendeProducto({
        CookieConToken: COOKIE_CON_TOKEN,
        SeVendeProducto,
        idProducto,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        const { status, data } = res;
        ManejarMensajesDeRespuesta({ status, data });
        establecerBuscarProductosNuevamente(!buscarProductosNuevamente);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  };

  const MostrarModalActivar = (infProducto) => {
    establecerInfProducto(infProducto);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infProducto) => {
    establecerInfProducto(infProducto);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDelProductoSeleccionado = (infProducto) => {
    establecerVista(1);
    establecerInformacionDelProducto(infProducto);
  };
  const EstablecerInformacionDelProductoAEditar = (infProducto) => {
    establecerVista(2);
    establecerInformacionDelProducto(infProducto);
  };

  if (cargandoProductos) return <Cargando />;

  return (
    <div className="ListaDeProductos">
      {mostrarModalConfirmacion && (
        <ModalConfirmacionProductos
          Activar={activar}
          infProducto={infProducto}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          buscarProductosNuevamente={buscarProductosNuevamente}
          establecerBuscarProductosNuevamente={
            establecerBuscarProductosNuevamente
          }
        />
      )}
      <h1 className="ListaDeProductos__Titulo">Administrar Productos</h1>
      <span className="ListaDeProductos__Buscar">
        <input
          type="text"
          placeholder="Buscar producto"
          onChange={ObtenerLosProductos}
        />
        <span className="ListaDeProductos__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {productos.length > 0 ? (
        <>
          <small className="ListaDeProductos__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {productos.length} resultados{" "}
          </small>
          <h2 className="ListaDeProductos__Clasificacion">
            Estatus de los productos:
          </h2>
          <span className="ListaDeProductos__Colores">
            <p className="ListaDeProductos__Clasificacion--Texto Activa">
              <ion-icon name="basket"></ion-icon> Activo
            </p>
            <p className="ListaDeProductos__Clasificacion--Texto Vender">
              <ion-icon name="cash"></ion-icon> Vender
            </p>
            <p className="ListaDeProductos__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <div className="ListaDeProductos__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < productos.length && (
              <button
                className="ListaDeProductos__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {productos.slice(indiceInicial, indiceFinal).map((infProducto) =>
            infProducto.StatusProducto === "Activo" ? (
              <section
                className="ListaDeProductos__Producto"
                key={infProducto.idProducto}
              >
                <span className="ListaDeProductos__Producto__Detalles">
                  <ion-icon name="basket"></ion-icon>
                  <p>{infProducto.NombreProducto}</p>
                  <ion-icon name="logo-dropbox"></ion-icon>
                  <p>Costo caja vacía</p>
                  <p>
                    {Number(infProducto.CostoCajaVaciaProducto).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    )}
                  </p>
                  {infProducto.SeVendeProducto === "Si" ? (
                    <span
                      className={`ListaDeProductos__Producto__Detalles--Vender ${infProducto.SeVendeProducto}`}
                      onClick={() =>
                        ActualizarSiSeVendeUnProducto(
                          "No",
                          infProducto.idProducto
                        )
                      }
                    >
                      <button title="No vender este producto">
                        <ion-icon name="cash"></ion-icon>
                      </button>
                    </span>
                  ) : (
                    <span
                      className={`ListaDeProductos__Producto__Detalles--Vender ${infProducto.SeVendeProducto}`}
                      onClick={() =>
                        ActualizarSiSeVendeUnProducto(
                          "Si",
                          infProducto.idProducto
                        )
                      }
                    >
                      <button title="Vender este producto">
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </span>
                  )}
                </span>
                <span className="ListaDeProductos__Producto__Opciones">
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Administrar"
                    title="Administrar Agencias"
                    onClick={() =>
                      EstablecerInformacionDelProductoSeleccionado(infProducto)
                    }
                  >
                    <p>
                      <ion-icon name="business"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Editar"
                    title="Editar producto"
                    onClick={() =>
                      EstablecerInformacionDelProductoAEditar(infProducto)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Desactivar"
                    onClick={() => MostrarModalDesactivar(infProducto)}
                    title="Desactivar producto"
                  >
                    <p>
                      <ion-icon name="ban"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            ) : (
              <section
                className="ListaDeProductos__Producto Desactivado"
                key={infProducto.idProducto}
              >
                <span className="ListaDeProductos__Producto__Detalles">
                  <ion-icon name="basket"></ion-icon>
                  <p>{infProducto.NombreProducto}</p>
                  <ion-icon name="logo-dropbox"></ion-icon>
                  <p>Costo caja vacía</p>
                  <p>
                    {Number(infProducto.CostoCajaVaciaProducto).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    )}
                  </p>
                </span>
                <span className="ListaDeProductos__Producto__Opciones">
                  <button
                    className="ListaDeProductos__Producto__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infProducto)}
                    title="Activar producto"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeProductos__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Productos"}
          TextoBoton={"Registrar Producto"}
        />
      )}
    </div>
  );
}
