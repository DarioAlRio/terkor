#!/usr/bin/env node
// Genera todas las páginas .html + sitemap.xml + robots.txt a partir de _build/.
// El HTML resultante NO se edita a mano: se edita _build/ y se vuelve a ejecutar `node build.js`.
"use strict";
const fs = require("fs");
const path = require("path");
const { shell } = require("./_build/layout.js");
const { SITE } = require("./_build/nav.js");

const ROOT = __dirname;

const staticPages = [
  require("./_build/pages/index.js"),
  require("./_build/pages/la-empresa.js"),
  require("./_build/pages/servicios.js"),
  require("./_build/pages/nutricion-innovacion.js"),
  require("./_build/pages/platos.js"),
  require("./_build/pages/blog.js"),
  require("./_build/pages/contacto.js"),
  require("./_build/pages/aviso-legal.js"),
];

const blogModule = require("./_build/pages/blog.js");
const postPages = blogModule.allPosts();

const jsonLdByPage = {
  "index.html": [
    {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      name: "Terkor",
      description: SITE.description,
      email: SITE.email,
      telephone: SITE.phone,
      url: SITE.domain,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: "ES",
      },
      areaServed: `${SITE.locality} y área metropolitana`,
      sameAs: [SITE.blogUrl],
    },
  ],
};

const allPages = [...staticPages, ...postPages];

function buildPage(pageDef) {
  const { meta, render } = pageDef;
  const html = shell({
    current: meta.current,
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
    jsonLd: jsonLdByPage[meta.canonical] || [],
    content: render(),
  });
  fs.writeFileSync(path.join(ROOT, meta.current), html, "utf8");
  return meta.current;
}

const written = allPages.map(buildPage);

// 404
const notFound = require("./_build/pages/404.js");
fs.writeFileSync(
  path.join(ROOT, "404.html"),
  shell({
    current: "",
    title: notFound.meta.title,
    description: notFound.meta.description,
    canonical: notFound.meta.canonical,
    content: notFound.render(),
  }),
  "utf8"
);
written.push("404.html");

// sitemap.xml
const priority = (file) => {
  if (file === "index.html") return "1.0";
  if (file.startsWith("post-")) return "0.5";
  if (file === "aviso-legal.html") return "0.3";
  return "0.8";
};
const sitemapEntries = written
  .filter((f) => f !== "404.html")
  .map(
    (f) => `  <url>
    <loc>${SITE.domain}/${f}</loc>
    <priority>${priority(f)}</priority>
  </url>`
  )
  .join("\n");
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
  "utf8"
);

// robots.txt
fs.writeFileSync(
  path.join(ROOT, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap.xml\n`,
  "utf8"
);

// ---- Verificación: enlaces internos e imágenes referenciadas deben existir ----
let errors = [];
const knownFiles = new Set(written.concat(["sitemap.xml", "robots.txt"]));

for (const file of written) {
  const html = fs.readFileSync(path.join(ROOT, file), "utf8");
  // Solo <a href="...">: los <link>/<meta> (CSS, favicon, canonical, og:image) son recursos, no páginas.
  const aHrefRe = /<a\b[^>]*\shref="([^"]+)"/g;
  let m;
  while ((m = aHrefRe.exec(html))) {
    const href = m[1];
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || href === "/") continue;
    if (!knownFiles.has(href)) {
      errors.push(`${file}: enlace interno roto -> ${href}`);
    }
  }
  // Cualquier atributo src= (img, script) y los href de <link> a recursos locales (css, favicon).
  const srcRe = /\ssrc="([^"]+)"/g;
  while ((m = srcRe.exec(html))) {
    const src = m[1];
    if (src.startsWith("http")) continue;
    if (!fs.existsSync(path.join(ROOT, src))) errors.push(`${file}: imagen o script no encontrado -> ${src}`);
  }
  const linkHrefRe = /<link\b[^>]*\shref="([^"]+)"/g;
  while ((m = linkHrefRe.exec(html))) {
    const href = m[1];
    if (href.startsWith("http")) continue;
    if (!fs.existsSync(path.join(ROOT, href))) errors.push(`${file}: recurso <link> no encontrado -> ${href}`);
  }
}

if (errors.length) {
  console.error(`\n✗ ${errors.length} problema(s) de enlaces/imágenes:\n`);
  errors.forEach((e) => console.error(" - " + e));
  process.exit(1);
}

console.log(`✓ ${written.length} páginas generadas, sitemap.xml y robots.txt escritos. Sin enlaces ni imágenes rotas.`);
