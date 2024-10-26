/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../estilos/componentes/SubMenu.css";

export default function SubMenu({ OpcionesSubMenu, vista, establecerVista }) {
  return (
    <section className="SubMenu">
      {OpcionesSubMenu.map((Opcion, index) => (
        <button
          key={index}
          className={`SubMenu__Boton ${index === vista && "Seleccionado"}`}
          onClick={() => establecerVista(index)}
        >
          <ion-icon name={Opcion.Icono}></ion-icon>
          <p>{Opcion.Texto}</p>
        </button>
      ))}
    </section>
  );
}
