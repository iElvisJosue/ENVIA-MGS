import { toast } from "sonner";

export const ManejarMensajesDeRespuesta = ({ status, data: message }) => {
  switch (status) {
    case 200:
      return toast.success(message);
    case 302:
      return toast.error(message);
    case 400:
      return toast.error(message);
    case 401:
      return toast.error(message);
    case 404:
      return toast.error(message);
    case 500:
      return toast.error(message);
    default:
      return toast.error("Lo sentimos, ha ocurrido un error inesperado.");
  }
};
