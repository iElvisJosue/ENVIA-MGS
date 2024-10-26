/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Envios/NuevoEnvio/BarraDeProgresoEnvio.css";

export default function BarraDeProgresoEnvio({ Progreso }) {
  const CLASE_PASO_UNO = `BarraDeProgresoEnvio__Paso ${Progreso[0]}`;
  const CLASE_PASO_DOS = `BarraDeProgresoEnvio__Paso ${Progreso[1]}`;
  const CLASE_PASO_TRES = `BarraDeProgresoEnvio__Paso ${Progreso[2]}`;

  return (
    <section className="BarraDeProgresoEnvio">
      <span className={CLASE_PASO_UNO}>
        <p className="BarraDeProgresoEnvio__Paso--Número">1</p>
        <p className="BarraDeProgresoEnvio__Paso--Texto">
          <ion-icon name="person-circle"></ion-icon> Remitente
        </p>
      </span>
      <span className={CLASE_PASO_DOS}>
        <p className="BarraDeProgresoEnvio__Paso--Número">2</p>
        <p className="BarraDeProgresoEnvio__Paso--Texto">
          <ion-icon name="location"></ion-icon> Destinatario
        </p>
      </span>
      <span className={CLASE_PASO_TRES}>
        <p className="BarraDeProgresoEnvio__Paso--Número">3</p>
        <p className="BarraDeProgresoEnvio__Paso--Texto">
          <ion-icon name="cube"></ion-icon> Envío
        </p>
      </span>
    </section>
  );
}
