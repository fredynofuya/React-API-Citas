export const HORARIOS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "14:00", "14:30", "15:00"
];

export const formatearHora12 = (hora24) => {
  const [h, m] = hora24.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
};

// Fecha local en formato YYYY-MM-DD (toISOString usaría UTC y en Colombia
// después de las 7 pm devolvería el día siguiente)
export const hoyLocal = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

/**
 * Devuelve true si la hora "HH:MM" ya pasó (o está en curso) para la fecha dada.
 * Solo bloquea horas pasadas cuando la fecha seleccionada es hoy.
 * @param {string} hora  - "08:00"
 * @param {string} fecha - "2026-11-05"
 */
export const horaYaPaso = (hora, fecha) => {
  if (!fecha || fecha !== hoyLocal()) return false;
  const [hH, hM] = hora.split(':').map(Number);
  const ahora = new Date();
  const ahoraMin = ahora.getHours() * 60 + ahora.getMinutes();
  const horaMin  = hH * 60 + hM;
  return horaMin <= ahoraMin;
};