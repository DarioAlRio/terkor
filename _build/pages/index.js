"use strict";
const { hero, pageHeader, ctaBand, picture } = require("../layout.js");
const { icon, eyebrow } = require("../lib.js");
const { SITE } = require("../nav.js");
const { PILLARS, SERVICIOS, PLATOS, BLOG_POSTS } = require("../data.js");

function render() {
  const pillars = PILLARS.map(
    (p) => `<li class="pillar">
      <span class="pillar__n">${p.n}</span>
      <h3 class="pillar__title">${p.title}</h3>
      <p class="pillar__text">${p.text}</p>
    </li>`
  ).join("\n");

  const servicios = SERVICIOS.map(
    (s) => `<li class="mini-service">
      <span class="mini-service__icon">${icon(s.icon, { size: 22 })}</span>
      <div>
        <h3 class="mini-service__title">${s.title}</h3>
        <p class="mini-service__text">${s.text}</p>
      </div>
    </li>`
  ).join("\n");

  const platosSample = PLATOS.slice(0, 8)
    .map(
      (p) => `<li class="plato-thumb">
      ${picture({ src: `platos/${p.file}`, alt: p.caption, cls: "plato-thumb__media", loading: "lazy" })}
      <span class="plato-thumb__caption">${p.caption}</span>
    </li>`
    )
    .join("\n");

  const posts = BLOG_POSTS.slice(0, 3)
    .map((post) => {
      const firstImg = post.blocks.find((b) => b.type === "img");
      const excerptBlock = post.blocks.find((b) => b.type === "p");
      const excerpt = excerptBlock ? excerptBlock.html.replace(/<[^>]+>/g, "").slice(0, 140) + "…" : "";
      return `<li class="post-card">
        <a href="/post-${post.slug}/" class="post-card__link">
          ${firstImg ? picture({ src: `blog/${firstImg.local.replace(/\.[a-z]+$/i, "")}`, alt: firstImg.alt || post.title, cls: "post-card__media" }) : ""}
          <div class="post-card__body">
            <p class="post-card__date">${icon("calendar", { size: 14 })}<time datetime="${post.date}">${formatDate(post.date)}</time></p>
            <h3 class="post-card__title">${post.title}</h3>
            <p class="post-card__excerpt">${excerpt}</p>
          </div>
        </a>
      </li>`;
    })
    .join("\n");

  return `
  ${hero({
    eyebrowText: "Comedores escolares · residencias · empresas",
    title: "Cocina propia y nutrición seria, con 35 años de oficio",
    lead: SITE.description,
    ctas: [
      { href: "/contacto/", label: "Contactar", icon: "mail" },
      { href: "/platos/", label: "Ver nuestros platos", variant: "ghost" },
    ],
  })}

  <section class="section">
    <div class="container">
      ${eyebrow("La empresa")}
      <div class="split-heading">
        <h2 class="section__title">Un compromiso con cada centro que confía en nosotros</h2>
        <a href="/la-empresa/" class="link-more">Conoce Terkor ${icon("arrowRight", { size: 16 })}</a>
      </div>
      <ul class="pillars">${pillars}</ul>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container bento">
      <div class="bento__text">
        ${eyebrow("Servicios")}
        <h2 class="section__title">Más allá del menú del día</h2>
        <p class="section__lead">Cubrimos todo lo que un centro necesita alrededor del comedor: personal, prevención, eventos y el mantenimiento de la propia cocina.</p>
        <a href="/servicios/" class="link-more">Ver todos los servicios ${icon("arrowRight", { size: 16 })}</a>
      </div>
      <ul class="mini-services">${servicios}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split-heading">
        <div>
          ${eyebrow("Nutrición e innovación")}
          <h2 class="section__title">Dieta mediterránea, supervisada mes a mes</h2>
        </div>
        <a href="/nutricion-innovacion/" class="link-more">Cómo diseñamos los menús ${icon("arrowRight", { size: 16 })}</a>
      </div>
      <div class="nutri-teaser">
        ${picture({ src: "nutricion-aceite", alt: "Aceite de oliva virgen extra sobre una ensalada", cls: "nutri-teaser__img" })}
        ${picture({ src: "nutricion-pan", alt: "Pan recién horneado y espigas de trigo", cls: "nutri-teaser__img" })}
        <p class="nutri-teaser__quote"><span class="nutri-teaser__quote-icon">${icon("quote", { size: 28 })}</span><span>Elaboramos mensualmente una propuesta de menú basada en los estudios nutricionales de <strong>BIOTAB</strong>, aprovechando las ventajas de la dieta mediterránea estacional.</span></p>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="split-heading">
        <div>
          ${eyebrow("Platos")}
          <h2 class="section__title">Lo que comen cada día en nuestros centros</h2>
        </div>
        <a href="/platos/" class="link-more">Ver la galería completa ${icon("arrowRight", { size: 16 })}</a>
      </div>
      <ul class="platos-strip">${platosSample}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split-heading">
        <div>
          ${eyebrow("Blog")}
          <h2 class="section__title">Nutrición, temporada y vida escolar</h2>
        </div>
        <a href="/blog/" class="link-more">Ver todas las entradas ${icon("arrowRight", { size: 16 })}</a>
      </div>
      <ul class="post-grid">${posts}</ul>
    </div>
  </section>

  ${ctaBand({
    title: "¿Gestionas un centro escolar, una residencia o una empresa?",
    lead: "Cuéntanos tus necesidades de comedor y te preparamos una propuesta.",
    ctas: [{ href: "/contacto/", label: "Ir a contacto", icon: "mail" }],
  })}
  `;
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

module.exports = {
  render,
  meta: {
    current: "/",
    title: "Terkor — Servicios de cocina y comedor en Madrid",
    description: SITE.description,
    canonical: "/",
  },
};
