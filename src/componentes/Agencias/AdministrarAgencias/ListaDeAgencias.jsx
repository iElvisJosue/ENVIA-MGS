/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacionAgencias from "./ModalConfirmacionAgencias";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarAgenciasPorFiltro from "../../../hooks/useBuscarAgenciasPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Agencias/AdministrarAgencias/ListaDeAgencias.css";

export default function ListaDeAgencias({
  establecerVista,
  establecerInformacionDeLaAgencia,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infAgencia, establecerInfAgencia] = useState(null);
  const {
    agencias,
    cargandoAgencias,
    establecerFiltroAgencias,
    obtenerAgenciasNuevamente,
    establecerObtenerAgenciasNuevamente,
  } = useBuscarAgenciasPorFiltro();
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
    if (agencias) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        agencias.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [agencias]);

  const obtenerUsuarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroAgencias(valorIntroducido);
      reiniciarValores();
    }
  };

  const MostrarModalActivar = (infAgencia) => {
    establecerInfAgencia(infAgencia);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infAgencia) => {
    establecerInfAgencia(infAgencia);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDeLaAgenciaSeleccionada = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(1);
  };
  const EstablecerInformacionDelUsuarioAEditar = (infAgencia) => {
    establecerInformacionDeLaAgencia(infAgencia);
    establecerVista(2);
  };

  if (cargandoAgencias) return <Cargando />;

  return (
    <div className="ListaDeAgencias">
      {mostrarModalConfirmacion && (
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
      )}
      <h1 className="ListaDeAgencias__Titulo">Administrar Agencias</h1>
      <span className="ListaDeAgencias__Buscar">
        <input
          type="text"
          placeholder="Buscar agencia"
          onChange={obtenerUsuarios}
        />
        <span className="ListaDeAgencias__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {agencias.length > 0 ? (
        <>
          <small className="ListaDeAgencias__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {agencias.length} resultados{" "}
          </small>
          <h2 className="ListaDeAgencias__Clasificacion">
            Estatus de las agencias:
          </h2>
          <span className="ListaDeAgencias__Colores">
            <p className="ListaDeAgencias__Clasificacion--Texto Activa">
              <ion-icon name="business"></ion-icon> Activa
            </p>
            <p className="ListaDeAgencias__Clasificacion--Texto Desactivada">
              <ion-icon name="ban"></ion-icon> Desactivada
            </p>
          </span>
          <div className="ListaDeAgencias__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeAgencias__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < agencias.length && (
              <button
                className="ListaDeAgencias__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {agencias.slice(indiceInicial, indiceFinal).map((infAgencia) =>
            infAgencia.StatusAgencia === "Activa" ? (
              <section
                className="ListaDeAgencias__Agencia"
                key={infAgencia.idAgencia}
              >
                <span className="ListaDeAgencias__Agencia__Detalles">
                  <ion-icon name="business"></ion-icon>
                  <p>{infAgencia.NombreAgencia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>{infAgencia.DireccionAgencia}</p>
                  <p>
                    {infAgencia.CiudadAgencia}, {infAgencia.EstadoAgencia}{" "}
                    {infAgencia.CodigoPostalAgencia}
                  </p>
                </span>
                <span className="ListaDeAgencias__Agencia__Opciones">
                  <button
                    className="ListaDeAgencias__Agencia__Opciones--Boton Administrar"
                    title="Administrar Productos"
                    onClick={() =>
                      EstablecerInformacionDeLaAgenciaSeleccionada(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="basket"></ion-icon>
                    </p>
                  </button>
                  <button
                    className="ListaDeAgencias__Agencia__Opciones--Boton Editar"
                    title="Editar agencia"
                    onClick={() =>
                      EstablecerInformacionDelUsuarioAEditar(infAgencia)
                    }
                  >
                    <p>
                      <ion-icon name="create"></ion-icon>
                    </p>
                  </button>
                  {infAgencia.NombreAgencia !== "Envía MGS" && (
                    <button
                      className="ListaDeAgencias__Agencia__Opciones--Boton Desactivar"
                      onClick={() => MostrarModalDesactivar(infAgencia)}
                      title="Desactivar agencia"
                    >
                      <p>
                        <ion-icon name="ban"></ion-icon>
                      </p>
                    </button>
                  )}
                </span>
              </section>
            ) : (
              <section
                className="ListaDeAgencias__Agencia Desactivada"
                key={infAgencia.idAgencia}
              >
                <span className="ListaDeAgencias__Agencia__Detalles">
                  <ion-icon name="business"></ion-icon>
                  <p>{infAgencia.NombreAgencia}</p>
                  <ion-icon name="location"></ion-icon>
                  <p>{infAgencia.DireccionAgencia}</p>
                  <p>
                    {infAgencia.CiudadAgencia}, {infAgencia.EstadoAgencia}{" "}
                    {infAgencia.CodigoPostalAgencia}
                  </p>
                </span>
                <span className="ListaDeAgencias__Agencia__Opciones">
                  <button
                    className="ListaDeAgencias__Agencia__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infAgencia)}
                    title="Activar agencia"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeAgencias__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Agencias"}
          TextoBoton={"Registrar Agencia"}
        />
      )}
    </div>
  );
}
