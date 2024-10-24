// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CONTEXTOS A USAR
import { useGlobal } from "../context/GlobalContext";

// HOOKS A USAR
import useContraseña from "../hooks/useContraseña";

// AYUDAS A USAR
import { IniciarSesionCampos } from "../helpers/IniciarSesion";
import { ManejarMensajesDeRespuesta } from "../helpers/RespuestasServidor";

// ESTILOS A USAR
import "../estilos/vistas/IniciarSesion.css";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const { IniciarSesion } = useGlobal();
  const { iconoDeContraseña } = useContraseña();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const ManejarRespuestaExitosa = (res) => {
    toast.success(
      `¡Sesión iniciada, Bienvenido ${res.Usuario.toUpperCase()}!`,
      {
        theme: "colored",
      }
    );
    setTimeout(() => navigate("/Bienvenida"), 1000);
  };

  const verificarInicioDeSesion = handleSubmit(async (data) => {
    try {
      const res = await IniciarSesion(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarMensajesDeRespuesta({ status, data });
      } else {
        ManejarRespuestaExitosa(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarMensajesDeRespuesta({ status, data });
    }
  });

  return (
    <main className="IniciarSesion">
      <form onSubmit={verificarInicioDeSesion} className="IniciarSesion__Form">
        <img
          src="Logo-MGS.png"
          alt="MGS Logo"
          className="IniciarSesion__Form--Img"
        />
        <h2 className="IniciarSesion__Form--Title">
          ¡Bienvenido a ENVIA MGS 📦!
        </h2>
        {/* <hr className="IniciarSesion__Form--Divisor" /> */}
        {IniciarSesionCampos.map(
          ({
            iconoCampo,
            tipoCampo,
            nombreCampo,
            placeholderCampo,
            mensajeCampo,
            segundoIconoCampo = false,
          }) => (
            <>
              <div className="IniciarSesion__Form--ContenedorCampos">
                <span className="IniciarSesion__Form--ContenedorCampos--Icono">
                  <ion-icon name={iconoCampo}></ion-icon>
                </span>

                {segundoIconoCampo && iconoDeContraseña}
                {tipoCampo === "text" ? (
                  <input
                    type={tipoCampo}
                    {...register(nombreCampo, { required: true })}
                    className="IniciarSesion__Form--ContenedorCampos--Texto"
                    placeholder={placeholderCampo}
                  />
                ) : (
                  <input
                    type={tipoCampo}
                    {...register(nombreCampo, { required: true })}
                    className="IniciarSesion__Form--ContenedorCampos--Texto"
                    placeholder={placeholderCampo}
                    id="password"
                  />
                )}
              </div>
              {errors[nombreCampo] && (
                <small className="IniciarSesion__Form--MensajeError">
                  {mensajeCampo}
                </small>
              )}
            </>
          )
        )}
        <button type="submit" className="IniciarSesion__Form--BotonEnviar">
          Iniciar Sesión <ion-icon name="log-in"></ion-icon>
        </button>
      </form>
      <ToastContainer limit={2} transition={Zoom} draggable stacked />
    </main>
  );
}
