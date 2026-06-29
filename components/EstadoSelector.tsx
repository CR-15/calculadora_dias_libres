import type { EstadoTurno } from '@/types';

interface Props {
  value: EstadoTurno;
  onChange: (v: EstadoTurno) => void;
}

export default function EstadoSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-[10px] max-sm:grid-cols-1">
      <OpcionEstado
        kind="work"
        checked={value === 'work'}
        label="Trabajando"
        sub="Hoy es día de servicio"
        onChange={() => onChange('work')}
      />
      <OpcionEstado
        kind="free"
        checked={value === 'free'}
        label="Libre"
        sub="Hoy es día de descanso"
        onChange={() => onChange('free')}
      />
    </div>
  );
}

function OpcionEstado({
  kind,
  checked,
  label,
  sub,
  onChange,
}: {
  kind: EstadoTurno;
  checked: boolean;
  label: string;
  sub: string;
  onChange: () => void;
}) {
  const isWork = kind === 'work';

  const borderClass = checked
    ? isWork
      ? 'border-work'
      : 'border-free'
    : 'border-line-strong hover:border-ink-soft';

  const bgClass = checked ? (isWork ? 'bg-work-bg' : 'bg-free-bg') : 'bg-white';

  const insetShadow = checked
    ? { boxShadow: `inset 0 0 0 1px ${isWork ? '#1d5a8f' : '#3f7d4f'}` }
    : {};

  const dotBorderClass = checked
    ? isWork
      ? 'border-work'
      : 'border-free'
    : 'border-line-strong';

  return (
    <label
      className={`relative border-[1.5px] rounded-[10px] p-[14px_16px] cursor-pointer flex items-center gap-3 transition-all duration-150 ${borderClass} ${bgClass}`}
      style={insetShadow}
    >
      <input
        type="radio"
        name="estado"
        value={kind}
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 inset-0 cursor-pointer"
      />
      <span
        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 relative transition-all duration-150 ${dotBorderClass}`}
      >
        {checked && (
          <span
            className={`absolute inset-[3px] rounded-full ${isWork ? 'bg-work' : 'bg-free'}`}
          />
        )}
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="text-[11.5px] text-ink-soft font-medium">{sub}</span>
      </span>
    </label>
  );
}
