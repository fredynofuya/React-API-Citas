// Fuente única de verdad de qué puede hacer cada rol en la interfaz.
// OJO: esto es solo experiencia de usuario. La seguridad real vive en el backend.
export const PERMISOS = {
  ADMIN: [
    'citas:ver', 'citas:gestionar',
    'agenda:ver',
    'pacientes:ver', 'pacientes:gestionar',
    'medicos:ver', 'medicos:gestionar',
  ],
  MEDICO: [
    'agenda:ver',
    'pacientes:ver',
  ],
};

export const tienePermiso = (rol, permiso) => PERMISOS[rol]?.includes(permiso) ?? false;

// Primera pantalla según lo que el rol puede ver (evita mandar a alguien a una ruta prohibida).
export const rutaInicial = (rol) =>
  tienePermiso(rol, 'citas:ver') ? '/dashboard/citas' : '/dashboard/agenda';