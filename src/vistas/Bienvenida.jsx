// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORTAMOS LOS COMPONENTES A USAR
import Menu from "../componentes/Menu/Menu";
import Encabezado from "../componentes/Encabezado";
import Cargando from "../componentes/Cargando";

// IMPORTAMOS LOS CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// IMPORTAMOS LOS HOOKS A USAR
import useBuscarUltimosDiezPedidos from "../hooks/useBuscarUltimosDiezPedidos";

// IMPORTAMOS LAS AYUDAS
import { HOST } from "../helpers/Urls";
import { ObtenerFechaActual } from "../helpers/FuncionesGenerales";
import { toastConfig } from "../helpers/ToastProps";

// IMPORTAMOS LOS ESTILOS A USAR
import "../estilos/vistas/Bienvenida.css";

export default function Bienvenida() {
  const { usuario } = useGlobal();
  const [pedidosHechosHoy, setPedidosHechosHoy] = useState(0);
  const {
    cargandoUltimosDiezPedidos,
    ultimosDiezPedidos,
    buscarNuevamente,
    setBuscarNuevamente,
  } = useBuscarUltimosDiezPedidos();

  useEffect(() => {
    if (ultimosDiezPedidos) {
      const FechaDeHoy = ObtenerFechaActual();
      const pedidosPorFiltroDeHoy = ultimosDiezPedidos.filter(
        ({ FechaCreacionPedido }) => {
          return FechaCreacionPedido.slice(0, 10) === FechaDeHoy;
        }
      );
      setPedidosHechosHoy(pedidosPorFiltroDeHoy.length);
    }
  }, [ultimosDiezPedidos]);

  if (cargandoUltimosDiezPedidos) return <Cargando />;

  const IconosPerfil = {
    Administrador: <ion-icon name="shield-checkmark"></ion-icon>,
    Moderador: <ion-icon name="glasses"></ion-icon>,
    Usuario: <ion-icon name="person-circle"></ion-icon>,
  };

  setTimeout(() => {
    setBuscarNuevamente(!buscarNuevamente);
  }, 5000);

  return (
    // LOS ESTILOS DEL MAIN ESTÁN EN INDEX.CSS
    <main className="Main">
      <Menu />
      <Encabezado icono="sparkles" seccion="Bienvenido" />
      <div className="Bienvenida">
        <section className="Bienvenida__Mensaje">
          <img src="Logo-MGS.png" alt="Logo MGS" />
          <p>¡Bienvenido al sistema de ENVIA MGS!</p>
          <p>Gestiona tus envíos de paquetería de manera rápida y sencilla.</p>
          <p>¡Comienza ahora a rastrear y administrar tus paquetes!</p>
        </section>
        <section className="Bienvenida__Perfil">
          <span className="Bienvenida__Perfil--Encabezado">
            <p>perfil</p>
            <ion-icon name="open"></ion-icon>
          </span>
          <picture className="Bienvenida__Perfil--Icono">
            <img
              src="https://img.freepik.com/fotos-premium/icono-plano-aislado-fondo_1258715-220771.jpg"
              alt=""
            />
          </picture>
          <p className="Bienvenida__Perfil--Nombre">{usuario.Usuario}</p>
          {IconosPerfil[usuario.Permisos]}
          <small className="Bienvenida__Perfil--Permisos">
            {usuario.Permisos}
          </small>
        </section>
        <section className="Bienvenida__TotalDePedidosHechosHoy">
          <span className="Bienvenida__TotalDePedidosHechosHoy--Texto">
            <p>Pedidos hechos hoy</p>
            <small>{ObtenerFechaActual().split("-").reverse().join("/")}</small>
          </span>
          <div className="Bienvenida__TotalDePedidosHechosHoy--Cantidad">
            <p>{pedidosHechosHoy}</p>
          </div>
        </section>
        <section className="EspacioTres">
          <h1>Espacio 3</h1>
        </section>
        <section className="Bienvenida__UltimasGuias">
          <ul className="Bienvenida__UltimasGuias--Encabezado">
            <p>Últimos pedidos</p>
            <button
              onClick={() => (window.location.href = `${HOST}Realizar-Pedido`)}
              title="Ver todos los pedidos"
            >
              <ion-icon name="add"></ion-icon>
            </button>
          </ul>
          {ultimosDiezPedidos.length > 0 ? (
            ultimosDiezPedidos.map(
              (
                {
                  // CodigoRastreo
                  GuiaPedido,
                  NombreAgencia,
                  FechaCreacionPedido,
                  HoraCreacionPedido,
                },
                index
              ) => (
                <li className="Bienvenida__UltimasGuias--Cuerpo" key={index}>
                  <span>
                    <ion-icon name="document-text"></ion-icon>
                    {GuiaPedido}
                  </span>
                  <span>
                    <ion-icon name="business"></ion-icon>
                    {NombreAgencia}
                  </span>
                  <span>
                    <ion-icon name="calendar"></ion-icon>
                    {FechaCreacionPedido.slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}{" "}
                    - {HoraCreacionPedido}
                  </span>
                </li>
              )
            )
          ) : (
            <div className="Bienvenida__UltimasGuias--Cuerpo SinResultados">
              <img src="SinResultados.png" alt="No hay resultados" />
              <small>¡Oops! Parece que más no tienes pedidos realizados.</small>
              <a href={`${HOST}Realizar-Pedido`}>Realizar pedido</a>
            </div>
          )}
        </section>
      </div>
      <ToastContainer {...toastConfig} />
    </main>
  );
}
