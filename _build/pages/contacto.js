"use strict";
const { pageHeader } = require("../layout.js");
const { icon, eyebrow, correoOfuscado } = require("../lib.js");
const { SITE } = require("../nav.js");

function render() {
  return `
  ${pageHeader({
    eyebrowText: "Contacto",
    title: "Hablemos de su comedor",
    lead: "Prepare un correo con el formulario o escríbanos directamente. Le respondemos a la mayor brevedad.",
  })}

  <section class="section">
    <div class="container contact-grid">
      <ul class="contact-cards">
        <li class="contact-card">
          <span class="contact-card__icon">${icon("mail", { size: 24 })}</span>
          <h2 class="contact-card__title">Correo</h2>
          <p class="contact-card__text">Para propuestas, presupuestos o dudas por escrito.</p>
          ${correoOfuscado(SITE.emailUser, SITE.emailDomain, { cls: "btn btn--primary", label: "Ver dirección de correo" })}
        </li>
      </ul>

      <form class="contact-form" id="contact-form" novalidate>
        ${eyebrow("Escribir un correo")}
        <h2 class="section__title">Preparamos el correo por usted</h2>
        <p class="contact-form__hint">Rellene estos datos y se abrirá su programa de correo con el mensaje ya redactado, listo para enviar a ${SITE.email}. No se envía nada desde esta página.</p>

        <div class="field">
          <label for="cf-nombre">Nombre</label>
          <input id="cf-nombre" name="nombre" type="text" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="cf-centro">Centro o empresa (opcional)</label>
          <input id="cf-centro" name="centro" type="text" autocomplete="organization">
        </div>
        <div class="field">
          <label for="cf-mensaje">Mensaje</label>
          <textarea id="cf-mensaje" name="mensaje" rows="5" required></textarea>
        </div>
        <!-- Trampa antispam: los bots suelen rellenar todos los campos, las personas no ven este. -->
        <div class="field field--trap" aria-hidden="true">
          <label for="cf-web">No rellenar este campo</label>
          <input id="cf-web" name="web" type="text" tabindex="-1" autocomplete="off">
        </div>

        <div class="contact-form__actions">
          <button type="submit" class="btn btn--primary">${icon("mail", { size: 16 })}<span>Redactar correo</span></button>
        </div>
        <p class="contact-form__status" role="status" aria-live="polite" data-form-status hidden></p>
      </form>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container contact-info">
      <div>
        ${icon("pin", { size: 20 })}
        <p>Terkor presta servicio de comedor en centros escolares, residencias y empresas de ${SITE.locality} y su área metropolitana.</p>
      </div>
    </div>
  </section>
  `;
}

module.exports = {
  render,
  meta: {
    current: "/contacto/",
    title: "Contacto — Terkor",
    description: `Contacte con Terkor por correo electrónico o formulario. Servicios de cocina y comedor en ${SITE.locality}.`,
    canonical: "/contacto/",
  },
};
