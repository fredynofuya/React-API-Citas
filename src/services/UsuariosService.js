import api from './axiosConfig.js';

export const listaUsuarios = () => api.get('/usuario');
export const crearUsuario = (usuario) => api.post('/usuario', usuario);
export const editarUsuario = (id, usuario) => api.put(`/usuario/${id}`, usuario);
export const cambiarEstadoUsuario = (id, activo) =>
  api.patch(`/usuario/${id}/estado`, { activo });
