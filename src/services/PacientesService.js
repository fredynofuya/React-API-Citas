import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/paciente";
export const listaPacientes = () => axios.get(REST_API_BASE_URL); 

export const getPacienteByDocumento = (documento) =>
  axios.get(`${REST_API_BASE_URL}/documento/${documento}`);
export const crearPaciente = (paciente) =>
  axios.post(REST_API_BASE_URL, paciente);
// export const editarPaciente = (id, paciente) =>
//   axios.put(`${REST_API_BASE_URL}/${id}`, paciente);
// export const eliminarPaciente = (id) =>
//   axios.delete(`${REST_API_BASE_URL}/${id}`);