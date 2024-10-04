/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/RealizarPedido/BarraDeProgreso.css";

export default function BarraDeProgreso({ Progreso }) {
  const CLASE_PASO_UNO = `BarraDeProgreso__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgreso__Paso ${Progreso[1]}`;
  const CLASE_PASO_TRES = `BarraDeProgreso__Paso ${Progreso[2]}`;

  return (
    <section className="BarraDeProgreso">
      <span className={CLASE_PASO_UNO}>
        <p className="BarraDeProgreso__Paso--Número">1</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name="person-circle"></ion-icon> Remitente
        </p>
      </span>
      <span className={CLASE_PASO_DOS}>
        <p className="BarraDeProgreso__Paso--Número">2</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name="location"></ion-icon> Destinatario
        </p>
      </span>
      <span className={CLASE_PASO_TRES}>
        <p className="BarraDeProgreso__Paso--Número">3</p>
        <p className="BarraDeProgreso__Paso--Texto">
          <ion-icon name="cube"></ion-icon> Pedido
        </p>
      </span>
    </section>
  );
}
