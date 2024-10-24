// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";
import MensajeGeneral from "../componentes/MensajeGeneral";
import BarraDeProgreso from "../componentes/RealizarOrden/BarraDeProgreso";
import InformacionDelRemitente from "../componentes/RealizarOrden/InformacionDelRemitente";
import InformacionDeLaCaja from "../componentes/RealizarOrden/InformacionDeLaCaja";
import DetallesDeLaOrden from "../componentes/Ordenes/DetallesDeLaOrden";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerAgenciaMGS from "../hooks/useObtenerAgenciaMGS";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS } from "../helpers/RealizarOrden/ListaDeProgreso";
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RealizarOrden.css";

export default function RealizarOrden() {
  const { agenciaMGS, cargandoAgenciaMGS } = useObtenerAgenciaMGS();
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [orden, establecerOrden] = useState([]);
  const [remitente, establecerRemitente] = useState(null);
  const [detallesOrden, establecerDetallesOrden] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESOS[paso]);
  }, [paso]);

  const ReiniciarRealizarPedido = () => {
    establecerPaso(0);
    establecerRemitente(null);
    establecerOrden([]);
    establecerDetallesOrden(null);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    idAgencia: agenciaMGS?.idAgencia,
    NombreAgencia: agenciaMGS?.NombreAgencia,
    paso,
    establecerPaso,
    remitente,
    establecerRemitente,
    establecerProgreso,
    usuario,
    orden,
    establecerOrden,
    ReiniciarRealizarPedido,
    detallesOrden,
    establecerDetallesOrden,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: InformacionDelRemitente,
    1: InformacionDeLaCaja,
    2: DetallesDeLaOrden,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  if (cargandoAgenciaMGS) return <Cargando />;

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion="Paquetería"
        subseccion="Realizar orden"
      />
      <div className="RealizarOrden">
        {agenciaMGS ? (
          <>
            <BarraDeProgreso Progreso={progreso} />
            <ComponenteParaRenderizar {...valoresParaLosComponentes} />
          </>
        ) : (
          <MensajeGeneral
            Imagen={"SinResultados.png"}
            Texto={"¡Oops! No se encontraron resultados."}
          />
        )}
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
