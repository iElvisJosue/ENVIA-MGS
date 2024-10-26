// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorGlobal } from "./context/GlobalContext";
import { ProveedorAgencias } from "./context/AgenciasContext";
import { ProveedorPedidos } from "./context/PedidosContext";
import { ProveedorProductos } from "./context/ProductosContext";
import { ProveedorUsuarios } from "./context/UsuariosContext";
import { ProveedorConfiguracion } from "./context/ConfiguracionContext";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./vistas/IniciarSesion";
import Bienvenida from "./vistas/Bienvenida";
import Envios from "./vistas/Envios";
import Ordenes from "./vistas/Ordenes";
import Agencias from "./vistas/Agencias";
import Productos from "./vistas/Productos";
import Usuarios from "./vistas/Usuarios";
import NumeroDeGuia from "./vistas/NumeroDeGuia";

// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./proteccion/ProteccionPorCookies";
import ProteccionParaAdministradores from "./proteccion/ProteccionParaAdministradores";

export default function App() {
  return (
    <ProveedorGlobal>
      <ProveedorConfiguracion>
        <ProveedorAgencias>
          <ProveedorUsuarios>
            <ProveedorPedidos>
              <ProveedorProductos>
                <BrowserRouter>
                  <Routes>
                    {/* RUTAS SIN PROTECCIÓN */}
                    <Route path="/" element={<IniciarSesion />} />
                    {/* TERMINAN LAS RUTAS SIN PROTECCIÓN */}
                    <Route
                      path="/NumeroDeGuia/:GuiaPedido"
                      element={<NumeroDeGuia />}
                    />
                    {/* RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                    <Route element={<ProteccionPorCookies />}>
                      {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                      <Route element={<ProteccionParaAdministradores />}>
                        {/* RUTAS DE AGENCIAS */}
                        <Route path="/Agencias" element={<Agencias />} />
                        {/* RUTAS DE USUARIOS */}
                        <Route path="/Usuarios" element={<Usuarios />} />
                        {/* RUTAS DE PRODUCTOS */}
                        <Route path="/Productos" element={<Productos />} />
                      </Route>
                      {/* TERMINAN LAS RUTAS PROTEGIDAS PARA ADMINISTRADORES */}
                      {/* RUTAS DE PAQUETERÍA */}
                      <Route path="/Envios" element={<Envios />} />
                      <Route path="/Ordenes" element={<Ordenes />} />
                      {/* RUTAS DE BIENVENIDA */}
                      <Route path="/Bienvenida" element={<Bienvenida />} />
                    </Route>
                  </Routes>
                  {/* TERMINAN LAS RUTAS PROTEGIDAS PARA USUARIOS LOGUEADOS */}
                </BrowserRouter>
              </ProveedorProductos>
            </ProveedorPedidos>
          </ProveedorUsuarios>
        </ProveedorAgencias>
      </ProveedorConfiguracion>
    </ProveedorGlobal>
  );
}
