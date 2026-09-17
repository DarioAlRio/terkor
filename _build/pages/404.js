"use strict";
const { icon } = require("../lib.js");

function render() {
  return `
  <section class="section notfound">
    <div class="container notfound__inner">
      <p class="notfound__code">404</p>
      <h1 class="section__title">Esta página no existe</h1>
      <p class="section__lead">Puede que el enlace esté anticuado. Pruebe desde el inicio o escríbanos si buscaba algo en concreto.</p>
      <div class="hero__ctas">
        <a href="/" class="btn btn--primary">${icon("arrowRight", { size: 18 })}<span>Ir al inicio</span></a>
        <a href="/contacto/" class="btn btn--ghost">${icon("mail", { size: 18 })}<span>Contactar</span></a>
      </div>
    </div>
  </section>
  `;
}

module.exports = {
  render,
  meta: {
    current: "/404.html",
    title: "Página no encontrada — Terkor",
    description: "La página solicitada no existe.",
    canonical: "/404.html",
  },
};
