"use strict";
const { pageHeader } = require("../layout.js");
const { SITE } = require("../nav.js");

function render() {
  return `
  ${pageHeader({
    eyebrowText: "Legal",
    title: "Aviso legal y privacidad",
    lead: "Información mínima exigida por la LSSI-CE. El sitio original no publicaba esta página; aquí se indica claramente qué datos de identificación faltan por confirmar.",
  })}

  <section class="section">
    <div class="container prose-block">
      <h2>Datos del titular</h2>
      <ul class="legal-list">
        <li><strong>Nombre comercial:</strong> Terkor</li>
        <li><strong>Actividad:</strong> Servicios de cocina y comedor para centros escolares, residencias y empresas.</li>
        <li><strong>Localidad:</strong> ${SITE.locality}, ${SITE.region}</li>
        <li><strong>Correo electrónico:</strong> ${SITE.email}</li>
        <li><strong>CIF / NIF, razón social completa y domicilio social:</strong> <em>pendientes de confirmar por el titular — ver PENDIENTE.md</em></li>
      </ul>

      <h2>Objeto</h2>
      <p>Este sitio web tiene carácter informativo: presenta la actividad de Terkor, sus servicios y sus menús. No procesa pagos ni almacena datos de usuarios en un servidor propio.</p>

      <h2>Formulario de contacto</h2>
      <p>El formulario de la página de contacto no envía datos a ningún servidor: compone un correo electrónico que el propio visitante decide enviar desde su programa de correo. Terkor solo recibe los datos que la persona decide finalmente enviar por esa vía.</p>

      <h2>Cookies</h2>
      <p>Esta versión del sitio no utiliza cookies propias de seguimiento ni de terceros. Si en el futuro se incorpora algún servicio que sí las use (mapas, vídeo, analítica), se avisará en esta misma página y se pedirá el consentimiento correspondiente.</p>

      <h2>Propiedad intelectual</h2>
      <p>Los textos, fotografías del propio Terkor y el logotipo son propiedad de Terkor. Las imágenes de terceros usadas como apoyo editorial en el blog se referencian en su entrada de origen.</p>
    </div>
  </section>
  `;
}

module.exports = {
  render,
  meta: {
    current: "/aviso-legal/",
    title: "Aviso legal y privacidad — Terkor",
    description: "Información legal de Terkor: identificación del titular, tratamiento del formulario de contacto y política de cookies.",
    canonical: "/aviso-legal/",
  },
};
