// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

// IMPORTAMOS LOS COMPONENTES A USAR
import ListaEnviosCompleta from "./ListaEnviosCompleta";
import ListaEnviosPorFecha from "./ListaEnviosPorFecha";
import DetallesEnvio from "./DetallesEnvio";

// IMPORTAMOS LOS ESTILOS A USAR
import "../../../estilos/componentes/Envios/ListaEnvios/ListaEnvios.css";

export default function ListaEnvios() {
  const [vista, establecerVista] = useState(0);
  const [esCompleta, establecerEsCompleta] = useState(true);
  const [detallesPedido, establecerDetallesPedido] = useState(null);

  const EstablecerLosDetallesDelPedido = (Pedido, esCompleta) => {
    establecerDetallesPedido(Pedido);
    establecerEsCompleta(esCompleta);
    establecerVista(2);
  };

  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    esCompleta,
    establecerVista,
    detallesPedido,
    establecerDetallesPedido,
    EstablecerLosDetallesDelPedido,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaEnviosCompleta,
    1: ListaEnviosPorFecha,
    2: DetallesEnvio,
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    <div className="ListaEnvios">
      {vista < 2 && (
        <span className="ListaEnvios__Opciones">
          {vista === 0 ? (
            <button
              type="button"
              className="ListaEnvios__Opciones--Boton BuscarPorFecha"
              onClick={() => establecerVista(1)}
            >
              <ion-icon name="calendar"></ion-icon>
            </button>
          ) : (
            <button
              type="button"
              className="ListaEnvios__Opciones--Boton ListaCompleta"
              onClick={() => establecerVista(0)}
            >
              <ion-icon name="list"></ion-icon>
            </button>
          )}
        </span>
      )}
      <ComponenteParaRenderizar {...valoresParaLosComponentes} />
    </div>
  );
}
