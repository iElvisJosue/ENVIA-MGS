/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Menu/MenuOpciones.css";

export default function MenuOpciones({ OpcionPrincipal, OpcionSecundaria }) {
  const [iconoMostrar, establecerIconoMostrar] = useState(true);
  const [fondo, establecerFondo] = useState(true);
  const [altura, establecerAltura] = useState(true);

  //   OBTENEMOS LAS INFORMACION DE LA OPCION PRINCIPAL
  const { icono, nombre, url } = OpcionPrincipal;

  const NombreDelIcono = iconoMostrar ? "add" : "remove";

  const ClaseDeFondo = fondo
    ? "Menu__Cuerpo__Contenido--Opcion"
    : "Menu__Cuerpo__Contenido--Opcion Activo";
  const ClaseDeCuerpoContenido = altura
    ? "Menu__Cuerpo__Contenido"
    : "Menu__Cuerpo__Contenido Activo";

  const modificarOpcion = () => {
    establecerIconoMostrar(!iconoMostrar);
    establecerFondo(!fondo);
    establecerAltura(!altura);
  };

  return (
    <div className={ClaseDeCuerpoContenido}>
      <a className={ClaseDeFondo} onClick={modificarOpcion} href={url ?? "#"}>
        <ion-icon name={icono ?? "folder"}></ion-icon>
        <p className="Menu__Cuerpo__Contenido--Opcion--Texto">
          {nombre ?? "Opción"}
        </p>
        {OpcionSecundaria?.length > 0 && (
          <ion-icon name={NombreDelIcono}></ion-icon>
        )}
      </a>
      {OpcionSecundaria?.map(({ icono, nombre, url }, index) => (
        <span className="Menu__Cuerpo__Contenido--SubOpcion" key={index}>
          <a
            className="Menu__Cuerpo__Contenido--SubOpcion--Link"
            href={url ?? "#"}
          >
            <ion-icon name={icono ?? "folder"}></ion-icon>
            <p className="Menu__Cuerpo__Contenido--SubOpcion--Link--Texto">
              {nombre ?? "SubOpción"}
            </p>
          </a>
        </span>
      ))}
    </div>
  );
}
