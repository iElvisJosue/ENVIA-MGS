// LIBRERÍAS A USAR
import { toast } from "sonner";
import Cookies from "js-cookie";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

export default function useCerrarSesion() {
  const { CerrarSesion } = useGlobal();

  const NOMBRE_COOKIE = "TokenDeAcceso";

  const CerrandoSesion = (e) => {
    e.preventDefault();
    const promesaCerrandoSesion = new Promise(() => {
      setTimeout(() => {
        CerrarSesion();
        Cookies.remove(NOMBRE_COOKIE);
        return;
      }, 1500);
    });

    toast.promise(promesaCerrandoSesion, {
      loading: "Cerrando sesión, por favor espere... ⌛",
    });
  };

  return { CerrandoSesion };
}
