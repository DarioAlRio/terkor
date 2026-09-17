# PENDIENTE.md — antes de publicar

## Datos que faltan (no se han inventado)
- **CIF/NIF, razón social completa y domicilio social de Terkor.** No aparecían en ninguna página del dominio original ni en su blog. `aviso-legal.html` los deja marcados como "pendientes de confirmar por el titular". Hay que rellenarlos antes de publicar (obligatorio por la LSSI-CE).
- **Horario de atención.** No se publicaba en el sitio original; no se ha añadido ninguno a la web nueva.
- **Dirección física / mapa.** El sitio original nunca publicó una dirección ni un mapa incrustado. Si Terkor quiere añadirlo, hay que decidir si se hace público (oficinas) o se mantiene solo el teléfono/correo.

## Formulario de contacto
El formulario de `contacto.html` **no tiene backend**: compone un `mailto:` o un enlace de WhatsApp con los datos escritos y dice explícitamente que no envía nada desde la página. Si se prefiere un envío real sin que el visitante tenga que abrir su propio correo, las alternativas son, en orden de sencillez:
1. Un endpoint PHP en el hosting final (`mail()` o similar) si el hosting lo soporta.
2. Un servicio externo tipo Formspree o Netlify Forms (requiere cuenta y, en el caso de Netlify, publicar ahí).
3. Dejarlo como está: es honesto y funciona, pero exige un paso más al visitante.

## Terceros
El sitio original no tenía Google Analytics, Tag Manager, Cookiebot ni ningún pixel instalado — no se ha añadido ninguno en la versión nueva. Si se quiere medir tráfico, decidir la herramienta y actualizar `aviso-legal.html` con el aviso de cookies correspondiente.

## Blog
El blog (`terkor.blogspot.com`) sigue existiendo en Blogger de forma independiente. Esta web incorpora el **contenido literal** de sus 10 entradas como páginas propias (`post-*.html`), pero el blog de Blogger en sí no se ha tocado ni se ha redirigido. Si Terkor quiere dar de baja el Blogger y dejar solo la web nueva, habría que:
1. Redirigir `terkor.blogspot.com` (dentro de las opciones de Blogger) a las páginas equivalentes de `terkor.es/post-*.html`, o
2. Mantener ambos activos y enlazados, tal como está ahora (la web nueva no depende del Blogger para funcionar).

## Redirecciones 301
El dominio original solo tenía dos páginas (`index.html`, `platos.html`) más el Blogger externo. Al pasar a las URL nuevas (limpias, sin `.html`):

| URL antigua | URL nueva |
|---|---|
| `/index.html` (secciones por ancla: empresa, servicios, nutrición, contacto) | `/`, `/la-empresa/`, `/servicios/`, `/nutricion-innovacion/`, `/contacto/` |
| `/platos.html` | `/platos/` |
| `terkor.blogspot.com/*` (10 entradas) | `/blog/` + `/post-<slug>/` |

Configurar en el hosting final un 301 de `/platos.html` a `/platos/` y, si se decide, de las URL del Blogger a sus páginas equivalentes.

## Pendiente técnico
- Sustituir en `aviso-legal.html` los campos marcados como pendientes en cuanto Terkor confirme sus datos fiscales.
- Revisar el número de teléfono (650 971 404, recuperado de las firmas del blog) directamente con Terkor antes de publicar, por si ha cambiado desde 2018.
