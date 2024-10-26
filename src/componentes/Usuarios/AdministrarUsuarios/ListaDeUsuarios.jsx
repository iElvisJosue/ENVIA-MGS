/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import ModalConfirmacion from "./ModalConfirmacion";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUsuariosParaAdministrarPorFiltro from "../../../hooks/useBuscarUsuariosParaAdministrarPorFiltro";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Usuarios/AdministrarUsuarios/ListaDeUsuarios.css";

export default function ListaDeUsuarios({
  establecerVista,
  establecerInformacionDelUsuario,
}) {
  const [mostrarModalConfirmacion, establecerMostrarModalConfirmacion] =
    useState(false);
  const [activar, establecerActivar] = useState(true);
  const [infUsuario, establecerInfUsuario] = useState(null);
  const {
    usuarios,
    cargandoUsuarios,
    establecerFiltroUsuario,
    obtenerUsuariosNuevamente,
    establecerObtenerUsuariosNuevamente,
  } = useBuscarUsuariosParaAdministrarPorFiltro();
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
    if (usuarios) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        usuarios.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [usuarios]);

  const obtenerUsuarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltroUsuario(valorIntroducido);
      reiniciarValores();
    }
  };

  const IconosPorTipoDeUsuario = {
    Usuario: <ion-icon name="person-circle"></ion-icon>,
    Moderador: <ion-icon name="glasses"></ion-icon>,
    Administrador: <ion-icon name="shield-checkmark"></ion-icon>,
    Desactivado: <ion-icon name="ban"></ion-icon>,
  };

  const MostrarModalActivar = (infUsuario) => {
    establecerInfUsuario(infUsuario);
    establecerActivar(true);
    establecerMostrarModalConfirmacion(true);
  };
  const MostrarModalDesactivar = (infUsuario) => {
    establecerInfUsuario(infUsuario);
    establecerActivar(false);
    establecerMostrarModalConfirmacion(true);
  };

  const EstablecerInformacionDelUsuarioSeleccionado = (infUsuario) => {
    establecerInformacionDelUsuario(infUsuario);
    establecerVista(1);
  };
  const EstablecerInformacionDelUsuarioAEditar = (infUsuario) => {
    establecerInformacionDelUsuario(infUsuario);
    establecerVista(2);
  };

  if (cargandoUsuarios) return <Cargando />;

  return (
    <div className="ListaDeUsuarios">
      {mostrarModalConfirmacion && (
        <ModalConfirmacion
          Activar={activar}
          infUsuario={infUsuario}
          establecerMostrarModalConfirmacion={
            establecerMostrarModalConfirmacion
          }
          obtenerUsuariosNuevamente={obtenerUsuariosNuevamente}
          establecerObtenerUsuariosNuevamente={
            establecerObtenerUsuariosNuevamente
          }
        />
      )}
      <h1 className="ListaDeUsuarios__Titulo">Administrar Usuarios</h1>
      <span className="ListaDeUsuarios__Buscar">
        <input
          type="text"
          placeholder="Buscar usuario"
          onChange={obtenerUsuarios}
        />
        <span className="ListaDeUsuarios__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {usuarios.length > 0 ? (
        <>
          <small className="ListaDeUsuarios__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {usuarios.length} resultados{" "}
          </small>
          <h2 className="ListaDeUsuarios__Clasificacion">
            Clasificación de perfiles:
          </h2>
          <span className="ListaDeUsuarios__Colores">
            <p className="ListaDeUsuarios__Clasificacion--Texto Usuario">
              <ion-icon name="person-circle"></ion-icon> Usuario
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Moderador">
              <ion-icon name="glasses"></ion-icon> Moderador
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Administrador">
              <ion-icon name="shield-checkmark"></ion-icon> Administrador
            </p>
            <p className="ListaDeUsuarios__Clasificacion--Texto Desactivado">
              <ion-icon name="ban"></ion-icon> Desactivado
            </p>
          </span>
          <div className="ListaDeUsuarios__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < usuarios.length && (
              <button
                className="ListaDeUsuarios__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {usuarios.slice(indiceInicial, indiceFinal).map((infUsuario) =>
            infUsuario.EstadoUsuario === "Activo" ? (
              <section
                className={`ListaDeUsuarios__Usuario ${infUsuario.Permisos}`}
                key={infUsuario.idUsuario}
              >
                {IconosPorTipoDeUsuario[infUsuario.Permisos]}
                <p>{infUsuario.Usuario}</p>
                {infUsuario.Permisos !== "Administrador" && (
                  <span className="ListaDeUsuarios__Usuario__Opciones">
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      title="Administrar Agencias"
                      onClick={() =>
                        EstablecerInformacionDelUsuarioSeleccionado(infUsuario)
                      }
                    >
                      <p>
                        <ion-icon name="business"></ion-icon>
                      </p>
                    </button>
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      title="Editar usuario"
                      onClick={() =>
                        EstablecerInformacionDelUsuarioAEditar(infUsuario)
                      }
                    >
                      <p>
                        <ion-icon name="create"></ion-icon>
                      </p>
                    </button>
                    <button
                      className={`ListaDeUsuarios__Usuario__Opciones--Boton ${infUsuario.Permisos}`}
                      onClick={() => MostrarModalDesactivar(infUsuario)}
                      title="Desactivar usuario"
                    >
                      <p>
                        <ion-icon name="ban"></ion-icon>
                      </p>
                    </button>
                  </span>
                )}
              </section>
            ) : (
              <section
                className="ListaDeUsuarios__Usuario Desactivado"
                key={infUsuario.idUsuario}
              >
                {IconosPorTipoDeUsuario.Desactivado}
                <p>{infUsuario.Usuario}</p>
                <span className="ListaDeUsuarios__Usuario__Opciones">
                  <button
                    className="ListaDeUsuarios__Usuario__Opciones--Boton Activar"
                    onClick={() => MostrarModalActivar(infUsuario)}
                    title="Activar usuario"
                  >
                    <p>
                      <ion-icon name="power"></ion-icon>
                    </p>
                  </button>
                </span>
              </section>
            )
          )}

          <small className="ListaDeUsuarios__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Usuarios"}
          TextoBoton={"Registrar Usuario"}
        />
      )}
    </div>
  );
}
