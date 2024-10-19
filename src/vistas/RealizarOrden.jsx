// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
// import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import BarraDeProgreso from "../componentes/RealizarOrden/BarraDeProgreso";
import InformacionDelRemitente from "../componentes/RealizarOrden/InformacionDelRemitente";
import InformacionDeLaCaja from "../componentes/RealizarOrden/InformacionDeLaCaja";

// IMPORTAMOS LOS HOOKS A USAR
import useObtenerAgenciaMGS from "../hooks/useObtenerAgenciaMGS";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS } from "../helpers/RealizarOrden/ListaDeProgreso";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RealizarOrden.css";

export default function RealizarOrden() {
  const { agenciaMGS } = useObtenerAgenciaMGS();
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [orden, establecerOrden] = useState([]);
  const [remitente, establecerRemitente] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESOS[paso]);
  }, [paso]);

  const ReiniciarRealizarPedido = () => {
    establecerPaso(0);
    establecerRemitente(null);
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
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: InformacionDelRemitente,
    1: InformacionDeLaCaja,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

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
        <BarraDeProgreso Progreso={progreso} />
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
