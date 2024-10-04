// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";

export default function usePaginacion() {
  const CantidadParaMostrar = 50;
  const [paginaParaMostrar, establecerPaginaParaMostrar] = useState(1);
  const [cantidadDePaginas, establecerCantidadDePaginas] = useState(1);
  const [indiceInicial, establecerIndiceInicial] = useState(0);
  const [indiceFinal, establecerIndiceFinal] = useState(CantidadParaMostrar);

  const MostrarVeinticincoMas = () => {
    establecerIndiceInicial(indiceInicial + CantidadParaMostrar);
    establecerIndiceFinal(indiceFinal + CantidadParaMostrar);
    establecerPaginaParaMostrar(paginaParaMostrar + 1);
  };

  const MostrarVeinticincoMenos = () => {
    establecerIndiceInicial(indiceInicial - CantidadParaMostrar);
    establecerIndiceFinal(indiceFinal - CantidadParaMostrar);
    establecerPaginaParaMostrar(paginaParaMostrar - 1);
  };

  const reiniciarValores = () => {
    establecerIndiceInicial(0);
    establecerIndiceFinal(CantidadParaMostrar);
    establecerPaginaParaMostrar(1);
  };

  return {
    CantidadParaMostrar,
    paginaParaMostrar,
    indiceInicial,
    indiceFinal,
    cantidadDePaginas,
    establecerCantidadDePaginas,
    MostrarVeinticincoMas,
    MostrarVeinticincoMenos,
    reiniciarValores,
  };
}
