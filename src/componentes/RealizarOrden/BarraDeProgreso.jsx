/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../estilos/componentes/RealizarOrden/BarraDeProgreso.css";

export default function BarraDeProgreso({ Progreso }) {
  const CLASE_PASO_UNO = `BarraDeProgreso__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgreso__Paso ${Progreso[1]}`;

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
          <ion-icon name="logo-dropbox"></ion-icon> Caja
        </p>
      </span>
    </section>
  );
}
