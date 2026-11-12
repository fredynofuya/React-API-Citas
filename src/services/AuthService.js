import api from './axiosConfig.js';

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const obtenerUsuarioActual = () =>
  api.get('/auth/me');

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
  api.put('/auth/password', { passwordActual, passwordNueva });

export const solicitarRecuperacion = (email) =>
  api.post('/auth/recuperar/solicitar', { email });

export const validarTokenRecuperacion = (token) =>
  api.post('/auth/recuperar/validar', { token });

export const restablecerPassword = (token, passwordNueva) =>
  api.post('/auth/recuperar/restablecer', { token, passwordNueva });

export const hayTokenGuardado = () => !!localStorage.getItem('token');
