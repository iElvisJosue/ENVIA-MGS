// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import BarraDeProgreso from "../componentes/RealizarPedido/BarraDeProgreso";
import SeleccionarAgencia from "../componentes/SeleccionarAgencia";
import InformacionDelRemitente from "../componentes/RealizarPedido/InformacionDelRemitente";
import InformacionDelDestinatario from "../componentes/RealizarPedido/InformacionDelDestinatario";
import InformacionDelPedido from "../componentes/RealizarPedido/InformacionDelPedido";
import DetallesDelPedido from "../componentes/Pedidos/DetallesDelPedido";

// IMPORTAMOS LAS AYUDAS
import { LISTA_DE_PROGRESOS } from "../helpers/RealizarPedido/ListaDeProgreso";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/RealizarPedido.css";

export default function RealizarPedido() {
  const [paso, establecerPaso] = useState(0);
  const [progreso, establecerProgreso] = useState([]);
  const [agencia, establecerAgencia] = useState(null);
  const [remitente, establecerRemitente] = useState(null);
  const [destinatario, establecerDestinatario] = useState(null);
  const [pedido, establecerPedido] = useState([]);
  const [detallesPedido, establecerDetallesPedido] = useState(null);
  const { usuario } = useGlobal();

  useEffect(() => {
    establecerProgreso(LISTA_DE_PROGRESOS[paso]);
  }, [paso]);

  const EstablecerInformacionDeLaAgencia = (agencia) => {
    toast.success(
      `Agencia ${agencia.NombreAgencia.toUpperCase()} seleccionada con éxito ✨`
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
    1: InformacionDelRemitente,
    2: InformacionDelDestinatario,
    3: InformacionDelPedido,
    4: DetallesDelPedido,
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
        subseccion="Realizar pedido"
      />
      <div className="RealizarPedido">
        <BarraDeProgreso Progreso={progreso} />
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
