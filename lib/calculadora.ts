import type { EstadoTurno, ResultadoCalculo } from '@/types';

export const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];
export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function toFechaCorta(dt: Date): string {
  return `${pad(dt.getDate())}-${pad(dt.getMonth() + 1)}-${dt.getFullYear()}`;
}

export function toFechaLarga(dt: Date): string {
  return `${DIAS[dt.getDay()]}, ${dt.getDate()} de ${MESES[dt.getMonth()]} de ${dt.getFullYear()}`;
}

export function parseFecha(raw: string): Date | null {
  if (!raw) return null;
  const s = raw.trim();

  let dd: number, mm: number, yyyy: number;

  const sep = s.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{2,4})$/);
  if (sep) {
    dd = +sep[1]; mm = +sep[2]; yyyy = +sep[3];
  } else {
    const digits = s.replace(/\D/g, '');
    if (digits.length === 8) {
      dd = +digits.slice(0, 2); mm = +digits.slice(2, 4); yyyy = +digits.slice(4, 8);
    } else if (digits.length === 6) {
      dd = +digits.slice(0, 2); mm = +digits.slice(2, 4); yyyy = +digits.slice(4, 6);
    } else {
      return null;
    }
  }

  if (yyyy < 100) yyyy += 2000;
  if (mm < 1 || mm > 12) return null;
  if (dd < 1 || dd > 31) return null;

  const dt = new Date(yyyy, mm - 1, dd);
  if (dt.getFullYear() !== yyyy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return null;
  return dt;
}

export function diffDias(a: Date, b: Date): number {
  const MS = 24 * 60 * 60 * 1000;
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / MS);
}

export function calcular(fecha: Date, estadoHoy: EstadoTurno, today: Date): ResultadoCalculo {
  const diffFirmado = diffDias(today, fecha);
  const diff = Math.abs(diffFirmado);

  const estado: EstadoTurno =
    diff % 2 === 0 ? estadoHoy : estadoHoy === 'work' ? 'free' : 'work';
  const esTrabajo = estado === 'work';

  let relativo: string;
  if (diffFirmado === 0) relativo = 'Es la fecha actual';
  else if (diffFirmado > 0) relativo = `dentro de ${diff} día${diff === 1 ? '' : 's'}`;
  else relativo = `hace ${diff} día${diff === 1 ? '' : 's'}`;

  return {
    fechaCorta: toFechaCorta(fecha),
    fechaLarga: toFechaLarga(fecha),
    diff,
    diffFirmado,
    estado,
    estadoTexto: esTrabajo ? 'Trabajando' : 'Libre',
    estadoDesc: esTrabajo ? 'Día de servicio' : 'Día de descanso',
    diaSemana: DIAS[fecha.getDay()],
    relativo,
  };
}
