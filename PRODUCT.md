# PRODUCT.md — Terkor

## Platform
Sitio web estático multipágina (HTML + CSS + JS propios, sin frameworks ni backend), pensado para publicarse en cualquier hosting o CDN estática. Generado con un pequeño motor en Node (`build.js` + `_build/`) para no duplicar cabecera, pie y menú entre páginas.

## Users
- **Responsables de centros escolares, residencias y empresas** en Madrid que evalúan o ya contratan el servicio de comedor de Terkor: quieren ver rápido qué ofrece la empresa, su experiencia y cómo contactar.
- **Familias y personal de los centros** que llegan desde el blog (buscadores, redes) interesados en nutrición infantil.
- **El propio Terkor**, que necesita un sitio que transmita seriedad y pueda enviar como referencia comercial.

## Product Purpose
Sustituir la web de 2011-2018 (HTML de tablas, jQuery, un único `index.html` con anclas) por un sitio multipágina real que explique la empresa, sus servicios, su forma de trabajar la nutrición, enseñe ejemplos reales de menú y facilite el contacto — sin perder ni un dato del original.

## Positioning
Comedores colectivos con enfoque en **eficacia, calidad y seguridad alimentaria**, apoyados en estudios nutricionales externos (BIOTAB) y en la dieta mediterránea estacional. No es una marca de restauración de consumo, es un proveedor B2B/B2G de servicios de comedor.

## Operating Context
- Sin backend ni CMS: los cambios de contenido se hacen editando `_build/data.js` y volviendo a ejecutar `node build.js`.
- Sin analítica ni cookies de terceros instaladas (el original tampoco las tenía).
- El único canal de conversión real disponible es el contacto directo por correo: no hay pasarela de pago ni panel de cliente.

## Capabilities and Constraints
- **No hay CIF ni domicilio social publicados** en ninguna página del dominio original: no se han inventado, están marcados como pendientes en `PENDIENTE.md` y en `aviso-legal.html`.
- **No hay formulario con backend real**: el "formulario de contacto" compone un `mailto:` en el navegador del visitante; no hay servidor propio que reciba envíos.
- El teléfono (650 971 404, recuperado de las fichas de las entradas del blog) se retiró de la web a petición expresa por ser un número personal del titular, no una línea comercial. Si Terkor da de alta un teléfono de empresa, se puede añadir de nuevo.

## Brand Commitments
- Rosa de marca `#dc2b6e`, muestreado del logotipo original (cinta rosa con "Terkor") y confirmado por las clases `.rosa` / `.tit` del CSS antiguo.
- Tipografía de titulares **Josefin Sans**, la misma que usaba el sitio original (`fonts.googleapis.com/css?family=Josefin+Sans`), por continuidad de marca.
- Se conservan literalmente todos los textos de la empresa, servicios, nutrición e innovación, los pies de foto de `platos.html` y el contenido íntegro de las 10 entradas del blog.

## Evidence on Hand
Todo el rastreo original vive en `_rastreo/`: HTML crudo de `index.html` y `platos.html`, CSS original, feed JSON del blog con las 10 entradas y sus imágenes, y las imágenes fuente sin tocar en `_rastreo/img-original/`.

## Product Principles
1. Nada se inventa: si un dato no estaba en el dominio ni en su blog, no está en la web (va a `PENDIENTE.md`).
2. La marca se respeta: mismos colores, misma tipografía de titulares, mismo nombre y mismo tono de los textos.
3. El sitio funciona sin JavaScript: la navegación, el contenido y los enlaces de contacto son accesibles igual (el `mailto:` del correo ofuscado necesita JS para resolverse; el resto no); JS solo añade el menú móvil, la galería y la composición del correo.
4. Cada imagen es del propio dominio (fotos de servicio, platos reales, imágenes del blog) — no hay banco de imágenes.

## Accessibility & Inclusion
Contraste AA verificado, un solo `<h1>` por página, enlace de salto al contenido, navegación por teclado con foco visible, menú móvil y galería con foco atrapado y cierre por `Escape`, `prefers-reduced-motion` respetado, objetivos táctiles ≥44px, `alt` reales en todas las fotografías.
