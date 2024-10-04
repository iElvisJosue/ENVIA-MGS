/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
// import { useEffect, useState } from "react
import { useEffect } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";
// import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarProductosPorFiltro from "../../hooks/useBuscarProductosPorFiltro";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/AdministrarProductos/ListaDeProductos.css";

export default function ListaDeProductos({
  establecerVista,
  establecerInformacionDelProducto,
}) {
  //   const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
  //     useState(false);
  //   const [activar, establecerActivar] = useState(true);
  //   const [infAgencia, establecerInfAgencia] = useState(null);
  const {
    productos,
    cargandoProductos,
    filtroProductos,
    establecerFiltroProductos,
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

  const obtenerUsuarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroProductos(valorIntroducido);
      reiniciarValores();
    }
  };

  //   const MostrarModalActivar = (infAgencia) => {
  //     establecerInfAgencia(infAgencia);
  //     establecerActivar(true);
  //     establecerMostrarModalConfirmacion(true);
  //   };
  //   const MostrarModalDesactivar = (infAgencia) => {
  //     establecerInfAgencia(infAgencia);
  //     establecerActivar(false);
  //     establecerMostrarModalConfirmacion(true);
  //   };

  const EstablecerInformacionDeLaAgenciaSeleccionada = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVista(1);
  };
  const EstablecerInformacionDelProductoAEditar = (infProducto) => {
    establecerInformacionDelProducto(infProducto);
    establecerVista(2);
  };

  if (cargandoProductos) return <Cargando />;

  return (
    <div className="ListaDeProductos">
      {/* {mostrarModalConfirmacion && (
        <ModalConfirmacionAgencias
          Activar={activar}
          infAgencia={infAgencia}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerAgenciasNuevamente={obtenerAgenciasNuevamente}
          establecerObtenerAgenciasNuevamente={
            establecerObtenerAgenciasNuevamente
          }
        />
      )} */}
      <h1 className="ListaDeProductos__Titulo">Administrar Productos</h1>
      <span className="ListaDeProductos__Buscar">
        <input
          type="text"
          placeholder="Buscar producto"
          onChange={obtenerUsuarios}
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
          {productos.slice(indiceInicial, indiceFinal).map((infProducto) => (
            <section
              className="ListaDeProductos__Producto"
              key={infProducto.idProducto}
            >
              <ion-icon name="basket"></ion-icon>
              <p>{infProducto.NombreProducto}</p>
              <span className="ListaDeProductos__Producto__Opciones">
                <button
                  className="ListaDeProductos__Producto__Opciones--Boton Administrar"
                  title="Administrar Agencias"
                  onClick={() =>
                    EstablecerInformacionDeLaAgenciaSeleccionada(infProducto)
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
                  //   onClick={() => MostrarModalDesactivar(infProducto)}
                  title="Desactivar producto"
                >
                  <p>
                    <ion-icon name="ban"></ion-icon>
                  </p>
                </button>
              </span>
            </section>
          ))}

          <small className="ListaDeProductos__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados para "${filtroProductos}"`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Registrar-Producto"}
          TextoBoton={"Registrar Producto"}
        />
      )}
    </div>
  );
}
