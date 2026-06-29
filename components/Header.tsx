import { toFechaCorta } from '@/lib/calculadora';

interface Props {
  today: Date | null;
}

export default function Header({ today }: Props) {
  return (
    <header className="flex items-end justify-between gap-6 px-1 pb-[22px] border-b-2 border-ink mb-[26px]">
      <div>
        <p className="text-[11px] tracking-[0.32em] uppercase text-ink-soft font-semibold m-0 mb-2">
          Control de turnos
        </p>
        <h1 className="m-0 text-[27px] leading-[1.08] font-bold tracking-tight">
          Calculadora de Días Libres
        </h1>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-[10px] tracking-[0.22em] uppercase text-ink-soft font-semibold m-0 mb-1">
          Fecha actual
        </p>
        <p
          className="text-[21px] font-bold tabular-nums tracking-wide whitespace-nowrap m-0"
          suppressHydrationWarning
        >
          {today ? toFechaCorta(today) : '--'}
        </p>
      </div>
    </header>
  );
}
