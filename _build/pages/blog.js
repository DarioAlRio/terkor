"use strict";
const { pageHeader, ctaBand, picture } = require("../layout.js");
const { icon, eyebrow } = require("../lib.js");
const { SITE } = require("../nav.js");
const { BLOG_POSTS, BLOG_LABELS } = require("../data.js");

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

function labelFor(post) {
  const tag = post.labels && post.labels[0];
  return BLOG_LABELS[tag] || "Nutrición";
}

function excerptOf(post) {
  const p = post.blocks.find((b) => b.type === "p");
  if (!p) return "";
  const text = p.html.replace(/<[^>]+>/g, "");
  return text.length > 150 ? text.slice(0, 150).trim() + "…" : text;
}

function renderBlocks(blocks) {
  return blocks
    .map((b) => {
      if (b.type === "p") return `<p>${b.html}</p>`;
      if (b.type === "list") return b.html;
      if (b.type === "quote") return `<blockquote class="post-quote">${icon("quote", { size: 22 })}<p>${b.html}</p></blockquote>`;
      if (b.type === "img") {
        const base = b.local.replace(/\.[a-z]+$/i, "");
        return `<figure class="post-figure">
          ${picture({ src: `blog/${base}`, alt: b.alt || "" })}
          ${b.caption ? `<figcaption>${b.caption}</figcaption>` : ""}
        </figure>`;
      }
      return "";
    })
    .join("\n");
}

function renderIndex() {
  const cards = BLOG_POSTS.map((post) => {
    const firstImg = post.blocks.find((b) => b.type === "img");
    return `<li class="post-card">
      <a href="/post-${post.slug}/" class="post-card__link">
        ${firstImg ? picture({ src: `blog/${firstImg.local.replace(/\.[a-z]+$/i, "")}`, alt: firstImg.alt || post.title, cls: "post-card__media" }) : ""}
        <div class="post-card__body">
          <p class="post-card__date">${icon("calendar", { size: 14 })}<time datetime="${post.date}">${formatDate(post.date)}</time><span class="post-card__label">${labelFor(post)}</span></p>
          <h2 class="post-card__title">${post.title}</h2>
          <p class="post-card__excerpt">${excerptOf(post)}</p>
        </div>
      </a>
    </li>`;
  }).join("\n");

  return `
  ${pageHeader({
    eyebrowText: "Blog",
    title: "Nutrición, temporada y vida escolar",
    lead: "Artículos sobre alimentación infantil publicados originalmente en el blog de Terkor.",
  })}
  <section class="section">
    <div class="container">
      <ul class="post-grid post-grid--index">${cards}</ul>
    </div>
  </section>
  ${ctaBand({
    title: "¿Alguna duda sobre los menús de su centro?",
    lead: "Nuestro equipo de nutrición le atiende directamente.",
    ctas: [
      { href: "/contacto/", label: "Contactar", icon: "mail" },
      { href: "/nutricion-innovacion/", label: "Cómo diseñamos los menús", variant: "ghost" },
    ],
  })}
  `;
}

function renderPost(post, { prev, next }) {
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedHtml = related
    .map(
      (r) => `<li><a href="/post-${r.slug}/">${r.title}</a></li>`
    )
    .join("\n");

  return `
  <article class="post">
    <header class="post-header">
      <div class="container">
        <p class="eyebrow"><span class="eyebrow__tick" aria-hidden="true"></span>${labelFor(post)}</p>
        <h1 class="post-header__title">${post.title}</h1>
        <p class="post-header__meta">${icon("calendar", { size: 15 })}<time datetime="${post.date}">${formatDate(post.date)}</time></p>
      </div>
    </header>
    <div class="container post__body prose-block">
      ${renderBlocks(post.blocks)}
    </div>
    <nav class="post-pager container" aria-label="Más entradas">
      ${prev ? `<a href="/post-${prev.slug}/" class="post-pager__link post-pager__link--prev">${icon("chevronLeft", { size: 16 })}<span>${prev.title}</span></a>` : "<span></span>"}
      ${next ? `<a href="/post-${next.slug}/" class="post-pager__link post-pager__link--next"><span>${next.title}</span>${icon("chevronRight", { size: 16 })}</a>` : "<span></span>"}
    </nav>
    <aside class="container post-related">
      <h2 class="section__title section__title--sm">También te puede interesar</h2>
      <ul class="post-related__list">${relatedHtml}</ul>
    </aside>
  </article>
  `;
}

function allPosts() {
  return BLOG_POSTS.map((post, i) => ({
    render: () => renderPost(post, { prev: BLOG_POSTS[i - 1], next: BLOG_POSTS[i + 1] }),
    meta: {
      current: `/post-${post.slug}/`,
      title: `${post.title} — Blog Terkor`,
      description: excerptOf(post),
      canonical: `/post-${post.slug}/`,
      ogImage: (() => {
        const img = post.blocks.find((b) => b.type === "img");
        return img ? `/assets/img/blog/${img.local.replace(/\.[a-z]+$/i, "")}.jpg` : undefined;
      })(),
    },
  }));
}

module.exports = {
  render: renderIndex,
  meta: {
    current: "/blog/",
    title: "Blog — Terkor",
    description: "Artículos de Terkor sobre nutrición infantil, alimentación de temporada y vida escolar.",
    canonical: "/blog/",
  },
  allPosts,
};
