// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

// IMPORTAMOS LAS AYUDAS
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

export default function useBuscarPedidoPorNumeroDeGuia(GuiaPedido) {
  const [informacionGuia, establecerInformacionGuia] = useState([]);
  const [buscandoInformacionGuia, establecerBuscandoInformacionGuia] =
    useState(true);

  const { BuscarPedidoPorNumeroDeGuia } = usePedidos();

  useEffect(() => {
    const obtenerInformacionGuia = async () => {
      try {
        const res = await BuscarPedidoPorNumeroDeGuia(GuiaPedido);
        if (res.response) {
          const { status, data } = res.response;
          ManejarMensajesDeRespuesta({ status, data });
        } else {
          establecerInformacionGuia(res.data);
        }
        establecerBuscandoInformacionGuia(false);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerInformacionGuia();
  }, []);

  return { informacionGuia, buscandoInformacionGuia };
}
