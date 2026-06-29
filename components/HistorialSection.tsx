import type { RegistroHistorial } from '@/types';

interface Props {
  registros: RegistroHistorial[];
  onClear: () => void;
}

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
        <button
          onClick={onClear}
          disabled={!hayRegistros}
          className="font-sans text-xs font-semibold text-ink-soft bg-transparent border border-line rounded-[7px] px-3 py-[6px] cursor-pointer transition-all duration-150 hover:text-[#a23c28] hover:border-[#d8b3aa] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Limpiar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px] min-w-[520px]">
          <thead>
            <tr>
              {['#', 'Fecha consultada', 'Días de diferencia', 'Estado', 'Día de la semana'].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] tracking-[0.1em] uppercase text-ink-soft font-bold px-4 py-[11px] bg-[#f6f9fc] border-b border-line whitespace-nowrap"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {hayRegistros &&
              registros.map((r, idx) => {
                const num = registros.length - idx;
                const signo =
                  r.diffFirmado < 0 ? '−' : r.diffFirmado > 0 ? '+' : '';
                const isWork = r.estado === 'work';
                return (
                  <tr key={r.id} className="hover:bg-[#fafcfe]">
                    <td className="px-4 py-3 border-b border-[#eef2f6] text-ink">{num}</td>
                    <td className="px-4 py-3 border-b border-[#eef2f6] tabular-nums font-semibold text-ink whitespace-nowrap">
                      {r.fecha}
                    </td>
                    <td className="px-4 py-3 border-b border-[#eef2f6] tabular-nums font-bold text-ink whitespace-nowrap">
                      {signo}
                      {r.diff} día{r.diff === 1 ? '' : 's'}
                    </td>
                    <td className="px-4 py-3 border-b border-[#eef2f6]">
                      <span
                        className={`text-[11.5px] font-bold px-[10px] py-[3px] rounded-[5px] inline-block ${
                          isWork ? 'bg-work-bg text-work' : 'bg-free-bg text-free'
                        }`}
                        style={{
                          boxShadow: `inset 0 0 0 1px ${isWork ? '#1d5a8f' : '#3f7d4f'}`,
                        }}
                      >
                        {r.estadoTexto}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-[#eef2f6] text-ink-soft capitalize whitespace-nowrap">
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

      <div className="px-6 py-[11px] text-[11px] text-ink-soft bg-[#f6f9fc] border-t border-line tracking-[0.02em]">
        Los registros se mantienen solo mientras la página esté abierta. Al recargar se borran.
      </div>
    </section>
  );
}
