/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Ordenes/ListaOrdenes/BarraDeProgresoPedidoOrden.css";

export default function BarraDeProgresoPedidoOrden({ Progreso }) {
  const CLASE_PASO_UNO = `BarraDeProgresoPedidoOrden__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgresoPedidoOrden__Paso ${Progreso[1]}`;

  return (
    <section className="BarraDeProgresoPedidoOrden">
      <span className={CLASE_PASO_UNO}>
        <p className="BarraDeProgresoPedidoOrden__Paso--Número">2</p>
        <p className="BarraDeProgresoPedidoOrden__Paso--Texto">
          <ion-icon name="location"></ion-icon> Destinatario
        </p>
      </span>
      <span className={CLASE_PASO_DOS}>
        <p className="BarraDeProgresoPedidoOrden__Paso--Número">3</p>
        <p className="BarraDeProgresoPedidoOrden__Paso--Texto">
          <ion-icon name="cube"></ion-icon> Pedido
        </p>
      </span>
    </section>
  );
}
