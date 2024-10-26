/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorFecha from "../../../hooks/useBuscarOrdenesPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Ordenes/ListaOrdenes/ListaOrdenesPorFecha.css";

export default function ListaOrdenesPorFecha({
  EstablecerLosDetallesDeLaOrden,
  EstablecerElRemitenteYLaOrden,
}) {
  const {
    ordenesPorFecha,
    cargandoOrdenesPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarOrdenesPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoOrdenesPorFecha) return <Cargando />;

  return (
    <div className="ListaOrdenesPorFecha">
      <h1 className="ListaOrdenesPorFecha__Titulo">
        Buscar ordenes por fecha
        <small className="ListaOrdenesPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaOrdenesPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaOrdenesPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaOrdenesPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {ordenesPorFecha.length > 0 ? (
        <>
          <small className="ListaOrdenesPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {ordenesPorFecha.length} resultados{" "}
          </small>
          <h2 className="ListaOrdenesPorFecha__Clasificacion">
            Estatus de las ordenes:
          </h2>
          <span className="ListaOrdenesPorFecha__Colores">
            <p className="ListaOrdenesPorFecha__Clasificacion--Texto PedidoRealizado">
              <ion-icon name="checkmark"></ion-icon> Pedido Realizado
            </p>
            <p className="ListaOrdenesPorFecha__Clasificacion--Texto PedidoNoRealizado">
              <ion-icon name="close"></ion-icon> Pedido No Realizado
            </p>
          </span>
          <div className="ListaOrdenesPorFecha__Cuerpo">
            <table className="ListaOrdenesPorFecha__Cuerpo__Tabla">
              <thead className="ListaOrdenesPorFecha__Cuerpo__Tabla__Encabezado">
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
              <tbody className="ListaOrdenesPorFecha__Cuerpo__Tabla__Cuerpo">
                {ordenesPorFecha.map((orden) => (
                  <tr
                    key={orden.idOrden}
                    className={`ListaOrdenesPorFecha__Cuerpo__Tabla__Cuerpo--TR ${
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
                    <td className="ListaOrdenesPorFecha__Cuerpo__Tabla__Cuerpo__Acciones">
                      <button
                        title="Ver orden"
                        onClick={() =>
                          EstablecerLosDetallesDeLaOrden(orden, false)
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
          Texto={`¡Oops! No se encontraron resultados para las fechas ${primeraFecha
            .split("-")
            .reverse()
            .join("/")} a ${segundaFecha.split("-").reverse().join("/")}.`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Ordenes"}
          TextoBoton={"Nueva orden"}
        />
      )}
    </div>
  );
}
