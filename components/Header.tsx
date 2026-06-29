import { toFechaCorta } from '@/lib/calculadora';
import ThemeToggle from './ThemeToggle';

interface Props {
  today: Date | null;
}

export default function Header({ today }: Props) {
  return (
    <header
      className={[
        'flex items-end justify-between gap-6 px-1 pb-[22px]',
        'border-b-2 border-ink mb-[26px]',
        // En pantallas ≤520 px apila verticalmente (igual que el HTML original)
        'max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-3',
        'max-[520px]:pb-4 max-[520px]:mb-5',
      ].join(' ')}
    >
      {/* Título */}
      <div>
        <p className="text-[11px] tracking-[0.32em] uppercase text-ink-soft font-semibold m-0 mb-2">
          Control de turnos
        </p>
        <h1 className="m-0 text-[22px] sm:text-[27px] leading-[1.08] font-bold tracking-tight">
          Calculadora de Días Libres
        </h1>
      </div>

      {/* Toggle + Fecha — en mobile: fila con justify-between */}
      <div
        className={[
          'flex flex-col items-end gap-2 flex-shrink-0',
          'max-[520px]:flex-row-reverse max-[520px]:items-center',
          'max-[520px]:justify-between max-[520px]:w-full',
        ].join(' ')}
      >
        <ThemeToggle />
        <div className="text-right max-[520px]:text-left">
          <p className="text-[10px] tracking-[0.22em] uppercase text-ink-soft font-semibold m-0 mb-1">
            Fecha actual
          </p>
          <p
            className="text-[18px] sm:text-[21px] font-bold tabular-nums tracking-wide whitespace-nowrap m-0"
            suppressHydrationWarning
          >
            {today ? toFechaCorta(today) : '--'}
          </p>
        </div>
      </div>
    </header>
  );
}
