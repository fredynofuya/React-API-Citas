import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/cita";

export const listaCitas = () => axios.get(REST_API_BASE_URL);
export const deleteCita = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
export const editarCita = (id, cita) => axios.put(`${REST_API_BASE_URL}/${id}`, cita);
