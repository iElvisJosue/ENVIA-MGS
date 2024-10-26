/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Ordenes/NuevaOrden/BarraDeProgresoOrden.css";

export default function BarraDeProgresoOrden({ Progreso }) {
  const CLASE_PASO_UNO = `BarraDeProgresoOrden__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgresoOrden__Paso ${Progreso[1]}`;

  return (
    <section className="BarraDeProgresoOrden">
      <span className={CLASE_PASO_UNO}>
        <p className="BarraDeProgresoOrden__Paso--Número">1</p>
        <p className="BarraDeProgresoOrden__Paso--Texto">
          <ion-icon name="person-circle"></ion-icon> Remitente
        </p>
      </span>
      <span className={CLASE_PASO_DOS}>
        <p className="BarraDeProgresoOrden__Paso--Número">2</p>
        <p className="BarraDeProgresoOrden__Paso--Texto">
          <ion-icon name="logo-dropbox"></ion-icon> Caja
        </p>
      </span>
    </section>
  );
}
