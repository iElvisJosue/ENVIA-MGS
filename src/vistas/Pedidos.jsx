// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDePedidos from "../componentes/Pedidos/ListaDePedidos";
import DetallesDelPedido from "../componentes/Pedidos/DetallesDelPedido";

// IMPORTAMOS LAS AYUDAS
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Pedidos.css";

export default function Pedidos() {
  const [vista, establecerVista] = useState(0);
  const [detallesPedido, establecerDetallesPedido] = useState(null);

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    establecerVista,
    detallesPedido,
    establecerDetallesPedido,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDePedidos,
    1: DetallesDelPedido,
  };

  const TituloSeccion = vista === 0 ? "Paquetería" : "Paquetería / Pedidos";
  const TituloSubsección = vista === 0 ? "Pedidos" : "Detalles del pedido";

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="storefront"
        seccion={TituloSeccion}
        subseccion={TituloSubsección}
      />
      <div className="Pedidos">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
