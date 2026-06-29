import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calculadora de Días Libres',
  description:
    'Consulta el estado de trabajo o descanso para cualquier fecha según el patrón de alternancia de turnos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
