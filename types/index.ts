export type EstadoTurno = 'work' | 'free';

export interface RegistroHistorial {
  id: string;
  fecha: string;
  diff: number;
  diffFirmado: number;
  estado: EstadoTurno;
  estadoTexto: string;
  diaSemana: string;
}

export interface ResultadoCalculo {
  fechaCorta: string;
  fechaLarga: string;
  diff: number;
  diffFirmado: number;
  estado: EstadoTurno;
  estadoTexto: string;
  estadoDesc: string;
  diaSemana: string;
  relativo: string;
}
