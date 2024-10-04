/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaDePedidosCompleta from "./ListaDePedidosCompleta";
import BuscarPedidosPorFecha from "./BuscarPedidosPorFecha";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Pedidos/ListaDePedidos.css";

export default function ListaDePedidos({
  establecerDetallesPedido,
  establecerVista,
}) {
  const [vistaPedido, establecerVistaPedido] = useState(0);

  const EstablecerLosDetallesDelPedido = (Pedido) => {
    establecerDetallesPedido(Pedido);
    establecerVista(1);
  };

  return (
    <div className="ListaDePedidos">
      <span className="ListaDePedidos__Opciones">
        {vistaPedido === 0 ? (
          <button
            type="button"
            className="ListaDePedidos__Opciones--Boton"
            onClick={() => establecerVistaPedido(1)}
          >
            <ion-icon name="calendar"></ion-icon> Buscar por fecha
          </button>
        ) : (
          <button
            type="button"
            className="ListaDePedidos__Opciones--Boton"
            onClick={() => establecerVistaPedido(0)}
          >
            <ion-icon name="list"></ion-icon> Lista completa
          </button>
        )}
      </span>
      {vistaPedido === 0 ? (
        <ListaDePedidosCompleta
          EstablecerLosDetallesDelPedido={EstablecerLosDetallesDelPedido}
        />
      ) : (
        <BuscarPedidosPorFecha
          EstablecerLosDetallesDelPedido={EstablecerLosDetallesDelPedido}
        />
      )}
    </div>
  );
}
