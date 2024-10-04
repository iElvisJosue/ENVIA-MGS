/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFecha from "../../hooks/useBuscarPedidosPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Pedidos/BuscarPedidosPorFecha.css";

export default function BuscarPedidosPorFecha({
  EstablecerLosDetallesDelPedido,
}) {
  const {
    pedidosPorFecha,
    cargandoPedidosPorFecha,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
  } = useBuscarPedidosPorFecha();

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  if (cargandoPedidosPorFecha) return <Cargando />;

  return (
    <>
      <h1 className="BuscarPedidosPorFecha__Titulo">
        Buscar pedidos por fecha
        <small className="BuscarPedidosPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="BuscarPedidosPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="BuscarPedidosPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="BuscarPedidosPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {pedidosPorFecha.length > 0 ? (
        <>
          <small className="BuscarPedidosPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {pedidosPorFecha.length} resultados{" "}
          </small>
          <div className="BuscarPedidosPorFecha__Cuerpo">
            <table className="BuscarPedidosPorFecha__Cuerpo__Tabla">
              <thead className="BuscarPedidosPorFecha__Cuerpo__Tabla__Encabezado">
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
                    <ion-icon name="location"></ion-icon>
                    <br />
                    Destinatario
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
              <tbody className="BuscarPedidosPorFecha__Cuerpo__Tabla__Cuerpo">
                {pedidosPorFecha.map((pedido) => (
                  <tr key={pedido.idPedido}>
                    <td>{pedido.GuiaPedido}</td>
                    <td>
                      {pedido.NombreRemitente} {pedido.ApellidosRemitente}
                    </td>
                    <td>
                      {pedido.NombreDestinatario}{" "}
                      {pedido.ApellidoPaternoDestinatario}{" "}
                      {pedido.ApellidoMaternoDestinatario}
                    </td>
                    <td>{pedido.NombreAgencia}</td>
                    <td>{pedido.UsuarioResponsablePedido}</td>
                    <td>
                      {FormatearFecha(pedido.FechaCreacionPedido.slice(0, 10))}{" "}
                      {pedido.HoraCreacionPedido}
                    </td>
                    <td>
                      <button
                        className="BuscarPedidosPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() => EstablecerLosDetallesDelPedido(pedido)}
                      >
                        Ver
                      </button>
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
          UrlBoton={"/Realizar-Pedido"}
          TextoBoton={"Realizar pedido"}
        />
      )}
    </>
  );
}
