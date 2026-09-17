"use strict";
const { pageHeader, ctaBand, picture } = require("../layout.js");
const { eyebrow, icon } = require("../lib.js");
const { SITE } = require("../nav.js");
const { SERVICIOS } = require("../data.js");

function render() {
  const cards = SERVICIOS.map(
    (s, i) => `<li class="service-card">
      <span class="service-card__icon">${icon(s.icon, { size: 28 })}</span>
      <h2 class="service-card__title">${s.title}</h2>
      <p class="service-card__text">${s.text}</p>
    </li>`
  ).join("\n");

  return `
  ${pageHeader({
    eyebrowText: "Servicios",
    title: "Todo lo que rodea al comedor, resuelto",
    lead: "Además de cocinar cada día, nos ocupamos de la gestión de personal, la prevención de riesgos, los eventos especiales y el mantenimiento de las propias instalaciones.",
  })}

  <section class="section">
    <div class="container">
      <ul class="service-cards">${cards}</ul>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container split-media split-media--reverse">
      <figure class="split-media__figure">
        ${picture({ src: "innovacion-pasta", alt: "Plato de espaguetis a la boloñesa recién preparado" })}
      </figure>
      <div class="split-media__text">
        ${eyebrow("Maquinaria y limpieza")}
        <h2 class="section__title">La cocina, siempre a punto</h2>
        <p>Realizamos servicios de limpieza de todas las instalaciones y habitaciones del centro, y ofrecemos presupuestos e instalación de maquinaria industrial para cocinas: desde hornos y cámaras hasta los equipos de conservación diarios.</p>
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "¿Necesita alguno de estos servicios?",
    lead: "Le contamos cómo los integramos con el servicio de comedor de su centro.",
    ctas: [{ href: "/contacto/", label: "Escribir", icon: "mail" }],
  })}
  `;
}

module.exports = {
  render,
  meta: {
    current: "/servicios/",
    title: "Servicios — Terkor",
    description:
      "Traslado de personal, prevención de riesgos laborales, eventos especiales y limpieza e instalación de maquinaria de cocina. Servicios de Terkor en Madrid.",
    canonical: "/servicios/",
  },
};
