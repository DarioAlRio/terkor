// Datos del negocio y estructura de navegación. Todo sale del rastreo en _rastreo/.
"use strict";

const SITE = {
  name: "Terkor",
  claim: "Servicios de cocina y comedor",
  domain: "https://www.terkor.es",
  legalName: "Terkor",
  email: "terkor@terkor.es",
  emailUser: "terkor",
  emailDomain: "terkor.es",
  phone: "650 971 404",
  phoneHref: "tel:+34650971404",
  whatsappHref: "https://wa.me/34650971404",
  locality: "Madrid",
  region: "Comunidad de Madrid",
  country: "España",
  since: 1989, // "35 años de experiencia" citado en 2018 (fecha del último post) => arranque aprox.
  description:
    "Terkor gestiona comedores para centros escolares, residencias y empresas de Madrid: cocina propia, menús supervisados por nutricionistas y más de 35 años de experiencia en el sector.",
  blogUrl: "https://terkor.blogspot.com",
};

const NAV = [
  { href: "index.html", label: "Inicio" },
  { href: "la-empresa.html", label: "La empresa" },
  { href: "servicios.html", label: "Servicios" },
  { href: "nutricion-innovacion.html", label: "Nutrición e innovación" },
  { href: "platos.html", label: "Platos" },
  { href: "blog.html", label: "Blog" },
  { href: "contacto.html", label: "Contacto" },
];

const FOOT = {
  columns: [
    {
      title: "Terkor",
      links: [
        { href: "la-empresa.html", label: "La empresa" },
        { href: "servicios.html", label: "Servicios" },
        { href: "nutricion-innovacion.html", label: "Nutrición e innovación" },
      ],
    },
    {
      title: "Contenido",
      links: [
        { href: "platos.html", label: "Platos" },
        { href: "blog.html", label: "Blog de nutrición" },
        { href: "contacto.html", label: "Contacto" },
      ],
    },
  ],
  legal: [{ href: "aviso-legal.html", label: "Aviso legal y privacidad" }],
};

module.exports = { SITE, NAV, FOOT };
