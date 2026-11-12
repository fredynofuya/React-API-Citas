import api from './axiosConfig.js';
// Función para obtener la lista de pacientes
export const listaPacientes = () => api.get('/paciente'); 
// Función para obtener un paciente por su documento
export const getPacienteByDocumento = (documento) =>
  api.get(`/paciente/documento/${documento}`);
// Función para crear un nuevo paciente
export const crearPaciente = (paciente) =>
  api.post('/paciente', paciente);
export const editarPaciente = (id, paciente) =>
  api.put(`/paciente/${id}`, paciente);
export const eliminarPaciente = (id) =>
  api.delete(`/paciente/${id}`);
