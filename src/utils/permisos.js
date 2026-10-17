// Fuente única de verdad de qué puede hacer cada rol en la interfaz.
// OJO: esto es solo experiencia de usuario. La seguridad real vive en el backend.
const BASE_ADMIN = [
  'citas:ver', 'citas:gestionar',
  'agenda:ver',
  'pacientes:ver', 'pacientes:gestionar',
  'medicos:ver', 'medicos:gestionar',
];

export const PERMISOS = {
  SUPER_ADMIN: [...BASE_ADMIN, 'usuarios:ver', 'usuarios:gestionar'],
  ADMIN: BASE_ADMIN,
  MEDICO: ['agenda:ver', 'pacientes:ver'],
};

export const ETIQUETAS_ROL = {
  SUPER_ADMIN: 'SuperAdmin',
  ADMIN: 'Admin',
  MEDICO: 'Médico',
};

export const tienePermiso = (rol, permiso) => PERMISOS[rol]?.includes(permiso) ?? false;

export const rutaInicial = (rol) =>
  tienePermiso(rol, 'citas:ver') ? '/dashboard/citas' : '/dashboard/agenda';
