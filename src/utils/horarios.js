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