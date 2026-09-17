"use strict";
const { pageHeader, ctaBand, picture } = require("../layout.js");
const { SITE } = require("../nav.js");
const { PLATOS } = require("../data.js");

function render() {
  const items = PLATOS.map((p, i) => {
    const caption = p.extra ? `${p.caption} · ${p.extra}` : p.caption;
    return `<li class="gallery__item">
      <button type="button" class="gallery__btn" data-lightbox-open data-index="${i}">
        ${picture({ src: `platos/${p.file}`, alt: caption, cls: "gallery__media" })}
        <span class="gallery__caption">${p.caption}</span>
      </button>
    </li>`;
  }).join("\n");

  const dialogSlides = PLATOS.map((p, i) => {
    const caption = p.extra ? `${p.caption} · ${p.extra}` : p.caption;
    return `<figure class="lightbox__slide" data-slide="${i}" ${i === 0 ? "" : "hidden"}>
      ${picture({ src: `platos/${p.file}`, alt: caption, loading: "eager" })}
      <figcaption>${caption}</figcaption>
    </figure>`;
  }).join("\n");

  return `
  ${pageHeader({
    eyebrowText: "Platos",
    title: "Lo que comen a diario los niños de nuestros centros",
    lead: "En esta sección mostramos algunos de los menús reales que servimos. Porque en Terkor sabemos satisfacer a los paladares más exigentes.",
  })}

  <section class="section">
    <div class="container">
      <ul class="gallery">${items}</ul>
    </div>
  </section>

  ${ctaBand({
    title: "¿Quiere ver el menú completo del mes?",
    lead: "Se lo enviamos junto con la propuesta nutricional de su centro.",
    ctas: [
      { href: SITE.phoneHref, label: `Llamar · ${SITE.phone}`, icon: "phone" },
      { href: "/contacto/", label: "Pedir información", variant: "ghost" },
    ],
  })}

  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Galería de platos" hidden>
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__frame">
      <button type="button" class="lightbox__close" data-lightbox-close aria-label="Cerrar galería">&times;</button>
      <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="Plato anterior">&#8249;</button>
      ${dialogSlides}
      <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="Plato siguiente">&#8250;</button>
    </div>
  </div>
  `;
}

module.exports = {
  render,
  meta: {
    current: "/platos/",
    title: "Platos — Terkor",
    description: "Galería real de los menús que Terkor sirve cada día en comedores escolares, residencias y empresas de Madrid.",
    canonical: "/platos/",
  },
};
