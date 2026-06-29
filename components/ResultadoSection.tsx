import type { ResultadoCalculo } from '@/types';

interface Props {
  resultado: ResultadoCalculo | null;
  error: string | null;
}

export default function ResultadoSection({ resultado, error }: Props) {
  const isWork = resultado?.estado === 'work';

  return (
    <section
      className="px-7 pt-6 pb-[26px] border-t border-line max-sm:px-5"
      style={{ background: 'linear-gradient(180deg, var(--result-from), var(--result-to))' }}
    >
      <p className="text-[10px] tracking-[0.24em] uppercase text-ink-soft font-bold m-0 mb-[14px]">
        Resultado
      </p>

      {!resultado && !error && (
        <p className="text-[15px] text-ink-soft font-medium m-0">
          Ingrese una fecha y presione Consultar para calcular.
        </p>
      )}

      {error && !resultado && (
        <p
          role="alert"
          aria-live="assertive"
          className="m-0 text-sm font-semibold"
          style={{ color: 'var(--danger)' }}
        >
          {error}
        </p>
      )}

      {resultado && !error && (
        <>
          <div className="grid grid-cols-2 gap-[14px] mb-[18px] max-sm:grid-cols-1">
            <div className="border border-line rounded-[10px] p-[13px_15px] bg-card">
              <div className="text-[10px] tracking-[0.14em] uppercase text-ink-soft font-bold mb-[5px]">
                Fecha consultada
              </div>
              <div className="text-lg font-bold tabular-nums text-ink">
                {resultado.fechaCorta}
              </div>
            </div>
            <div className="border border-line rounded-[10px] p-[13px_15px] bg-card">
              <div className="text-[10px] tracking-[0.14em] uppercase text-ink-soft font-bold mb-[5px]">
                Diferencia
              </div>
              <div className="text-[30px] leading-none font-bold tabular-nums text-ink">
                {resultado.diff}
                <small className="text-xs font-semibold text-ink-soft ml-1">
                  día{resultado.diff === 1 ? '' : 's'}
                </small>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[11px] p-[13px_16px] rounded-[10px] border border-line bg-card">
            <span
              className={`text-[13px] font-bold px-3 py-1 rounded-[6px] tracking-[0.02em] ${
                isWork ? 'bg-work-bg text-work' : 'bg-free-bg text-free'
              }`}
              style={{ boxShadow: `inset 0 0 0 1px var(--${isWork ? 'work' : 'free'})` }}
            >
              {resultado.estadoTexto}
            </span>
            <span className="text-[13px] text-ink-soft font-medium">
              {resultado.estadoDesc} &middot; {resultado.fechaLarga} &middot; {resultado.relativo}
            </span>
          </div>
        </>
      )}
    </section>
  );
}
