/* eslint-disable react/prop-types */

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../Cargando";
import MensajeGeneral from "../../MensajeGeneral";

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFecha from "../../../hooks/useBuscarPedidosPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../../estilos/componentes/Envios/ListaEnvios/ListaEnviosPorFecha.css";

export default function ListaEnviosPorFecha({
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
    <div className="ListaEnviosPorFecha">
      <h1 className="ListaEnviosPorFecha__Titulo">
        Buscar envíos por fecha
        <small className="ListaEnviosPorFecha__Titulo--Fechas">
          ({FormatearFecha(primeraFecha)} - {FormatearFecha(segundaFecha)})
        </small>
      </h1>
      <div className="ListaEnviosPorFecha__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaEnviosPorFecha__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaEnviosPorFecha__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {pedidosPorFecha.length > 0 ? (
        <>
          <small className="ListaEnviosPorFecha__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos{" "}
            {pedidosPorFecha.length} resultados{" "}
          </small>
          <div className="ListaEnviosPorFecha__Cuerpo">
            <table className="ListaEnviosPorFecha__Cuerpo__Tabla">
              <thead className="ListaEnviosPorFecha__Cuerpo__Tabla__Encabezado">
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
              <tbody className="ListaEnviosPorFecha__Cuerpo__Tabla__Cuerpo">
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
                        className="ListaEnviosPorFecha__Cuerpo__Tabla__Cuerpo__VerDetalles"
                        onClick={() =>
                          EstablecerLosDetallesDelPedido(pedido, false)
                        }
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
          UrlBoton={"/Envios"}
          TextoBoton={"Nuevo envío"}
        />
      )}
    </div>
  );
}
