import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarUltimosDiezPedidos() {
  const [ultimosDiezPedidos, setUltimosDiezPedidos] = useState([]);
  const [cargandoUltimosDiezPedidos, setCargandoUltimosDiezPedidos] =
    useState(true);
  const [buscarNuevamente, setBuscarNuevamente] = useState(false);
  const { BuscarUltimosDiezPedidos } = usePedidos();
  useEffect(() => {
    const obtenerUltimosDiezPedidos = async () => {
      try {
        const res = await BuscarUltimosDiezPedidos();
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          setUltimosDiezPedidos(res.data);
        }
        setCargandoUltimosDiezPedidos(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUltimosDiezPedidos();
  }, [buscarNuevamente]);
  return {
    ultimosDiezPedidos,
    cargandoUltimosDiezPedidos,
    buscarNuevamente,
    setBuscarNuevamente,
  };
}
