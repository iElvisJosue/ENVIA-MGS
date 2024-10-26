/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorFiltroYTipoDeUsuario from "../../../hooks/useBuscarOrdenesPorFiltroYTipoDeUsuario";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/ListaOrdenes/ListaOrdenesCompleta.css";

export default function ListaOrdenesCompleta({
  EstablecerLosDetallesDeLaOrden,
  EstablecerElRemitenteYLaOrden,
}) {
  const { ordenes, cargando, filtro, establecerFiltro } =
    useBuscarOrdenesPorFiltroYTipoDeUsuario();

  const BuscarOrdenes = (event) => {
    const valorIntroducido = event.target.value;
    // Utilizamos una expresión regular para permitir letras, números y "-"
    const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ-]*$/;
    // Comprobamos si el nuevo valor cumple con la expresión regular
    if (regex.test(valorIntroducido)) {
      establecerFiltro(valorIntroducido);
    }
  };

  if (cargando) return <Cargando />;

  return (
    <div className="ListaOrdenesCompleta">
      <h1 className="ListaOrdenesCompleta__Titulo">
        Lista completa de ordenes
      </h1>
      <span className="ListaOrdenesCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder="Buscar por Guía, Remitente o Usuario"
          onChange={BuscarOrdenes}
        />
        <span className="ListaOrdenesCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {ordenes.length > 0 ? (
        <>
          <small className="ListaOrdenesCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {ordenes.length}{" "}
            resultados{" "}
          </small>
          <h2 className="ListaOrdenesCompleta__Clasificacion">
            Estatus de las ordenes:
          </h2>
          <span className="ListaOrdenesCompleta__Colores">
            <p className="ListaOrdenesCompleta__Clasificacion--Texto PedidoRealizado">
              <ion-icon name="checkmark"></ion-icon> Pedido Realizado
            </p>
            <p className="ListaOrdenesCompleta__Clasificacion--Texto PedidoNoRealizado">
              <ion-icon name="close"></ion-icon> Pedido No Realizado
            </p>
          </span>
          <div className="ListaOrdenesCompleta__Cuerpo">
            <table className="ListaOrdenesCompleta__Cuerpo__Tabla">
              <thead className="ListaOrdenesCompleta__Cuerpo__Tabla__Encabezado">
                <tr>
                  <th>
                    <ion-icon name="document-text"></ion-icon>
                    <br />
                    Guía
                  </th>
                  <th>
                    <ion-icon name="paper-plane"></ion-icon>
                    <br />
                    Remitente
                  </th>
                  <th>
                    <ion-icon name="business"></ion-icon>
                    <br />
                    Agencia
                  </th>
                  <th>
                    <ion-icon name="person-circle"></ion-icon>
                    <br />
                    Usuario
                  </th>
                  <th>
                    <ion-icon name="calendar"></ion-icon>
                    <br />
                    Fecha y Hora
                  </th>
                  <th>
                    <ion-icon name="code-working"></ion-icon>
                    <br />
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="ListaOrdenesCompleta__Cuerpo__Tabla__Cuerpo">
                {ordenes.map((orden) => (
                  <tr
                    key={orden.idOrden}
                    className={`ListaOrdenesCompleta__Cuerpo__Tabla__Cuerpo--TR ${
                      orden.PedidoRealizadoOrden === "Si" && "OrdenRealizada"
                    }`}
                  >
                    <td>{orden.GuiaOrden}</td>
                    <td>
                      {orden.NombreRemitente} {orden.ApellidosRemitente}
                    </td>
                    <td>{orden.NombreAgencia}</td>
                    <td>{orden.UsuarioResponsableOrden}</td>
                    <td>
                      {FormatearFecha(orden.FechaCreacionOrden.slice(0, 10))}{" "}
                      {orden.HoraCreacionOrden}
                    </td>
                    <td className="ListaOrdenesCompleta__Cuerpo__Tabla__Cuerpo__Acciones">
                      <button
                        title="Ver orden"
                        onClick={() =>
                          EstablecerLosDetallesDeLaOrden(orden, true)
                        }
                      >
                        <ion-icon name="eye"></ion-icon>
                      </button>
                      {orden.PedidoRealizadoOrden === "No" && (
                        <button
                          title="Realizar pedido"
                          onClick={() => EstablecerElRemitenteYLaOrden(orden)}
                        >
                          <ion-icon name="cube"></ion-icon>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={`¡Oops! No se encontraron resultados.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Ordenes"}
          TextoBoton={"Nueva orden"}
        />
      )}
    </div>
  );
}
