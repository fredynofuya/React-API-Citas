import axios from "axios";
const REST_API_BASE_URL = "http://localhost:8080/paciente";

export const listaPacientes = () => axios.get(REST_API_BASE_URL);
