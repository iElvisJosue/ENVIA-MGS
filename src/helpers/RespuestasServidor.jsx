import { toast } from "react-toastify";

export const ManejarMensajesDeRespuesta = ({ status, data: message }) => {
  switch (status) {
    // ESTA ES PARA EXITOSO (SUCCESS)
    case 200:
      return toast.success(message, {
        theme: "colored",
      });
    // ESTA ES PARA NO INTERPRETADO (BAD REQUEST)
    case 400:
      return toast.warning(message, {
        theme: "colored",
      });
    // ESTA ES PARA NO AUTORIZADO (UNAUTHORIZED)
    case 401:
      return toast.warning(message, {
        theme: "colored",
      });
    // ESTA ES PARA DATOS NO EXISTENTES (NOT FOUND)
    case 404:
      return toast.warning(message, {
        theme: "colored",
      });
    // ESTA ES PARA DATOS EXISTENTES (CONFLICT)
    case 409:
      return toast.warning(message, {
        theme: "colored",
      });
    // ESTA ES PARA ERROR DEL SERVIDOR (INTERNAL SERVER ERROR)
    case 500:
      return toast.error(message, {
        theme: "colored",
      });
    default:
      return toast.error(
        "Lo sentimos, ha ocurrido un error inesperado, por favor vuelve a intentarlo.",
        {
          theme: "colored",
        }
      );
  }
};
