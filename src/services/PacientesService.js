import axios from "axios";
// URL base para las operaciones relacionadas con pacientes
const REST_API_BASE_URL = "http://localhost:8080/paciente";
// Función para obtener la lista de pacientes
export const listaPacientes = () => axios.get(REST_API_BASE_URL); 
// Función para obtener un paciente por su documento
export const getPacienteByDocumento = (documento) =>
  axios.get(`${REST_API_BASE_URL}/documento/${documento}`);
// Función para crear un nuevo paciente
export const crearPaciente = (paciente) =>
  axios.post(REST_API_BASE_URL, paciente);
export const editarPaciente = (id, paciente) =>
  axios.put(`${REST_API_BASE_URL}/${id}`, paciente);
export const eliminarPaciente = (id) =>
  axios.delete(`${REST_API_BASE_URL}/${id}`);