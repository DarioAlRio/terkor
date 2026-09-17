"use strict";
const { SITE, NAV, FOOT } = require("./nav.js");
const { icon, brandmark, correoOfuscado } = require("./lib.js");

function picture({ src, alt, cls = "", sizes = "", widthAttr, heightAttr, loading = "lazy", fetchpriority }) {
  const w = widthAttr ? ` width="${widthAttr}"` : "";
  const h = heightAttr ? ` height="${heightAttr}"` : "";
  const fp = fetchpriority ? ` fetchpriority="${fetchpriority}"` : "";
  const sz = sizes ? ` sizes="${sizes}"` : "";
  return `<picture class="${cls}">
    <source srcset="/assets/img/${src}.webp" type="image/webp"${sz}>
    <img src="/assets/img/${src}.jpg" alt="${alt}"${w}${h} loading="${loading}" decoding="async"${fp}>
  </picture>`;
}

function head({ title, description, canonical, ogImage = "/assets/img/hero-mercado.jpg", jsonLd = [] }) {
  const ld = jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join("\n");
  return `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${SITE.domain}${canonical}">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#dc2b6e">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Terkor">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE.domain}${ogImage}">
  <meta property="og:url" content="${SITE.domain}${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Karla:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/site.css">
  <script>document.documentElement.className += ' js';</script>
  ${ld}`;
}

