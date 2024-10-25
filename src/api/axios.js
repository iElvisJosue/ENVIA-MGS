import axios from "axios";

const instance = axios.create({
  // UTILIZAR CUANDO ESTE EN PRODUCCIÓN
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://enviamgs.ideasdistintas.net:5000/api",
  withCredentials: true,
});

export default instance;
