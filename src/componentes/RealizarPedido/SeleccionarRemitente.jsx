/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect } from "react";
import { toast } from "react-toastify";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";
import AgenciaSeleccionada from "./AgenciaSeleccionada";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarRemitentesPorAgencia from "../../hooks/useBuscarRemitentesPorAgencia";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/RealizarPedido/SeleccionarRemitente.css";
export default function SeleccionarRemitente({
  establecerVistaRemitente,
  establecerRemitente,
  establecerPaso,
  agencia,
  paso,
}) {
  const { remitentes, cargandoRemitentes, establecerFiltro } =
    useBuscarRemitentesPorAgencia({
      idAgencia: agencia.idAgencia,
    });

  useEffect(() => {
    if (remitentes) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        remitentes.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [remitentes]);

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

  const ObtenerRemitentes = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstableElRemitenteSeleccionado = (remitente) => {
    establecerRemitente(remitente);
    establecerPaso(paso + 1);
    toast.success(
      `¡El remitente ${remitente.NombreRemitente.toUpperCase()} ${remitente.ApellidosRemitente.toUpperCase()} ha sido seleccionado con éxito!`,
      {
        theme: "colored",
      }
    );
  };

  if (cargandoRemitentes) return <Cargando />;

  return (
    <section className="SeleccionarRemitente">
      <span className="SeleccionarRemitente__Opciones">
        <button
          type="button"
          className="SeleccionarRemitente__Opciones--Boton"
          onClick={() => establecerVistaRemitente(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarRemitente__Titulo">Seleccionar Remitente</h1>
      <span className="SeleccionarRemitente__Buscar">
        <input
          type="text"
          placeholder="Buscar Remitente"
          onChange={ObtenerRemitentes}
        />
        <span className="SeleccionarRemitente__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {remitentes.length > 0 ? (
        <>
          <small className="SeleccionarRemitente__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {remitentes.length} resultados
          </small>
          <div className="SeleccionarRemitente__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="SeleccionarRemitente__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
              </button>
            )}
            {indiceFinal < remitentes.length && (
              <button
                className="SeleccionarRemitente__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            )}
          </div>
          {remitentes
            .slice(indiceInicial, indiceFinal)
            .map((remitente, index) => (
              <section
                className="SeleccionarRemitente__Remitente"
                key={index}
                onClick={() => EstableElRemitenteSeleccionado(remitente)}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
                <p>
                  {remitente.NombreRemitente} {remitente.ApellidosRemitente}
                </p>
                <ion-icon name="location"></ion-icon>
                <p>{remitente.DireccionRemitente}</p>
                <p>
                  {remitente.CiudadRemitente}, {remitente.EstadoRemitente}{" "}
                  {remitente.CodigoPostalRemitente}
                </p>
              </section>
            ))}
          <small className="SeleccionarRemitente__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
          <AgenciaSeleccionada NombreAgencia={agencia?.NombreAgencia} />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
        />
      )}
    </section>
  );
}
