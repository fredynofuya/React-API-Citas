import axios from "axios";

const MEDICO_API_BASE_URL = "http://localhost:8080/medico";
const ESPECIALIDAD_API_BASE_URL = "http://localhost:8080/especialidad";
const CONSULTORIO_API_BASE_URL = "http://localhost:8080/consultorio";

export const crearMedico = (medico) => axios.post(MEDICO_API_BASE_URL, medico);
export const editarMedico = (id, medico) => axios.put(`${MEDICO_API_BASE_URL}/${id}`, medico);
export const cambiarEstadoMedico = (id, activo) =>
  axios.patch(`${MEDICO_API_BASE_URL}/${id}/estado`, { activo });

export const listaEspecialidades = () => axios.get(ESPECIALIDAD_API_BASE_URL);
export const listaConsultorios = () => axios.get(CONSULTORIO_API_BASE_URL);