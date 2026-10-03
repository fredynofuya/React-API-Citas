// Helpers genéricos reutilizados por las tablas administrativas
// (Dashboard, Agenda, Pacientes, Médicos). No tienen nada específico
// de citas/pacientes/médicos — por eso viven aquí y no en cada componente.

export const normalizar = (v) =>
    String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export const paginasVisibles = (actual, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const nums = [...new Set([1, total, actual - 1, actual, actual + 1])]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b);
    const out = [];
    nums.forEach((n, i) => {
        if (i > 0 && n - nums[i - 1] > 1) out.push(`gap-${n}`);
        out.push(n);
    });
    return out;
};