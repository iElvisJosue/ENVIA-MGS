/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarOrdenesPorFecha from "../../hooks/useBuscarOrdenesPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Ordenes/BuscarOrdenesPorFecha.css";

export default function BuscarOrdenesPorFecha({
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
    <>
      <h1 className="BuscarOrdenesPorFecha__Titulo">
        Buscar ordenes por fecha
        <small className="BuscarOrdenesPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="BuscarOrdenesPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="BuscarOrdenesPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="BuscarOrdenesPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {ordenesPorFecha.length > 0 ? (
        <>
          <small className="BuscarOrdenesPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {ordenesPorFecha.length} resultados{" "}
          </small>
          <h2 className="BuscarOrdenesPorFecha__Clasificacion">
            Estatus de las ordenes:
          </h2>
          <span className="BuscarOrdenesPorFecha__Colores">
            <p className="BuscarOrdenesPorFecha__Clasificacion--Texto PedidoRealizado">
              <ion-icon name="checkmark"></ion-icon> Pedido Realizado
            </p>
            <p className="BuscarOrdenesPorFecha__Clasificacion--Texto PedidoNoRealizado">
              <ion-icon name="close"></ion-icon> Pedido No Realizado
            </p>
          </span>
          <div className="BuscarOrdenesPorFecha__Cuerpo">
            <table className="BuscarOrdenesPorFecha__Cuerpo__Tabla">
              <thead className="BuscarOrdenesPorFecha__Cuerpo__Tabla__Encabezado">
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
              <tbody className="BuscarOrdenesPorFecha__Cuerpo__Tabla__Cuerpo">
                {ordenesPorFecha.map((orden) => (
                  <tr
                    key={orden.idOrden}
                    className={`BuscarOrdenesPorFecha__Cuerpo__Tabla__Cuerpo--TR ${
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
                    <td className="BuscarOrdenesPorFecha__Cuerpo__Tabla__Cuerpo__Acciones">
                      <button
                        title="Ver orden"
                        onClick={() => EstablecerLosDetallesDeLaOrden(orden)}
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
          UrlBoton={"/Realizar-Orden"}
          TextoBoton={"Realizar orden"}
        />
      )}
    </>
  );
}
