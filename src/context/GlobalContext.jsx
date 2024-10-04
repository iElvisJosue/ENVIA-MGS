import { createContext, useState, useContext, useEffect } from "react";
import {
  SolicitudIniciarSesion,
  SolicitudVerificarToken,
  SolicitudCerrarSesion,
} from "../api/authGlobal";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debería ser usado dentro de Proveedor global");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const ProveedorGlobal = ({ children }) => {
  const [usuario, establecerUsuario] = useState(null);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [cargando, establecerCargando] = useState(true);
  const setError = () => {
    establecerUsuario(null);
    establecerTieneCookie(false);
    establecerCargando(false);
  };
  const setSuccess = (res) => {
    establecerUsuario(res);
    establecerCargando(false);
    establecerTieneCookie(true);
    return res;
  };
  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function ValidarCookie() {
      const cookies = Cookies.get();
      if (!cookies.TokenDeAcceso) {
        console.log("NO HAY COOKIE :(");
        setError();
        return;
      }
      try {
        const res = await SolicitudVerificarToken({
          cookie: cookies.TokenDeAcceso,
        });
        if (!res.data) {
          setError();
          return;
        } else {
          setSuccess(res.data);
          return;
        }
      } catch (error) {
        console.log(error);
        setError();
        return;
      }
    }
    ValidarCookie();
  }, []);

  const IniciarSesion = async (data) => {
    try {
      const res = await SolicitudIniciarSesion(data);
      if (!res.data) {
        return setError();
      }
      Cookies.set("TokenDeAcceso", res.data.TokenDeAcceso, {
        expires: 1,
      });
      return setSuccess(res.data);
    } catch (error) {
      setError();
      return error;
    }
  };

  const CerrarSesion = async () => {
    await SolicitudCerrarSesion();
    return setError();
  };

  return (
    <GlobalContext.Provider
      value={{
        usuario,
        cargando,
        tieneCookie,
        IniciarSesion,
        CerrarSesion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
