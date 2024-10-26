// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../../componentes/Cargando";
import MensajeGeneral from "../../../componentes/MensajeGeneral";
import BarraDeProgresoOrden from "./BarraDeProgresoOrden";
import InformacionDelRemitenteOrden from "./InformacionDelRemitenteOrden";
import InformacionDeLaCajaOrden from "./InformacionDeLaCajaOrden";
import DetallesDeLaOrden from "./DetallesDeLaOrden";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerAgenciaMGS from "../../../hooks/useObtenerAgenciaMGS";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESO_ORDEN } from "../../../helpers/NuevaOrden/ListaDeProgresoOrden";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Ordenes/NuevaOrden/NuevaOrden.css";

export default function NuevaOrden() {
  const { agenciaMGS, cargandoAgenciaMGS } = useObtenerAgenciaMGS();
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [orden, establecerOrden] = useState([]);
  const [remitente, establecerRemitente] = useState(null);
  const [detallesOrden, establecerDetallesOrden] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESO_ORDEN[paso]);
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
    0: InformacionDelRemitenteOrden,
    1: InformacionDeLaCajaOrden,
    2: DetallesDeLaOrden,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  if (cargandoAgenciaMGS) return <Cargando />;

  return (
    <div className="NuevaOrden">
      {agenciaMGS ? (
        <>
          <BarraDeProgresoOrden Progreso={progreso} />
          <ComponenteParaRenderizar {...valoresParaLosComponentes} />
        </>
      ) : (
        <MensajeGeneral
          Imagen={"SinResultados.png"}
          Texto={"¡Oops! No se encontraron resultados."}
        />
      )}
    </div>
  );
}
