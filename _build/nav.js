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
  locality: "Madrid",
  region: "Comunidad de Madrid",
  country: "España",
  since: 1989, // "35 años de experiencia" citado en 2018 (fecha del último post) => arranque aprox.
  description:
    "Terkor gestiona comedores para centros escolares, residencias y empresas de Madrid: cocina propia, menús supervisados por nutricionistas y más de 35 años de experiencia en el sector.",
  blogUrl: "https://terkor.blogspot.com",
};

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/la-empresa/", label: "La empresa" },
  { href: "/servicios/", label: "Servicios" },
  { href: "/nutricion-innovacion/", label: "Nutrición e innovación" },
  { href: "/platos/", label: "Platos" },
  { href: "https://terkor.blogspot.com", label: "Blog", external: true },
  { href: "/contacto/", label: "Contacto" },
];

const FOOT = {
  columns: [
    {
      title: "Terkor",
      links: [
        { href: "/la-empresa/", label: "La empresa" },
        { href: "/servicios/", label: "Servicios" },
        { href: "/nutricion-innovacion/", label: "Nutrición e innovación" },
      ],
    },
    {
      title: "Contenido",
      links: [
        { href: "/platos/", label: "Platos" },
        { href: "https://terkor.blogspot.com", label: "Blog de nutrición", external: true },
        { href: "/contacto/", label: "Contacto" },
      ],
    },
  ],
  legal: [{ href: "/aviso-legal/", label: "Aviso legal y privacidad" }],
};

module.exports = { SITE, NAV, FOOT };
