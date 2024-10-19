/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { useEffect, useState } from "react";
import { toast } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";
import ModalInformacionDeLaAgencia from "./ModalInformacionDeLaAgencia";
import ModalInformacionDelRemitente from "./ModalInformacionDelRemitente";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarDestinatariosPorAgencia from "../../hooks/useBuscarDestinatariosPorAgencia";
import usePaginacion from "../../hooks/usePaginacion";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/SeleccionarDestinatarioPedidoOrden.css";
export default function SeleccionarDestinatario({
  paso,
  establecerPaso,
  establecerVistaDestinatario,
  establecerDestinatario,
  agencia,
  remitente,
}) {
  const [mostrarModalAgencia, establecerMostrarModalAgencia] = useState(false);
  const [mostrarModalRemitente, establecerMostrarModalRemitente] =
    useState(false);

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
      `Destinatario ${destinatario.NombreDestinatario.toUpperCase()} ${destinatario.ApellidoPaternoDestinatario.toUpperCase()} ${destinatario.ApellidoMaternoDestinatario.toUpperCase()} seleccionado con éxito ✨`
    );
  };

  if (cargandoDestinatarios) return <Cargando />;

  return (
    <section className="SeleccionarDestinatarioPedidoOrden">
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
      <span className="SeleccionarDestinatarioPedidoOrden__Opciones">
        <button
          type="button"
          className="SeleccionarDestinatarioPedidoOrden__Opciones--Boton Remitente"
          onClick={() => establecerMostrarModalRemitente(true)}
        >
          <ion-icon name="person-circle"></ion-icon>
        </button>
        <button
          type="button"
          className="SeleccionarDestinatarioPedidoOrden__Opciones--Boton Agencia"
          onClick={() => establecerMostrarModalAgencia(true)}
        >
          <ion-icon name="business"></ion-icon>
        </button>
        <button
          type="button"
          className="SeleccionarDestinatarioPedidoOrden__Opciones--Boton Registrar"
          onClick={() => establecerVistaDestinatario(0)}
        >
          <ion-icon name="add-circle"></ion-icon>
        </button>
      </span>
      <h1 className="SeleccionarDestinatarioPedidoOrden__Titulo">
        Seleccionar Destinatario
      </h1>
      <span className="SeleccionarDestinatarioPedidoOrden__Buscar">
        <input
          type="text"
          placeholder="Buscar Destinatario"
          onChange={ObtenerDestinatarios}
        />
        <span className="SeleccionarDestinatarioPedidoOrden__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {destinatarios.length > 0 ? (
        <>
          <small className="SeleccionarDestinatarioPedidoOrden__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {destinatarios.length} resultados
          </small>
          <div className="SeleccionarDestinatarioPedidoOrden__BotonesDePaginacion">
            {indiceInicial >= CantidadParaMostrar && (
              <button
                className="SeleccionarDestinatarioPedidoOrden__BotonesDePaginacion--Boton Anterior"
                onClick={MostrarVeinticincoMenos}
              >
                <ion-icon name="arrow-back"></ion-icon>
              </button>
            )}
            {indiceFinal < destinatarios.length && (
              <button
                className="SeleccionarDestinatarioPedidoOrden__BotonesDePaginacion--Boton Siguiente"
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
                className="SeleccionarDestinatarioPedidoOrden__Remitente"
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
          <small className="SeleccionarDestinatarioPedidoOrden__TextoPaginas">
            Página {paginaParaMostrar} de {cantidadDePaginas}
          </small>
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
