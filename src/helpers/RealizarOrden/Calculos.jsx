export const CalcularTotalDeLaOrden = (orden) => {
  const total = orden.reduce(
    (acumulador, item) => acumulador + Number(item.TotalProducto),
    0
  );

  return total;
};
export const CrearIDUnico = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const CalcularTotalProducto = (CostoCaja = 0, Cantidad = 0) => {
  return Number(CostoCaja) * Number(Cantidad);
};
