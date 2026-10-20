// Devuelve el mensaje que envía el backend, o uno por defecto si no hay.
export const mensajeError = (err, porDefecto) => {
  const data = err?.response?.data;
  if (data && typeof data === 'object' && typeof data.message === 'string' && data.message) {
    return data.message;
  }
  if (typeof data === 'string' && data && data.length <= 200) return data;
  return porDefecto;
};