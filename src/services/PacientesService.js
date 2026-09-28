import axios from "axios";
const PACIENTE_API_BASE_URL = "http://localhost:8080/paciente";
export const listaPacientes = () => axios.get(PACIENTE_API_BASE_URL); 