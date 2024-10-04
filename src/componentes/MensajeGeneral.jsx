/* eslint-disable react/prop-types */

// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/MensajeGeneral.css";

export default function MensajeGeneral({
  Imagen,
  Texto,
  Boton = false,
  TipoBoton = "Negro",
  UrlBoton = "#",
  TextoBoton = "Botón",
}) {
  return (
    <section className="MensajeGeneral">
      <img
        src={Imagen}
        alt="No se encontraron resultados"
        className="MensajeGeneral__Imagen"
      />
      <p className="MensajeGeneral__Texto">{Texto}</p>
      {Boton && (
        <a className={`MensajeGeneral__Boton ${TipoBoton}`} href={UrlBoton}>
          {TextoBoton}
        </a>
      )}
    </section>
  );
}
