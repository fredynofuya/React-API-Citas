import api from './axiosConfig.js';

export const listaCitas = () => api.get('/cita');
export const listaCitasConfirmada = (estado) => api.get(`/cita/estado/${estado}`);
export const deleteCita = (id) => api.delete(`/cita/${id}`);
export const editarCita = (id, cita) => api.put(`/cita/${id}`, cita);
export const crearCita = (cita) => api.post('/cita', cita);

// Para el modal de edición
export const listaMedicos = () => api.get('/medico');
export const obtenerDisponibilidad = (idMedico, fecha) =>
  api.get('/cita/disponibilidad', { params: { idMedico, fecha } });

// Para obtener la lista de citas por médico y estado:
export const listaCitasPorMedicoYEstado = (idMedico, estado) =>
  api.get(`/cita/medico/${idMedico}/estado/${estado}`);
