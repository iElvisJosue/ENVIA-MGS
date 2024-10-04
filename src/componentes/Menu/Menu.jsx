// IMPORTAMOS LAS LIBRERías A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import MenuOpciones from "./MenuOpciones";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useCerrarSesion from "../../hooks/useCerrarSesion";

// IMPORTAMOS LAS AYUDAS
import { OpcionesDelMenu } from "../../helpers/OpcionesDelMenu";
import { HOST } from "../../helpers/Urls";

// IMPORTAMOS LOS ESTILOS
import "../../estilos/componentes/Menu/Menu.css";

export default function Menu() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const { CerrandoSesion } = useCerrarSesion();
  const { usuario } = useGlobal();

  const ClaseMenu = mostrarMenu ? "Menu Activo" : "Menu";

  return (
    <aside className={ClaseMenu}>
      <span className="Menu__Encabezado">
        <img
          src="Logo-MGS.png"
          alt="Logo del menu"
          onClick={() => (window.location.href = `${HOST}Bienvenida`)}
        />
        <a href={`${HOST}Bienvenida`}>ENVIA MGS</a>
        <ion-icon
          name="close-circle"
          class="Menu__Encabezado--MostrarMenu"
          onClick={() => setMostrarMenu(false)}
        ></ion-icon>
      </span>
      <div className="Menu__Cuerpo">
        {OpcionesDelMenu[usuario.Permisos].map(
          ({ icono, nombre, url, opcionesSecundarias }, index) => (
            <MenuOpciones
              key={index}
              OpcionPrincipal={{
                icono,
                nombre,
                url,
              }}
              OpcionSecundaria={opcionesSecundarias}
            />
          )
        )}
      </div>
      <ion-icon
        name="menu"
        class="Menu__MostrarMenu"
        onClick={() => setMostrarMenu(true)}
      ></ion-icon>
      <button className="Menu__CerrarSesion" onClick={CerrandoSesion}>
        <ion-icon name="log-out"></ion-icon> Cerrar sesión
      </button>
    </aside>
  );
}
