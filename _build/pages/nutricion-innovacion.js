"use strict";
const { pageHeader, ctaBand, picture } = require("../layout.js");
const { eyebrow, icon } = require("../lib.js");
const { SITE } = require("../nav.js");
const { NUTRICION, INNOVACION } = require("../data.js");

function render() {
  return `
  ${pageHeader({
    eyebrowText: "Nutrición e innovación",
    title: "La especialidad de la casa: comer bien, cada día",
    lead: NUTRICION.intro,
  })}

  <section class="section">
    <div class="container bento bento--imgFirst">
      <div class="bento__media">
        ${picture({ src: "nutricion-aceite", alt: "Aceite de oliva virgen extra sobre una ensalada verde" })}
        ${picture({ src: "nutricion-pan", alt: "Pan artesano recién horneado con espigas de trigo" })}
      </div>
      <div class="bento__text">
        ${eyebrow("El proceso")}
        <h2 class="section__title">Un menú, revisado antes de servirse</h2>
        <p>${NUTRICION.proceso}</p>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container prose-block prose-block--center">
      <span class="prose-block__icon">${icon("leaf", { size: 32 })}</span>
      <p class="prose-block__lead">${NUTRICION.objetivo}</p>
    </div>
  </section>

  <section class="section">
    <div class="container split-media">
      <figure class="split-media__figure">
        ${picture({ src: "innovacion-pasta", alt: "Plato de pasta con salsa boloñesa y albahaca fresca" })}
      </figure>
      <div class="split-media__text">
        ${eyebrow("Innovación")}
        <h2 class="section__title">Todo el sabor de la cocina tradicional</h2>
        <p>${INNOVACION.text}</p>
        <p class="prose-block__lead">${INNOVACION.destacado}</p>
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "¿Tiene alumnos o residentes con necesidades dietéticas especiales?",
    lead: "Adaptamos los menús a requisitos concretos: cuéntenos el caso.",
    ctas: [
      { href: SITE.phoneHref, label: `Llamar · ${SITE.phone}`, icon: "phone" },
      { href: "/blog/", label: "Leer el blog de nutrición", variant: "ghost" },
    ],
  })}
  `;
}

module.exports = {
  render,
  meta: {
    current: "/nutricion-innovacion/",
    title: "Nutrición e innovación — Terkor",
    description:
      "Menús mensuales supervisados por estudios nutricionales de BIOTAB, dieta mediterránea estacional y adaptación a necesidades dietéticas especiales.",
    canonical: "/nutricion-innovacion/",
  },
};
