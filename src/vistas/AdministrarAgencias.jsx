// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { Toaster } from "sonner";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import ListaDeAgencias from "../componentes/AdministrarAgencias/ListaDeAgencias";
import AdministrarProductosDeLaAgencia from "../componentes/AdministrarAgencias/AdministrarProductosDeLaAgencia";
import EditarAgencia from "../componentes/AdministrarAgencias/EditarAgencia";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/AdministrarAgencias.css";

export default function AdministrarAgencias() {
  const [informacionDeLaAgencia, establecerInformacionDeLaAgencia] =
    useState(null);

  const [vista, establecerVista] = useState(0);
  // ESTOS SON LOS PROPS COMPARTIDOS PARA TODOS LOS COMPONENTES
  const valoresParaLosComponentes = {
    vista,
    establecerVista,
    informacionDeLaAgencia,
    establecerInformacionDeLaAgencia,
  };
  // ESTA ES LA LISTA DE LOS COMPONENTES PARA ESTA VISTA
  const componentesParaMostrar = {
    0: ListaDeAgencias,
    1: AdministrarProductosDeLaAgencia,
    2: EditarAgencia,
  };

  const TituloSubseccion = {
    0: "Administrar Agencias",
    1: "Administrar Agencias / Administrar Productos",
    2: "Administrar Agencias / Editar Agencia",
  };

  // ESTE ES EL COMPONENTE QUE MOSTRAREMOS
  const ComponenteParaRenderizar = componentesParaMostrar[vista];

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado
        icono="business"
        seccion="Agencias"
        subseccion={TituloSubseccion[vista]}
      />
      <div className="AdministrarAgencias">
        <ComponenteParaRenderizar {...valoresParaLosComponentes} />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
