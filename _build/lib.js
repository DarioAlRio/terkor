// Iconos SVG en línea (currentColor) y pequeños componentes reutilizables.
"use strict";

const ICONS = {
  menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`,
  close: `<path d="M6 6l12 12M18 6L6 18"/>`,
  phone: `<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/>`,
  mail: `<path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="m3.5 6 8.5 7 8.5-7"/>`,
  whatsapp: `<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.6c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.6 1.6.6 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.5.3.1.5.1.6-.1l.6-.7c.2-.3.4-.2.6-.1l1.5.7c.2.1.3.2.4.3.1.2.1.9-.2 1.4-.3.6-1.5 1.1-2.1 1.1-.6 0-1.3.2-4-1-2.8-1.2-4.5-4.1-4.6-4.3-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.8-2z"/>`,
  pin: `<path d="M12 21s7-6.1 7-11.5S15.9 2 12 2 5 4.6 5 9.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
  chevronRight: `<path d="m9 6 6 6-6 6"/>`,
  chevronLeft: `<path d="m15 6-6 6 6 6"/>`,
  chevronDown: `<path d="m6 9 6 6 6-6"/>`,
  arrowRight: `<path d="M4 12h16M14 6l6 6-6 6"/>`,
  check: `<path d="m5 13 4 4L19 7"/>`,
  tag: `<path d="M20 12.5 12.5 20a1.5 1.5 0 0 1-2.1 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.1L11.5 4H19a1 1 0 0 1 1 1v7.5z"/><circle cx="15.5" cy="8.5" r="1.3"/>`,
  van: `<path d="M3 7h11v9H3z"/><path d="M14 11h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>`,
  shield: `<path d="M12 3l7 3v5c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6z"/><path d="m9 12 2 2 4-4"/>`,
  sparkle: `<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>`,
  clean: `<path d="M7 21c-2-2-2-5 0-7l7-7 5 5-7 7c-2 2-5 2-7 0z"/><path d="m14 7 3-3 3 3-3 3"/>`,
  leaf: `<path d="M4 20c8 0 14-6 14-14 0-1 0-2-.2-3C9.8 3.4 4 9 4 17c0 1 0 2 .2 3z"/><path d="M4 20 16 8"/>`,
  gallery: `<rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5.5-5.5L4 21"/>`,
  calendar: `<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/>`,
  quote: `<path d="M7 11c0-3 2-5 5-5v2c-2 0-3 1-3 3h3v6H7v-6z"/><path d="M14 11c0-3 2-5 5-5v2c-2 0-3 1-3 3h3v6h-5v-6z"/>`,
};

function icon(name, { cls = "", size = 24 } = {}) {
  const body = ICONS[name] || "";
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// Marca: cinta rosa + wordmark, en HTML/CSS real (no rasteriza el logo antiguo).
function brandmark({ tag = "div", cls = "" } = {}) {
  return `<${tag} class="brand ${cls}"><span class="brand__ribbon" aria-hidden="true"></span><span class="brand__word">Terkor</span></${tag}>`;
}

function eyebrow(text) {
  return `<p class="eyebrow"><span class="eyebrow__tick" aria-hidden="true"></span>${text}</p>`;
}

function correoOfuscado(user, domain, { cls = "", label } = {}) {
  return `<a href="#" class="ofusc ${cls}" data-correo="${user}|${domain}">${label || "Ver correo"}</a>`;
}

module.exports = { icon, brandmark, eyebrow, correoOfuscado, ICONS };
