"use strict";
const { pageHeader, ctaBand, picture } = require("../layout.js");
const { eyebrow, icon } = require("../lib.js");
const { SITE } = require("../nav.js");
const { PILLARS } = require("../data.js");

function render() {
  const pillars = PILLARS.map(
    (p) => `<li class="pillar pillar--card">
      <span class="pillar__n">${p.n}</span>
      <h2 class="pillar__title">${p.title}</h2>
      <p class="pillar__text">${p.text}</p>
    </li>`
  ).join("\n");

  return `
  ${pageHeader({
    eyebrowText: "La empresa",
    title: "Comedores que cuidan hasta el último detalle",
    lead: "Terkor es una compañía comprometida con los centros escolares, residencias y empresas madrileñas para que sus servicios de comedor alcancen los más altos niveles de nutrición, calidad e higiene.",
  })}

  <section class="section">
    <div class="container prose-block">
      <p>La amplia experiencia adquirida por nuestra dirección durante <strong>35 años</strong> en las más prestigiosas compañías del sector, junto a un gran equipo de profesionales, está a su servicio.</p>
      <p class="prose-block__lead">Porque en Terkor sabemos satisfacer a los paladares más exigentes.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${eyebrow("Nuestros principios")}
      <h2 class="section__title">Tres pilares, un mismo compromiso</h2>
      <ul class="pillars pillars--grid">${pillars}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container split-media">
      <figure class="split-media__figure">
        ${picture({ src: "servicios-cocina", alt: "Cocina industrial de Terkor con personal preparando el menú" })}
      </figure>
      <div class="split-media__text">
        ${eyebrow("Cómo trabajamos")}
        <h2 class="section__title">Diálogo continuo con cada centro</h2>
        <p>Visitamos diariamente las empresas y residencias para detectar y recibir de forma directa todas las observaciones que puedan mejorar nuestros servicios. Seleccionamos con cuidado a cada profesional y, si lo desea el centro, incorporamos también a su personal de confianza, asumiendo todas las gestiones laborales.</p>
        <p>Todo nuestro personal cuenta con el carné de manipulador de alimentos y conoce las normas de conservación, almacenamiento, envasado y distribución vigentes.</p>
      </div>
    </div>
  </section>

  ${ctaBand({
    title: "Hablemos de su comedor",
    lead: "Cuéntenos las particularidades de su centro y adaptamos el servicio a sus necesidades.",
    ctas: [
      { href: SITE.phoneHref, label: `Llamar · ${SITE.phone}`, icon: "phone" },
      { href: "servicios.html", label: "Ver servicios", variant: "ghost" },
    ],
  })}
  `;
}

module.exports = {
  render,
  meta: {
    current: "la-empresa.html",
    title: "La empresa — Terkor",
    description:
      "Terkor: 35 años de experiencia gestionando comedores para centros escolares, residencias y empresas de Madrid con eficacia, calidad y seguridad alimentaria.",
    canonical: "la-empresa.html",
  },
};
