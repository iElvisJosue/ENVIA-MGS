/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect } from "react";
import { toast } from "react-toastify";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";
import AgenciaSeleccionadaEnvio from "./AgenciaSeleccionadaEnvio";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDestinatariosPorAgencia from "../../../hooks/useBuscarDestinatariosPorAgencia";
import usePaginacion from "../../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Envios/NuevoEnvio/SeleccionarDestinatarioEnvio.css";

export default function SeleccionarDestinatarioEnvio({
  establecerVistaDestinatario,
  establecerDestinatario,
  establecerPaso,
  agencia,
  paso,
}) {
  const { destinatarios, cargandoDestinatarios, establecerFiltro } =
    useBuscarDestinatariosPorAgencia({
      idAgencia: agencia.idAgencia,
    });

  useEffect(() => {
    if (destinatarios) {
      const cantidadDePaginasEnAgencias = Math.ceil(
        destinatarios.length / CantidadParaMostrar
      );
      establecerCantidadDePaginas(cantidadDePaginasEnAgencias);
    }
  }, [destinatarios]);

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

  const ObtenerDestinatarios = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
      reiniciarValores();
    }
  };

  const EstablecerElDestinatarioSeleccionado = (destinatario) => {
    establecerDestinatario(destinatario);
    establecerPaso(paso + 1);
    toast.success(
      `El destinatario ${destinatario.NombreDestinatario.toUpperCase()} ${destinatario.ApellidoPaternoDestinatario.toUpperCase()} ${destinatario.ApellidoMaternoDestinatario.toUpperCase()} ha sido seleccionado con éxito!`,
      {
        theme: "colored",
      }
    );
  };

  if (cargandoDestinatarios) return <Cargando />;

  return (
    <section className="SeleccionarDestinatarioEnvio">
      <span className="SeleccionarDestinatarioEnvio__Opciones">
        <button
          type="button"
          className="SeleccionarDestinatarioEnvio__Opciones--Boton"
          onClick={() => establecerVistaDestinatario(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarDestinatarioEnvio__Titulo">
        Seleccionar Destinatario
      </h1>
      <span className="SeleccionarDestinatarioEnvio__Buscar">
        <input
          type="text"
          placeholder="Buscar Destinatario"
          onChange={ObtenerDestinatarios}
        />
        <span className="SeleccionarDestinatarioEnvio__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {destinatarios.length > 0 ? (
        <>
          <small className="SeleccionarDestinatarioEnvio__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {destinatarios.length} resultados
          </small>
          <div className="SeleccionarDestinatarioEnvio__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="SeleccionarDestinatarioEnvio__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            {indiceFinal < destinatarios.length && (
              <button
                className="SeleccionarDestinatarioEnvio__BotonesDePaginacion--Boton Siguiente"
                onClick={MostrarVeinticincoMas}
              >
                <ion-icon name="arrow-forward"></ion-icon>
              </button>
            )}
          </div>
          {destinatarios
            .slice(indiceInicial, indiceFinal)
            .map((destinatario, index) => (
              <section
                className="SeleccionarDestinatarioEnvio__Remitente"
                key={index}
                onClick={() =>
                  EstablecerElDestinatarioSeleccionado(destinatario)
                }
              >
                <ion-icon name="person-circle"></ion-icon>
                <p>
                  {destinatario.NombreDestinatario}{" "}
                  {destinatario.ApellidoPaternoDestinatario}{" "}
                  {destinatario.ApellidoMaternoDestinatario}
                </p>
                <ion-icon name="location"></ion-icon>
                <p>{destinatario.DireccionDestinatario}</p>
                <p>
                  {destinatario.CiudadDestinatario},{" "}
                  {destinatario.EstadoDestinatario}{" "}
                  {destinatario.CodigoPostalDestinatario}
                </p>
              </section>
            ))}
          <small className="SeleccionarDestinatarioEnvio__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
          <AgenciaSeleccionadaEnvio NombreAgencia={agencia?.NombreAgencia} />
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
