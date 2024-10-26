// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../../../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import BarraDeProgresoEnvio from "./BarraDeProgresoEnvio";
import SeleccionarAgencia from "./SeleccionarAgenciaEnvio";
import InformacionDelRemitenteEnvio from "./InformacionDelRemitenteEnvio";
import InformacionDelDestinatarioEnvio from "./InformacionDelDestinatarioEnvio";
import InformacionDelEnvio from "./InformacionDelEnvio";
import DetallesDelEnvio from "./DetallesDelEnvio";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS_ENVIO } from "../../../helpers/NuevoEnvio/ListaDeProgreso";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Envios/NuevoEnvio/NuevoEnvio.css";

export default function NuevoEnvio() {
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [agencia, establecerAgencia] = useState(null);
  const [remitente, establecerRemitente] = useState(null);
  const [destinatario, establecerDestinatario] = useState(null);
  const [pedido, establecerPedido] = useState([]);
  const [detallesPedido, establecerDetallesPedido] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESOS_ENVIO[paso]);
  }, [paso]);

  const EstablecerInformacionDeLaAgencia = (agencia) => {
    toast.success(
      `¡La agencia ${agencia.NombreAgencia.toUpperCase()} ha sido seleccionada con éxito!`,
      {
        theme: "colored",
      }
    );
    establecerAgencia(agencia);
    establecerPaso(1);
  };

  const ReiniciarRealizarPedido = () => {
    establecerPaso(0);
    establecerAgencia(null);
    establecerRemitente(null);
    establecerDestinatario(null);
    establecerPedido([]);
    establecerDetallesPedido(null);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    agencia,
    establecerAgencia,
    paso,
    establecerPaso,
    remitente,
    establecerRemitente,
    destinatario,
    establecerDestinatario,
    pedido,
    establecerPedido,
    establecerProgreso,
    usuario,
    FuncionParaRealizar: EstablecerInformacionDeLaAgencia,
    detallesPedido,
    establecerDetallesPedido,
    ReiniciarRealizarPedido,
  };

  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: SeleccionarAgencia,
    1: InformacionDelRemitenteEnvio,
    2: InformacionDelDestinatarioEnvio,
    3: InformacionDelEnvio,
    4: DetallesDelEnvio,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[paso];

  return (
    <div className="NuevoEnvio">
      <BarraDeProgresoEnvio Progreso={progreso} />
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
