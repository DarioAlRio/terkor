// Contenido real del sitio, tal y como aparecía en terkor.es y en su blog.
// Nada de lo que hay aquí se inventa: ver _rastreo/ para la fuente exacta de cada texto.
"use strict";

const PILLARS = [
  {
    n: "01",
    title: "Eficacia",
    text:
      "Para nosotros el factor humano es muy importante, por ello mantenemos un diálogo continuo con nuestros clientes y empleados, para responder rápida y eficazmente a todas sus necesidades. Visitamos diariamente las empresas y residencias, para detectar y recibir de forma directa todas las observaciones que puedan mejorar nuestros servicios.",
  },
  {
    n: "02",
    title: "Calidad",
    text:
      "Seleccionamos cuidadosamente a todo nuestro equipo profesional, buscando el perfil que mejor se adapte a sus características y con un compromiso de evaluación y formación continuas. Y si lo desea, contamos con su personal de confianza y que actualmente trabaja con usted, asumiendo todas las gestiones laborales. Porque en Terkor sabemos que cada persona cuenta.",
  },
  {
    n: "03",
    title: "Seguridad",
    text:
      "Seleccionamos meticulosamente a nuestros proveedores y comprobamos personalmente el estado de la calidad de los alimentos. Controlamos que todos los procesos cumplan las normas higiénico-sanitarias, de acuerdo con la legislación vigente. Por eso todo nuestro personal cuenta con el carné de manipulador y conoce las normas de conservación, almacenamiento, envasado y distribución.",
  },
];

const SERVICIOS = [
  {
    title: "Traslado de personal",
    text: "Traslado de personal, ya sea por propuesta del centro o por necesidades de la empresa.",
    icon: "van",
  },
  {
    title: "Prevención de riesgos laborales",
    text: "Nuestra compañía se encarga de todo lo relativo a la prevención de riesgos laborales.",
    icon: "shield",
  },
  {
    title: "Eventos especiales",
    text: "Servicio adicional de eventos especiales en el propio centro.",
    icon: "sparkle",
  },
  {
    title: "Limpieza y maquinaria de cocina",
    text:
      "Realizamos servicios de limpieza de todas las instalaciones y habitaciones, y ofrecemos presupuestos e instalación de maquinaria industrial para cocinas.",
    icon: "sparkles-clean",
  },
];

const NUTRICION = {
  intro:
    "Las garantías de una buena salud, una buena nutrición. Elaboramos mensualmente una propuesta de menú basada en los estudios nutricionales de la empresa BIOTAB, que analiza y valora bromatológicamente, de forma periódica, todo nuestro trabajo.",
  proceso:
    "Estas propuestas son entregadas al centro para su aprobación aproximadamente 20 días antes de la finalización de cada mes, posibilitando cualquier cambio que considere la dirección. Adaptamos nuestros menús a las necesidades concretas de los alumnos teniendo en cuenta requisitos dietéticos especiales.",
  objetivo:
    "Nuestro objetivo es ofrecer una nutrición equilibrada aprovechando las ventajas de la dieta mediterránea estacional. ¡La especialidad de la casa!",
};

const INNOVACION = {
  text:
    "Innovación, con todo el sabor de la cocina tradicional. Seguimos las directrices de las investigaciones más actuales sobre salud y nutrición, adaptándonos día a día a los nuevos hábitos alimentarios para ofrecer una alimentación sana y equilibrada, aprovechando las ventajas de la dieta mediterránea estacional.",
  destacado: "En Terkor hacemos que el sabor y la salud estén en el mismo plato.",
};

// Fichas de plato.html — el pie de cada foto es el literal de la web original.
// plato3 y plato6 existían como archivo en el servidor pero sin ficha de texto.
const PLATOS = [
  { file: "plato1", caption: "Macarrones con tomate", extra: "Pescado empanado con ensalada" },
  { file: "plato2", caption: "Paella", extra: "Huevos al plato con ensalada" },
  { file: "plato17", caption: "Cocido completo" },
  { file: "plato4", caption: "Crema de calabacín con picatostes", extra: "Magro con tomate y pasta salteada" },
  { file: "plato5", caption: "Sopa de pollo", extra: "Escalope de pollo con queso y zanahorias baby" },
  { file: "plato9", caption: "Lentejas estofadas", extra: "Huevos moll con ensalada" },
  { file: "plato8", caption: "Guiso de judías blancas", extra: "Salchichas frescas con patatas fritas" },
  { file: "plato11", caption: "Spaguetti boloñesa", extra: "Emperador a la plancha con patatas alioli" },
  { file: "plato7", caption: "Puré de verduras", extra: "Pollo asado con pasta salteada" },
  { file: "plato3", caption: "Plato del menú" },
  { file: "plato10", caption: "Judías pintas", extra: "Jamoncitos de pollo asado con tomates al horno" },
  { file: "plato13", caption: "Sopa de ave", extra: "Albóndigas guisadas con patatas dado" },
  {
    file: "plato12",
    caption: "Comida de fiesta",
    extra: "Arroz tres delicias, burritos de pollo, donut y refrescos",
  },
  { file: "plato6", caption: "Plato del menú" },
  { file: "plato16", caption: "Crema de zanahoria", extra: "Cazón adobado y calamares con pasta salteada" },
  { file: "plato14", caption: "Sopa de ave", extra: "Lomos de bacalao con tomate y patatas" },
  { file: "plato15", caption: "Patatas a la riojana", extra: "Lomo a la plancha con calabacín salteado" },
  { file: "plato18", caption: "Gazpacho con guarnición", extra: "Pizza y croquetas caseras" },
  {
    file: "plato19",
    caption: "Garbanzos en ensalada",
    extra: "Redondo de ternera en salsa con berenjenas fritas",
  },
];

const BLOG_POSTS = require("../_rastreo/blog-posts-clean.json");

const BLOG_LABELS = {
  frituras: "Hábitos saludables",
  pescado: "Nutrición",
  primavera: "Temporada",
  "exámenes": "Rendimiento escolar",
  gluten: "Dietas especiales",
  celiacos: "Dietas especiales",
  "5 raciones fruta verdura": "Nutrición",
  "merienda cumpleaños": "Eventos",
};

module.exports = { PILLARS, SERVICIOS, NUTRICION, INNOVACION, PLATOS, BLOG_POSTS, BLOG_LABELS };
