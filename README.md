# Calculadora de Días Libres

Aplicación web y Android para consultar el estado de trabajo o descanso de cualquier fecha, basándose en el patrón de alternancia de turnos.

## ¿Cómo funciona?

1. Seleccioná si **hoy** es día de trabajo o descanso.
2. Ingresá la fecha que querés consultar (acepta varios formatos).
3. La calculadora determina el estado de esa fecha usando la paridad de días de diferencia con hoy: diferencia par → mismo estado, diferencia impar → estado invertido.

## Formatos de fecha aceptados

| Formato | Ejemplo |
|---|---|
| Solo dígitos (DDMMAAAA) | `15022026` |
| Con guiones (DD-MM-AAAA) | `15-02-2026` |
| Con barras (DD/MM/AAAA) | `15/02/2026` |

## Tecnologías

- **Next.js 16** (App Router y exportación estática)
- **React 19**
- **TypeScript**
- **Tailwind CSS v3**
- **Capacitor 8** para Android

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Android

Requisitos: Android Studio con Android SDK 36 y JDK 21 (se recomienda el JDK incluido en Android Studio).

```bash
# Genera la web y la copia al proyecto nativo
npm run android:sync

# Abre el proyecto para ejecutarlo en un teléfono o emulador
npm run android:open
```

El identificador de la aplicación es `com.esteban.calculadoradiaslibres`. La app funciona sin conexión y conserva en el dispositivo el estado seleccionado y las últimas 50 consultas.

Para preparar el paquete firmado de Google Play, consulta [Publicación en Google Play](docs/PLAY_STORE.md).

## Deploy en Vercel

1. Subí el repositorio a GitHub.
2. Importá el proyecto en [vercel.com](https://vercel.com).
3. Vercel detecta Next.js automáticamente — no se necesita configuración adicional.
4. Haz clic en **Deploy**. El resultado estático también se genera en `out/` con `npm run build`.
