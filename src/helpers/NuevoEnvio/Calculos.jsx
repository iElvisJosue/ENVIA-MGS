export const CalcularCostoSobrePeso = (Peso, PesoSinCobro, LibraExtra) => {
  if (Peso > PesoSinCobro) {
    return (Peso - PesoSinCobro) * LibraExtra;
  }
  return 0;
};

export const CalcularCostoDelEnvio = (
  PesoProducto,
  ValorProducto,
  PesoSinCobro,
  LibraExtra
) => {
  if (PesoProducto > PesoSinCobro) {
    const totalLibraExtra = (PesoProducto - PesoSinCobro) * LibraExtra;
    return totalLibraExtra + ValorProducto;
  }
  return ValorProducto;
};

export const CalcularCostoSeguro = (ValorAsegurado, porcentajeCarga) => {
  return (ValorAsegurado / 100) * porcentajeCarga;
};

export const CalcularTotalPedido = (pedido) => {
  const total = pedido.reduce(
    (acumulador, item) =>
      acumulador + item.CostoSobrePeso + item.CostoSeguro + item.CostoEnvio,
    0
  );

  return total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const CalcularTotalProducto = (
  CostoSobrePeso,
  CostoSeguro,
  CostoEnvio
) => {
  return CostoSobrePeso + CostoSeguro + CostoEnvio;
};
export const CalcularIdUnico = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
