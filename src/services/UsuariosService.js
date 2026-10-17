import axios from "axios";

const USUARIO_API_BASE_URL = "http://localhost:8080/usuario";

export const listaUsuarios = () => axios.get(USUARIO_API_BASE_URL);
export const crearUsuario = (usuario) => axios.post(USUARIO_API_BASE_URL, usuario);
export const editarUsuario = (id, usuario) => axios.put(`${USUARIO_API_BASE_URL}/${id}`, usuario);
export const cambiarEstadoUsuario = (id, activo) =>
  axios.patch(`${USUARIO_API_BASE_URL}/${id}/estado`, { activo });