// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { usePedidos } from "../context/PedidosContext";

export default function useBuscarPedidoPorNumeroDeGuia(GuiaPedido) {
  const [informacionGuia, establecerInformacionGuia] = useState(null);
  const [buscandoInformacionGuia, establecerBuscandoInformacionGuia] =
    useState(true);

  const { BuscarPedidoPorNumeroDeGuia } = usePedidos();

  useEffect(() => {
    const obtenerInformacionGuia = async () => {
      try {
        const res = await BuscarPedidoPorNumeroDeGuia(GuiaPedido);
        establecerInformacionGuia(res.data);
        establecerBuscandoInformacionGuia(false);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerInformacionGuia();
  }, []);

  return { informacionGuia, buscandoInformacionGuia };
}
