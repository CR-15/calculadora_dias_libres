'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import type { EstadoTurno, RegistroHistorial, ResultadoCalculo } from '@/types';
import { parseFecha, calcular, toFechaCorta } from '@/lib/calculadora';
import Header from '@/components/Header';
import EstadoSelector from '@/components/EstadoSelector';
import FechaConsulta from '@/components/FechaConsulta';
import ResultadoSection from '@/components/ResultadoSection';
import HistorialSection from '@/components/HistorialSection';

const STORAGE_KEY = 'calculadora-dias-libres:v1';

const StepLabel = memo(function StepLabel({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-[18px]">
      <span className="text-xs font-bold text-white bg-accent w-[22px] h-[22px] rounded-[6px] inline-flex items-center justify-center flex-shrink-0 tabular-nums">
        {num}
      </span>
      <span className="text-[13px] tracking-[0.06em] uppercase font-bold text-ink-soft">
        {title}
      </span>
    </div>
  );
});

export default function Home() {
  const [today, setToday] = useState<Date | null>(null);
  const [estadoHoy, setEstadoHoy] = useState<EstadoTurno>('work');
  const [inputValue, setInputValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [historial, setHistorial] = useState<RegistroHistorial[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    setToday(new Date());
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const data = JSON.parse(saved) as {
        estadoHoy?: EstadoTurno;
        historial?: RegistroHistorial[];
      };
      if (data.estadoHoy === 'work' || data.estadoHoy === 'free') {
        setEstadoHoy(data.estadoHoy);
      }
      if (Array.isArray(data.historial)) setHistorial(data.historial.slice(0, 50));
    } catch {
      // Un valor local dañado no debe impedir que la calculadora abra.
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ estadoHoy, historial }));
    } catch {
      // El cálculo sigue disponible aunque el almacenamiento esté bloqueado.
    }
  }, [estadoHoy, historial, storageReady]);

  const agregarAlHistorial = useCallback((res: ResultadoCalculo) => {
    setHistorial((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        fecha: res.fechaCorta,
        diff: res.diff,
        diffFirmado: res.diffFirmado,
        estado: res.estado,
        estadoTexto: res.estadoTexto,
        diaSemana: res.diaSemana,
      },
      ...prev,
    ]);
  }, []);

  // Helper centralizado: ejecuta el cálculo y actualiza el estado en un solo lugar
  const applyCalculo = useCallback(
    (fecha: Date, estado: EstadoTurno, addToHistory: boolean) => {
      if (!today) return;
      const res = calcular(fecha, estado, today);
      setResultado(res);
      setError(null);
      setIsInvalid(false);
      if (addToHistory) agregarAlHistorial(res);
    },
    [today, agregarAlHistorial]
  );

  const consultar = useCallback(() => {
    if (!today) return;
    if (!inputValue.trim()) {
      setError('Ingrese una fecha antes de consultar.');
      setIsInvalid(true);
      setResultado(null);
      return;
    }
    const fecha = parseFecha(inputValue);
    if (!fecha) {
      setError('Fecha no válida. Use el formato 15-02-2026, 15/02/2026 o 15022026.');
      setIsInvalid(true);
      setResultado(null);
      return;
    }
    setInputValue(toFechaCorta(fecha));
    applyCalculo(fecha, estadoHoy, true);
  }, [inputValue, estadoHoy, today, applyCalculo]);

  const handleEstadoChange = useCallback(
    (nuevoEstado: EstadoTurno) => {
      setEstadoHoy(nuevoEstado);
      const fecha = parseFecha(inputValue);
      if (fecha) applyCalculo(fecha, nuevoEstado, false);
    },
    [inputValue, applyCalculo]
  );

  const handlePickerChange = useCallback(
    (date: Date) => {
      setInputValue(toFechaCorta(date));
      applyCalculo(date, estadoHoy, true);
    },
    [estadoHoy, applyCalculo]
  );

  return (
    <main className="app-shell bg-page min-h-screen flex items-start justify-center px-5 pt-12 pb-20">
      <div className="w-full max-w-[620px]">
        <Header today={today} />

        <div className="bg-card border border-line rounded-2xl shadow-card overflow-hidden">
          {/* Paso 1 — Estado de hoy */}
          <section className="p-[24px_28px] border-b border-line max-sm:p-[20px]">
            <StepLabel num={1} title="Estado de hoy" />
            <EstadoSelector value={estadoHoy} onChange={handleEstadoChange} />
          </section>

          {/* Paso 2 — Consultar fecha */}
          <section className="p-[24px_28px] border-b border-line max-sm:p-[20px]">
            <StepLabel num={2} title="Consultar fecha" />
            <FechaConsulta
              value={inputValue}
              isInvalid={isInvalid}
              onChange={(v) => {
                setInputValue(v);
                setIsInvalid(false);
              }}
              onEnter={consultar}
              onPickerChange={handlePickerChange}
            />
          </section>

          {/* Acciones */}
          <section className="p-[24px_28px] border-b border-line max-sm:p-[20px]">
            <button
              onClick={consultar}
              className="btn-accent min-h-11 max-sm:w-full font-sans text-[13.5px] font-semibold tracking-[0.01em] px-5 py-[11px] rounded-[9px] border-[1.5px] border-transparent cursor-pointer transition-[background-color,transform] duration-150 bg-accent text-white active:scale-[0.98]"
            >
              Consultar
            </button>
          </section>

          {/* Resultado */}
          <ResultadoSection resultado={resultado} error={error} />
        </div>

        <HistorialSection registros={historial} onClear={() => setHistorial([])} />

        <footer className="text-center mt-[22px] text-[11px] tracking-[0.06em] text-ink-soft">
          Las fechas alternan el estado: cada día de diferencia invierte trabajo y descanso.
        </footer>
      </div>
    </main>
  );
}
