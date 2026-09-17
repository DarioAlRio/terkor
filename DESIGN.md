# DESIGN.md — Terkor

## Paleta (`assets/css/site.css`, bloque `:root`)

| Token | Valor | Origen |
|---|---|---|
| `--pink` | `#dc2b6e` | Muestreado del ribbon del logotipo original (`image/cabecera.png`) y confirmado por las clases `.rosa`, `.tit`, `.txt_parrafo_rosa` de `css/lib.css` del sitio antiguo. |
| `--pink-ink` | `#b81f5c` | Variante más oscura del mismo tono para texto sobre blanco: `#dc2b6e` sobre blanco da ~4,55:1 (aprueba AA por poco); `#b81f5c` da ~6,2:1, con margen. Se usa en enlaces y textos rosa de cuerpo; `--pink` se reserva para fondos, iconos y grandes titulares donde el contraste no es crítico. |
| `--ink-900` / `--ink-800` / `--ink-600` / `--ink-400` | Grises cálidos | Derivados del `#333`/`#666` del CSS original (`body{color:#333}`, `.margen{color:#666}`), con un punto de temperatura para no verse fríos junto al rosa. |
| `--paper` / `--paper-warm` | `#ffffff` / `#fbf6f3` | El original era blanco puro; se añade un cálido muy sutil para las bandas alternas (`.section--alt`) en vez de repetir blanco plano en todo el sitio. |
| Modo oscuro | `@media (prefers-color-scheme: dark)` | No existía en el original (2011-2018); se añade por accesibilidad/preferencia del sistema, invirtiendo los mismos tokens. |

## Tipografía
- **Titulares:** `Josefin Sans` 600/700 — la misma familia que cargaba el sitio original desde Google Fonts. Se mantiene por continuidad de marca.
- **Cuerpo:** `Karla` 400/500/600/700 — el original usaba la propia Josefin Sans también para el cuerpo (poco legible en párrafos largos); se separa una familia de texto de alta legibilidad, evitando las tipografías más vistas en interfaces generadas por IA (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk), verificado con el detector de antipatrones de la skill *impeccable*.
- Escala fluida con `clamp()` en títulos y hero, de 360 a 1440px, sin saltos bruscos.

## Retícula y espaciado
- Contenedor máximo `1180px` (`--container`), con `padding-inline` fluido (`clamp(1.25rem, 4vw, 2.5rem)`).
- Escala de radios: `10 / 18 / 28px` (`--radius-sm/md/lg`) según el tamaño del componente (botón, tarjeta, imagen grande).
- Secciones con `padding-block` fluido (`clamp(3rem, 7vw, 5.5rem)`), alternando `--paper` y `--paper-warm` para marcar ritmo sin usar líneas divisorias.

## Componentes
- **Botones** (`.btn`): pastilla completa (`border-radius:999px`), variante primaria rosa sólida, variante "ghost" con borde y fondo translúcido sobre imágenes oscuras (hero, banda CTA). Alto mínimo 44px (objetivo táctil).
- **Marca** (`.brand`): el logotipo original de Terkor (recortado de `cabecera.png`, la cabecera del sitio antiguo, que incluía además una línea de texto "SERVICIOS DE COCINA Y COMEDOR" que no se usa aquí), servido como PNG con transparencia + WebP. A petición expresa se usa la imagen real en vez de la reconstrucción en CSS que se manejó en un primer momento.
- **Pilares numerados** (`.pillar`): traduce los tres bloques "01 Eficacia / 02 Calidad / 03 Seguridad" del original en tarjetas con el número grande en rosa claro, sin depender de icono.
- **Mini-servicios / tarjetas de servicio**: icono circular rosa + texto, para los 4 servicios reales del `SERVICIOS` original.
- **Bento de nutrición**: las dos fotos (`foto_nutricion.jpg`) se separan por recorte en `aceite` y `pan` para poder maquetarlas como bloque bento con una cita destacada, en vez de una única imagen compuesta como en el original.
- **Galería + lightbox** (`.gallery`, `#lightbox`): sustituye a la tabla HTML de `platos.html`. Foco atrapado, cierre con `Escape`, navegación con flechas de teclado, el foco vuelve al botón que abrió la imagen.
- **Tarjeta de entrada de blog** (`.post-card`) y **ficha de entrada** (`.post`, `.post-figure`, `.post-quote`): el `.post-quote` usa fondo suave + icono de comillas, **no** un borde grueso de color a la izquierda (patrón de cita típico de interfaces generadas por IA, detectado y corregido con `impeccable/scripts/detect.mjs`).
- **Pie** (`.site-footer`), **banda CTA** (`.cta-band`) y **cita de nutrición** (`.nutri-teaser__quote`): fondo oscuro fijo (`--surface-dark`), que no se invierte con el modo oscuro del sistema (si lo hiciera, el fondo pasaría a casi blanco con letras blancas encima e ilegibles). Texto en blanco; los enlaces del pie pasan al rosa de marca (`--pink-on-dark`) solo en `:hover`.
- **Formulario de contacto**: sin backend. Compone un `mailto:` con los datos escritos; nunca simula un envío que no ocurre. Incluye trampa antispam oculta (`.field--trap`). No hay teléfono ni WhatsApp publicados: el correo es el único canal.

## Movimiento
- Entrada suave (`opacity` + `translateY`) por `IntersectionObserver` en tarjetas y bloques de imagen, añadida por JS (`data-reveal`) — con contenido siempre visible si JS está desactivado o si el navegador no soporta `IntersectionObserver`.
- `prefers-reduced-motion: reduce` anula duraciones y el scroll suave.

## Accesibilidad
- Contraste verificado en los tokens de texto (ver tabla de paleta).
- Un solo `<h1>` por página, jerarquía `h2`/`h3` consistente.
- `:focus-visible` con anillo de foco de alto contraste en todo el sitio.
- Menú móvil y lightbox: `aria-expanded`, `aria-hidden`, `role="dialog"`, `aria-modal`, foco atrapado con `Tab`/`Shift+Tab`, cierre con `Escape` y backdrop.
- Objetivos táctiles ≥44px en botones y enlaces de la barra móvil.

## Compatibilidad
- Sin `:has()`, sin `@container`, sin `background-attachment:fixed`.
- `@supports` para `backdrop-filter` (cabecera) y para `-webkit-fill-available` (altura del hero en iOS Safari).
- Rejillas con `minmax(min(Npx,100%),1fr)` allí donde el contenido es variable; en el resto, columnas fijas por breakpoint para un control más previsible del diseño.
- `color-mix()` no se usa sin respaldo: el único uso (cabecera translúcida) está detrás de `@supports (backdrop-filter: blur(10px))`.
