/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/Encabezado.css";

export default function Encabezado({
  icono = "folder",
  seccion = "Sección Principal",
  subseccion = false,
}) {
  return (
    <header className="Encabezado">
      <ion-icon name={icono} class="Encabezado__Icono"></ion-icon>
      <p className="Encabezado__Seccion">
        {`${seccion}`}
        {subseccion && (
          <b className="Encabezado__Subseccion"> / {subseccion}</b>
        )}
      </p>
    </header>
  );
}
