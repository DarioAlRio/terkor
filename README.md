# Terkor — sitio web

Rediseño completo de [terkor.es](https://terkor.es), empresa de servicios de cocina y comedor
para centros escolares, residencias y empresas de Madrid. El dominio original era una única
página en HTML4/tablas de 2011-2017 (jQuery, secciones por ancla) más una página de platos y
un blog en Blogger. Esta versión conserva su marca, sus colores, sus textos literales y sus
propias fotografías, pero como un sitio multipágina real, responsive y accesible.

HTML estático, sin frameworks ni dependencias externas (salvo Google Fonts): se publica
subiendo la carpeta tal cual a cualquier hosting, GitHub Pages, Netlify o Vercel.

---

## Ver el sitio en local

```bash
node server.js
```

Abre `http://localhost:4173`. El puerto se puede cambiar pasándolo como argumento:
`node server.js 5000`.

## Regenerar las páginas

El HTML **no se edita a mano**: se genera con `node build.js` a partir de `_build/`.

```bash
node build.js
```

El script escribe las 19 páginas, `sitemap.xml` y `robots.txt`, y **falla con código 1** si
algún enlace interno o alguna imagen referenciada no existe.

## Estructura de carpetas

```
.
├── build.js                    Generador: compone las páginas y verifica enlaces/imágenes
├── server.js                   Servidor estático de previsualización (sin dependencias)
├── _build/
│   ├── nav.js                  Datos del negocio (SITE) y estructura del menú (NAV, FOOT)
│   ├── data.js                 Contenido: pilares, servicios, nutrición, platos, posts
│   ├── layout.js                <head>, cabecera, menú móvil, pie, hero, banda CTA
│   ├── lib.js                  Iconos SVG en línea y componentes pequeños (marca, eyebrow…)
│   ├── optimize-images.mjs     Recorta/recomprime/convierte a WebP las imágenes de _rastreo/
│   └── pages/*.js              Una función `render()` + `meta` por página (o grupo de páginas)
├── _rastreo/                   Rastreo del dominio original: fuente de cada dato y cada foto
│   ├── terkor-home.html, terkor-platos.html, terkor-lib.css   HTML/CSS originales
│   ├── blog-posts-clean.json   Las 10 entradas del blog, limpias y estructuradas
│   ├── parse-posts.mjs         Script que limpia el HTML crudo de Blogger
│   └── img-original/           Fotografías originales, sin tocar
├── assets/
│   ├── css/site.css            Todo el CSS del sitio (un único archivo)
│   ├── js/site.js              Todo el JS del sitio (un único archivo, sin dependencias)
│   └── img/                    Imágenes optimizadas (JPEG + WebP) servidas por las páginas
├── *.html                      Páginas generadas (no editar a mano)
├── sitemap.xml · robots.txt    Generados por build.js
├── PRODUCT.md · DESIGN.md      Qué es el producto y su sistema de diseño
└── PENDIENTE.md                Huecos de datos y decisiones que faltan antes de publicar
```

## Páginas generadas

Las URL son "limpias" (sin `.html`): cada página vive en su propia carpeta con un
`index.html` dentro (p. ej. `contacto/index.html` se sirve como `/contacto/`), tal como
hacen GitHub Pages, Netlify, Vercel y Apache/Nginx con la configuración por defecto — no
hace falta ninguna regla de reescritura en el servidor. Solo `index.html` (portada) y
`404.html` (página de error) quedan como archivos sueltos en la raíz.

| URL | Contenido |
|---|---|
| `/` | Portada: hero, pilares, servicios, nutrición, muestra de platos y blog |
| `/la-empresa/` | Quiénes son, los tres pilares (Eficacia, Calidad, Seguridad) |
| `/servicios/` | Los 4 servicios reales (traslado de personal, PRL, eventos, limpieza/maquinaria) |
| `/nutricion-innovacion/` | Cómo se diseñan los menús (BIOTAB) e innovación |
| `/platos/` | Galería de 19 platos reales con lightbox accesible |
| `/blog/` + `/post-<slug>/` (10) | Índice y fichas de las 10 entradas reales del blog |
| `/contacto/` | Teléfono, WhatsApp, correo y formulario que compone `mailto:`/WhatsApp |
| `/aviso-legal/` | Aviso legal honesto: qué datos de identificación faltan por confirmar |
| `404.html` | Página de error (archivo suelto en la raíz, lo exigen así los hostings) |

## De la web antigua a la nueva

| URL / sección antigua | Página nueva |
|---|---|
| `index.html` (ancla `#` / "LA EMPRESA") | `/`, `/la-empresa/` |
| `index.html#secc_servicios` | `/servicios/` |
| `index.html#secc_nutricion` | `/nutricion-innovacion/` |
| `index.html#secc_contacto` | `/contacto/` |
| `platos.html` | `/platos/` |
| `terkor.blogspot.com` (10 entradas) | `/blog/` + `/post-<slug>/` |

El menú original era una sola fila de 6 anclas más un enlace externo al blog; con el
contenido real repartido en páginas propias, el menú nuevo tiene 7 enlaces directos
(Inicio, La empresa, Servicios, Nutrición e innovación, Platos, Blog, Contacto) — sin
mega-menú, porque el negocio no tiene volumen de páginas que lo justifique.

## Sistema de diseño (resumen — detalle en `DESIGN.md`)

- **Rosa de marca `#dc2b6e`**: muestreado del logotipo original y confirmado por las clases
  `.rosa`/`.tit` del CSS antiguo.
- **Josefin Sans** en titulares, la misma tipografía que ya usaba el sitio; **Karla** en
  cuerpo de texto para mejorar la legibilidad en párrafos largos (el original usaba Josefin
  Sans también para el texto corrido).
- Marca: el logotipo original de Terkor (recortado de la cabecera del sitio antiguo),
  servido como PNG con transparencia + WebP.
- Componentes propios (pilares numerados, bento de nutrición, galería con lightbox,
  tarjetas de blog) revisados con el detector de antipatrones de la skill *impeccable*
  (`detect.mjs`), en 0 hallazgos.

## Decisiones técnicas

- **Generador propio en Node**, sin framework: 19 páginas HTML a partir de plantillas en
  `_build/`, para no repetir cabecera/pie/menú a mano en cada archivo.
- **Un único CSS y un único JS**, sin librerías (nada de jQuery, pese a que el sitio
  original dependía de él para el scroll suave).
- **JS en IIFE conservador**, sin módulos ES; el sitio es completamente navegable con
  JavaScript desactivado. La única mejora que se pierde sin JS es el menú móvil desplegable
  (los enlaces siguen ahí, solo que sin animación) y la galería, que se ve igual como lista
  de imágenes con su pie de foto.
- **Formulario de contacto sin backend real**: compone un `mailto:` o un enlace de WhatsApp
  con los datos escritos y lo dice explícitamente. El sitio original no tenía formulario, solo
  un enlace `mailto:` fijo.
- **Correo ofuscado**: se compone por JavaScript desde `data-correo="usuario|dominio"` para
  dificultar el rastreo automático, sin romper el enlace `mailto:` real para personas.

## Rendimiento

Las fotografías del dominio original pesaban **9,3 MB** en total (el fondo de la cabecera,
`bg.jpg`, pesaba 1 MB él solo, servido en todas las páginas). Tras recortarlas a su uso real
y generar variantes WebP con respaldo JPEG:

| | Peso |
|---|---|
| Imágenes originales (JPEG/PNG sin optimizar) | 9,3 MB |
| Mismas imágenes en WebP (lo que descarga la inmensa mayoría de navegadores) | **2,7 MB** |
| Respaldo JPEG (navegadores sin soporte WebP) | 4,9 MB |

Ahorro de **~71%** para los navegadores compatibles con WebP. Todas las imágenes llevan
`width`/`height`, `loading="lazy"` y `decoding="async"`, salvo la primera del hero de cada
página (`fetchpriority="high"`). Las tipografías se cargan con `display=swap` y `preconnect`.

## Accesibilidad y compatibilidad

Contraste AA verificado (ver tabla de colores en `DESIGN.md`), un solo `<h1>` por página,
enlace de salto al contenido, navegación completa por teclado con foco visible, menú móvil y
galería con foco atrapado y cierre por `Escape`, `prefers-reduced-motion` respetado, objetivos
táctiles ≥44px. Verificado sin desbordamiento horizontal en 320, 375, 768, 1024, 1440 y
1920px (comprobado con `document.documentElement.scrollWidth` en el navegador, no solo a
ojo). Compatible con Safari 15+, Chrome, Edge y Firefox: `@supports` para `backdrop-filter`
y para la altura del hero en iOS, `color-mix()` siempre con color sólido de respaldo antes.

## 404 en el hosting final

`404.html` está generado; para que el servidor lo sirva de verdad hace falta configurarlo
según el hosting:
- **Apache**: `ErrorDocument 404 /404.html`
- **Nginx**: `error_page 404 /404.html;`
- **Netlify / Vercel / Cloudflare Pages**: detectan `404.html` en la raíz automáticamente.

## Qué falta antes de publicar

Ver [PENDIENTE.md](PENDIENTE.md): principalmente los datos fiscales de identificación (CIF,
domicilio social) que el dominio original nunca publicó, y la decisión sobre si el
formulario de contacto necesita un backend real.