function header(current) {
  const items = NAV.map((item) => {
    const active = item.href === current ? ` aria-current="page"` : "";
    return `<li><a href="${item.href}" class="nav__link${item.href === current ? " is-active" : ""}"${active}>${item.label}</a></li>`;
  }).join("\n");
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header" id="site-header">
    <div class="site-header__bar container">
      <a href="/" class="brand-link" aria-label="Terkor — inicio">${brandmark()}</a>
      <nav class="nav nav--desktop" aria-label="Principal">
        <ul class="nav__list">${items}</ul>
      </nav>
      <div class="site-header__actions">
        <a href="${SITE.phoneHref}" class="btn btn--ghost btn--sm nav__phone">${icon("phone", { size: 18 })}<span>${SITE.phone}</span></a>
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-drawer">
          ${icon("menu", { cls: "menu-toggle__open" })}
          ${icon("close", { cls: "menu-toggle__close" })}
          <span class="sr-only">Abrir menú</span>
        </button>
      </div>
    </div>
  </header>
  <div class="drawer" id="mobile-drawer" aria-hidden="true">
    <nav class="drawer__nav" aria-label="Menú móvil">
      <ul class="drawer__list">
        ${NAV.map((item) => `<li><a href="${item.href}" class="drawer__link${item.href === current ? " is-active" : ""}">${item.label}</a></li>`).join("\n")}
      </ul>
      <div class="drawer__contact">
        <a href="${SITE.phoneHref}" class="btn btn--primary">${icon("phone", { size: 18 })}<span>Llamar: ${SITE.phone}</span></a>
        <a href="${SITE.whatsappHref}" class="btn btn--ghost">${icon("whatsapp", { size: 18 })}<span>WhatsApp</span></a>
      </div>
    </nav>
  </div>
  <div class="drawer-backdrop" data-drawer-backdrop></div>`;
}

function mobileBar() {
  return `<div class="mobile-cta-bar" aria-label="Contacto rápido">
    <a href="${SITE.phoneHref}" class="mobile-cta-bar__item">${icon("phone", { size: 20 })}<span>Llamar</span></a>
    <a href="${SITE.whatsappHref}" class="mobile-cta-bar__item">${icon("whatsapp", { size: 20 })}<span>WhatsApp</span></a>
    <a href="/contacto/" class="mobile-cta-bar__item mobile-cta-bar__item--accent">${icon("mail", { size: 20 })}<span>Contacto</span></a>
  </div>`;
}

function footer() {
  const cols = FOOT.columns
    .map(
      (col) => `<div class="footer__col">
      <h3 class="footer__heading">${col.title}</h3>
      <ul class="footer__list">${col.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
    </div>`
    )
    .join("\n");
  return `<footer class="site-footer">
    <div class="site-footer__band">
      <picture>
        <source srcset="/assets/img/footer-verduras.webp" type="image/webp">
        <img src="/assets/img/footer-verduras.jpg" alt="" loading="lazy" decoding="async">
      </picture>
      <div class="site-footer__band-fade" aria-hidden="true"></div>
    </div>
    <div class="container footer__grid">
      <div class="footer__col footer__col--brand">
        ${brandmark({ cls: "brand--footer" })}
        <p class="footer__claim">${SITE.claim} en ${SITE.locality}.</p>
        <ul class="footer__contact">
          <li><a href="${SITE.phoneHref}">${icon("phone", { size: 16 })}<span>${SITE.phone}</span></a></li>
          <li>${correoOfuscado(SITE.emailUser, SITE.emailDomain, { label: "Escribir un correo" })}</li>
          <li>${icon("pin", { size: 16 })}<span>${SITE.locality}, ${SITE.region}</span></li>
        </ul>
      </div>
      ${cols}
    </div>
    <div class="container footer__bottom">
      <p>&copy; <span data-year></span> Terkor — ${SITE.claim}.</p>
      <ul class="footer__legal">${FOOT.legal.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
    </div>
  </footer>
  ${mobileBar()}`;
}

function hero({ eyebrowText, title, lead, ctas = [], image = "hero-mercado", compact = false }) {
  return `<section class="hero ${compact ? "hero--compact" : ""}">
    <picture class="hero__media">
      <source srcset="/assets/img/${image}.webp" type="image/webp">
      <img src="/assets/img/${image}.jpg" alt="" loading="eager" decoding="async" fetchpriority="high">
    </picture>
    <div class="hero__scrim" aria-hidden="true"></div>
    <div class="container hero__content">
      ${eyebrowText ? `<p class="eyebrow eyebrow--onHero"><span class="eyebrow__tick" aria-hidden="true"></span>${eyebrowText}</p>` : ""}
      <h1 class="hero__title">${title}</h1>
      ${lead ? `<p class="hero__lead">${lead}</p>` : ""}
      ${
        ctas.length
          ? `<div class="hero__ctas">${ctas
              .map((c) => `<a href="${c.href}" class="btn ${c.variant === "ghost" ? "btn--ghost-onDark" : "btn--primary"}">${c.icon ? icon(c.icon, { size: 18 }) : ""}<span>${c.label}</span></a>`)
              .join("")}</div>`
          : ""
      }
    </div>
  </section>`;
}

function pageHeader({ eyebrowText, title, lead }) {
  return `<section class="page-header">
    <div class="container">
      ${eyebrowText ? `<p class="eyebrow"><span class="eyebrow__tick" aria-hidden="true"></span>${eyebrowText}</p>` : ""}
      <h1 class="page-header__title">${title}</h1>
      ${lead ? `<p class="page-header__lead">${lead}</p>` : ""}
    </div>
  </section>`;
}

function ctaBand({ title, lead, ctas }) {
  return `<section class="cta-band">
    <div class="container cta-band__inner">
      <div>
        <h2 class="cta-band__title">${title}</h2>
        ${lead ? `<p class="cta-band__lead">${lead}</p>` : ""}
      </div>
      <div class="cta-band__ctas">
        ${ctas.map((c) => `<a href="${c.href}" class="btn ${c.variant === "ghost" ? "btn--ghost-onDark" : "btn--primary"}">${c.icon ? icon(c.icon, { size: 18 }) : ""}<span>${c.label}</span></a>`).join("")}
      </div>
    </div>
  </section>`;
}

function shell({ current, title, description, canonical, bodyClass = "", content, jsonLd = [], ogImage }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
${head({ title, description, canonical, jsonLd, ogImage })}
</head>
<body class="${bodyClass}">
${header(current)}
<main id="contenido">
${content}
</main>
${footer()}
<script src="/assets/js/site.js"></script>
</body>
</html>
`;
}

module.exports = { shell, hero, pageHeader, ctaBand, picture, head, header, footer };
