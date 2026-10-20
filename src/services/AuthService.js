import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/auth';

export const login = (email, password) =>
  axios.post(`${REST_API_BASE_URL}/login`, { email, password });

export const obtenerUsuarioActual = () =>
  axios.get(`${REST_API_BASE_URL}/me`);

export const guardarSesion = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('usuario', JSON.stringify({
    id: data.id, nombre: data.nombre, email: data.email, rol: data.rol, idMedico: data.idMedico
  }));
};

export const cerrarSesion = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
};

export const cambiarPassword = (passwordActual, passwordNueva) =>
  axios.put(`${REST_API_BASE_URL}/password`, { passwordActual, passwordNueva });

export const solicitarRecuperacion = (email) =>
  axios.post(`${REST_API_BASE_URL}/recuperar/solicitar`, { email });

export const validarTokenRecuperacion = (token) =>
  axios.post(`${REST_API_BASE_URL}/recuperar/validar`, { token });

export const restablecerPassword = (token, passwordNueva) =>
  axios.post(`${REST_API_BASE_URL}/recuperar/restablecer`, { token, passwordNueva });

export const hayTokenGuardado = () => !!localStorage.getItem('token');