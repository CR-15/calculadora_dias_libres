import type { RegistroHistorial } from '@/types';

interface Props {
  registros: RegistroHistorial[];
  onClear: () => void;
}

// Constante fuera del componente para evitar re-creación en cada render
const HIST_HEADERS = [
  '#',
  'Fecha consultada',
  'Días de diferencia',
  'Estado',
  'Día de la semana',
] as const;

export default function HistorialSection({ registros, onClear }: Props) {
  const hayRegistros = registros.length > 0;

  return (
    <section className="mt-[26px] bg-card border border-line rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-[18px] border-b border-line">
        <div>
          <div className="text-[13px] tracking-[0.06em] uppercase font-bold text-ink-soft">
            Fechas consultadas
          </div>
          <div className="text-[11.5px] text-ink-soft font-medium mt-0.5">
            {hayRegistros
              ? `${registros.length} consulta${registros.length === 1 ? '' : 's'} en esta sesión`
              : 'Registro temporal de esta sesión'}
          </div>
        </div>
        {/* btn-danger: usa CSS var para hover — funciona con teclado y sin JS events */}
        <button
          onClick={onClear}
          disabled={!hayRegistros}
          aria-label="Limpiar historial de consultas"
          className="btn-danger font-sans text-xs font-semibold text-ink-soft bg-transparent border border-line rounded-[7px] px-3 py-[6px] cursor-pointer transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Limpiar
        </button>
      </div>

      <div className="overflow-x-auto" role="region" aria-label="Tabla de fechas consultadas">
        <table className="w-full border-collapse text-[13px] min-w-[520px]">
          <thead>
            <tr>
              {HIST_HEADERS.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="text-left text-[10px] tracking-[0.1em] uppercase text-ink-soft font-bold px-4 py-[11px] border-b border-line whitespace-nowrap"
                  style={{ background: 'var(--surface-1)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hayRegistros &&
              registros.map((r, idx) => {
                const num = registros.length - idx;
                const signo = r.diffFirmado < 0 ? '−' : r.diffFirmado > 0 ? '+' : '';
                const isWork = r.estado === 'work';
                return (
                  // hover-row: usa var(--surface-hover) via CSS — sin JS mouse events
                  <tr key={r.id} className="hover-row transition-colors duration-100">
                    <td
                      className="px-4 py-3 text-ink"
                      style={{ borderBottom: '1px solid var(--row-border)' }}
                    >
                      {num}
                    </td>
                    <td
                      className="px-4 py-3 tabular-nums font-semibold text-ink whitespace-nowrap"
                      style={{ borderBottom: '1px solid var(--row-border)' }}
                    >
                      {r.fecha}
                    </td>
                    <td
                      className="px-4 py-3 tabular-nums font-bold text-ink whitespace-nowrap"
                      style={{ borderBottom: '1px solid var(--row-border)' }}
                    >
                      {signo}
                      {r.diff} día{r.diff === 1 ? '' : 's'}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ borderBottom: '1px solid var(--row-border)' }}
                    >
                      <span
                        className={`text-[11.5px] font-bold px-[10px] py-[3px] rounded-[5px] inline-block ${
                          isWork ? 'bg-work-bg text-work' : 'bg-free-bg text-free'
                        }`}
                        style={{
                          boxShadow: `inset 0 0 0 1px var(--${isWork ? 'work' : 'free'})`,
                        }}
                      >
                        {r.estadoTexto}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-ink-soft capitalize whitespace-nowrap"
                      style={{ borderBottom: '1px solid var(--row-border)' }}
                    >
                      {r.diaSemana}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {!hayRegistros && (
        <div className="px-6 py-[22px] text-[13.5px] text-ink-soft font-medium">
          Aún no hay consultas registradas.
        </div>
      )}

      <div
        className="px-6 py-[11px] text-[11px] text-ink-soft border-t border-line tracking-[0.02em]"
        style={{ background: 'var(--surface-1)' }}
      >
        Los registros se mantienen solo mientras la página esté abierta. Al recargar se borran.
      </div>
    </section>
  );
}
