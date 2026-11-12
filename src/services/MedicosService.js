import api from './axiosConfig.js';

export const crearMedico = (medico) => api.post('/medico', medico);
export const editarMedico = (id, medico) => api.put(`/medico/${id}`, medico);
export const cambiarEstadoMedico = (id, activo) =>
  api.patch(`/medico/${id}/estado`, { activo });

export const listaEspecialidades = () => api.get('/especialidad');
export const listaConsultorios = () => api.get('/consultorio');
