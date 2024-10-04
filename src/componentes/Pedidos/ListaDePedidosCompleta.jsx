/* eslint-disable react/prop-types */

// IMPORTAMOS LAS AYUDAS
import { FormatearFecha } from "../../helpers/FuncionesGenerales";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../Cargando";
import MensajeGeneral from "../MensajeGeneral";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarPedidosPorFiltroYTipoDeUsuario from "../../hooks/useBuscarPedidosPorFiltroYTipoDeUsuario";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Pedidos/ListaDePedidosCompleta.css";

export default function ListaDePedidosCompleta({
  EstablecerLosDetallesDelPedido,
}) {
  const { pedidos, cargando, filtro, establecerFiltro } =
    useBuscarPedidosPorFiltroYTipoDeUsuario();

  const BuscarPedidos = (event) => {
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
    <>
      <h1 className="ListaDePedidosCompleta__Titulo">
        Lista completa de pedidos
      </h1>
      <span className="ListaDePedidosCompleta__Buscar">
        <input
          value={filtro}
          type="text"
          placeholder="Buscar por Guía, Remitente, Destinatario, Usuario o Agencia"
          onChange={BuscarPedidos}
        />
        <span className="ListaDePedidosCompleta__Buscar__Lupa">
          <ion-icon name="search"></ion-icon>
        </span>
      </span>
      {pedidos.length > 0 ? (
        <>
          <small className="ListaDePedidosCompleta__TextoResultados">
            <ion-icon name="search-circle"></ion-icon>Obtuvimos {pedidos.length}{" "}
            resultados{" "}
          </small>
          <div className="ListaDePedidosCompleta__Cuerpo">
            <table className="ListaDePedidosCompleta__Cuerpo__Tabla">
              <thead className="ListaDePedidosCompleta__Cuerpo__Tabla__Encabezado">
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
              <tbody className="ListaDePedidosCompleta__Cuerpo__Tabla__Cuerpo">
                {pedidos.map((pedido) => (
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
                        className="ListaDePedidosCompleta__Cuerpo__Tabla__Cuerpo__VerDetalles"
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
          Texto={`¡Oops! No se encontraron resultados para "${filtro}".`}
          Boton={true}
          TipoBoton={"Azul"}
          UrlBoton={"/Realizar-Pedido"}
          TextoBoton={"Realizar pedido"}
        />
      )}
    </>
  );
}
