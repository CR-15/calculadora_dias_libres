'use client';

import { useRef, type ChangeEvent, type KeyboardEvent } from 'react';

interface Props {
  value: string;
  isInvalid: boolean;
  onChange: (v: string) => void;
  onEnter: () => void;
  onPickerChange: (date: Date) => void;
}

export default function FechaConsulta({
  value,
  isInvalid,
  onChange,
  onEnter,
  onPickerChange,
}: Props) {
  const pickerRef = useRef<HTMLInputElement>(null);

  const handleCalBtn = () => {
    if (!pickerRef.current) return;
    try {
      pickerRef.current.showPicker();
    } catch {
      pickerRef.current.click();
    }
  };

  const handlePickerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return;
    const dt = new Date(+m[1], +m[2] - 1, +m[3]);
    onPickerChange(dt);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onEnter();
  };

  const inputBorder = isInvalid
    ? 'border-[#b4452f] focus:shadow-[0_0_0_3px_rgba(180,69,47,0.12)]'
    : 'border-line-strong focus:border-accent focus:shadow-[0_0_0_3px_rgba(15,61,99,0.12)]';

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-[14px] flex-wrap">
        <label
          htmlFor="fecha-input"
          className="text-[13px] text-ink-soft font-semibold flex-shrink-0"
        >
          Fecha a consultar
        </label>
        <div className="flex-1 min-w-[200px] flex items-stretch gap-2">
          <input
            id="fecha-input"
            type="text"
            value={value}
            placeholder="15022026 · 15-02-2026 · 15/02/2026"
            inputMode="numeric"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={12}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? 'fecha-error-hint' : 'fecha-format-hint'}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 min-w-0 font-sans text-base tabular-nums tracking-[0.06em] px-[14px] py-[11px] border-[1.5px] rounded-[9px] text-ink bg-card outline-none transition-all duration-150 placeholder:text-ink placeholder:opacity-30 ${inputBorder}`}
          />
          <button
            type="button"
            onClick={handleCalBtn}
            aria-label="Abrir selector de fecha en calendario"
            className="flex-shrink-0 w-[46px] border-[1.5px] border-line-strong rounded-[9px] bg-card text-accent cursor-pointer flex items-center justify-center transition-all duration-150 hover:border-accent hover:bg-work-bg active:translate-y-px focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(15,61,99,0.12)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              suppressHydrationWarning
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
          </button>
          <input
            ref={pickerRef}
            type="date"
            onChange={handlePickerChange}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
          />
        </div>
      </div>
      {/* Hint de formato — visible para lectores de pantalla y como ayuda visual */}
      <p
        id="fecha-format-hint"
        className="text-[11px] text-ink-soft ml-0 leading-snug"
        aria-live="off"
      >
        Formatos: <span className="tabular-nums">15022026</span> ·{' '}
        <span className="tabular-nums">15-02-2026</span> ·{' '}
        <span className="tabular-nums">15/02/2026</span>
      </p>
    </div>
  );
}
