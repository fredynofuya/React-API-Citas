import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/cita";
const MEDICO_API_BASE_URL = "http://localhost:8080/medico";


export const listaCitas = () => axios.get(REST_API_BASE_URL);
export const listaCitasConfirmada = (estado) => axios.get(`${REST_API_BASE_URL}/estado/${estado}`);
export const deleteCita = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
export const editarCita = (id, cita) => axios.put(`${REST_API_BASE_URL}/${id}`, cita);
export const crearCita = (cita) => axios.post(REST_API_BASE_URL, cita);

// Para el modal de edición
export const listaMedicos = () => axios.get(MEDICO_API_BASE_URL);
export const obtenerDisponibilidad = (idMedico, fecha) =>
  axios.get(`${REST_API_BASE_URL}/disponibilidad`, { params: { idMedico, fecha } });

// Para obtener la lista de citas por médico y estado:
export const listaCitasPorMedicoYEstado = (idMedico, estado) =>
  axios.get(`${REST_API_BASE_URL}/medico/${idMedico}/estado/${estado}`);