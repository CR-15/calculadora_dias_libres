# Sistema de interfaz — Calculadora de Días Libres

## Dirección

Herramienta laboral serena, directa y confiable. La persona suele abrirla rápidamente para saber si una fecha corresponde a trabajo o descanso; el resultado debe entenderse de un vistazo y los controles deben poder usarse con una mano.

El producto se apoya en el lenguaje de turnos, calendario, alternancia, servicio y descanso. Evitar una apariencia genérica de panel administrativo.

## Firma del producto

La alternancia diaria es el elemento distintivo. Debe aparecer consistentemente mediante:

- Azul de servicio para `Trabajando`.
- Verde de descanso para `Libre`.
- Pasos numerados para explicar el flujo estado actual → fecha → resultado.
- Resultado con jerarquía superior al resto de la información.
- Historial compacto que permita reconocer fecha, día y estado rápidamente.

## Paleta semántica

Usar exclusivamente los tokens existentes en `app/globals.css`:

- `--paper`: lienzo general.
- `--card`: superficie principal.
- `--ink`: texto primario.
- `--ink-soft`: texto secundario y metadatos.
- `--line` y `--line-strong`: separación discreta.
- `--accent`: acción principal y numeración de pasos.
- `--work` / `--work-bg`: estado de trabajo.
- `--free` / `--free-bg`: estado de descanso.
- `--danger` / `--danger-border`: errores y acciones destructivas.

No introducir colores decorativos adicionales ni gradientes ajenos a los fondos ambientales existentes.

## Profundidad y superficies

Estrategia: sombras sutiles para la tarjeta principal y cambios tonales discretos para superficies internas.

- Página: `--paper` con el fondo ambiental existente.
- Tarjeta principal: `--card`, borde `--line`, radio de 16 px y `shadow-card`.
- Controles de entrada: deben sentirse ligeramente insertados respecto a la tarjeta.
- Separadores: bordes finos y poco contrastados; nunca bordes decorativos gruesos.
- Tema oscuro: conservar la jerarquía mediante bordes y cambios de superficie, no sombras fuertes.

## Jerarquía

- Foco principal: estado calculado `Trabajando` o `Libre`.
- Foco secundario: selector del estado actual y fecha consultada.
- Metadatos: día de semana, diferencia temporal y explicación del patrón.
- Los números dinámicos usan cifras tabulares.
- Los títulos de paso usan mayúsculas, tracking amplio y peso 700.
- Peso y color deben separar niveles antes de aumentar tamaños innecesariamente.

## Espaciado y densidad

Base: 4 px.

- Secciones de escritorio: 24 px vertical y 28 px horizontal.
- Secciones móviles: 20 px.
- Separación del número de paso y su texto: 12 px.
- Controles táctiles: mínimo 44 px de alto.
- Tarjeta principal: ancho máximo de 620 px.
- Respetar `env(safe-area-inset-*)` en Android.

## Componentes recurrentes

### Acción principal

- Altura mínima: 44 px.
- Radio: 9 px.
- Fondo: `--accent`; hover: `--btn-hover`.
- Texto blanco, 13.5 px, peso 600.
- En móvil ocupa todo el ancho.
- Presión: escala `0.98`; transición solo de color y transformación.

### Etiqueta de paso

- Indicador: 22 × 22 px, radio 6 px, fondo `--accent`.
- Número: 12 px, peso 700, cifras tabulares.
- Texto: 13 px, mayúsculas, peso 700, `--ink-soft`.
- Margen inferior: 18 px.

### Tarjeta principal

- Fondo `--card`, borde `--line`, radio 16 px.
- Las secciones comparten el mismo contenedor y se separan internamente.
- No convertir cada bloque en una tarjeta independiente.

### Estados

- Trabajo: `--work` sobre `--work-bg`.
- Descanso: `--free` sobre `--free-bg`.
- Error: `--danger`; indicar además el error mediante texto, no solo color.
- Todos los controles requieren estados de foco visibles, activo y deshabilitado cuando corresponda.

## Android

- La misma interfaz sirve a web y Android mediante Capacitor.
- Mantener funcionamiento sin conexión.
- Persistir estado actual e historial localmente.
- No depender de gestos ocultos para acciones esenciales.
- Evitar controles menores de 44 × 44 px.
- Comprobar cada cambio a ancho móvil y con tema oscuro.
