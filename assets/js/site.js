/* Terkor — JS del sitio. IIFE conservador, sin módulos ES, sin dependencias.
   El sitio es completamente navegable con JavaScript desactivado: esto solo
   añade mejoras (menú móvil, lightbox, ofuscación de correo, animación). */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function trapFocus(container, evt) {
    var focusables = container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (evt.shiftKey && document.activeElement === first) {
      evt.preventDefault();
      last.focus();
    } else if (!evt.shiftKey && document.activeElement === last) {
      evt.preventDefault();
      first.focus();
    }
  }

  /* ---------- Año en el pie ---------- */
  ready(function () {
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- Menú móvil (drawer) ---------- */
  ready(function () {
    var toggle = document.querySelector(".menu-toggle");
    var drawer = document.getElementById("mobile-drawer");
    var backdrop = document.querySelector("[data-drawer-backdrop]");
    if (!toggle || !drawer || !backdrop) return;
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      drawer.classList.add("is-open");
      backdrop.classList.add("is-open");
      drawer.removeAttribute("aria-hidden");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var firstLink = drawer.querySelector("a, button");
      if (firstLink) firstLink.focus();
    }
    function close() {
      drawer.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) close();
      else open();
    });
    backdrop.addEventListener("click", close);
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if (e.key === "Tab") trapFocus(drawer, e);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  });

  /* ---------- Correo ofuscado ---------- */
  ready(function () {
    document.querySelectorAll("[data-correo]").forEach(function (el) {
      var parts = el.getAttribute("data-correo").split("|");
      if (parts.length !== 2) return;
      var address = parts[0] + "@" + parts[1];
      el.setAttribute("href", "mailto:" + address);
    });
  });

  /* ---------- Formulario de contacto: compone mailto / WhatsApp, no envía nada ---------- */
  ready(function () {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");

    function buildMessage() {
      var nombre = form.nombre.value.trim();
      var centro = form.centro.value.trim();
      var mensaje = form.mensaje.value.trim();
      var lines = [];
      if (nombre) lines.push("Nombre: " + nombre);
      if (centro) lines.push("Centro/empresa: " + centro);
      lines.push("");
      lines.push(mensaje);
      return { subject: "Contacto desde la web — " + (centro || nombre || "Terkor"), body: lines.join("\n") };
    }

    function isSpam() {
      return !!(form.web && form.web.value);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (isSpam()) return;
      if (!form.nombre.value.trim() || !form.mensaje.value.trim()) {
        if (status) {
          status.hidden = false;
          status.textContent = "Rellena al menos tu nombre y el mensaje.";
        }
        return;
      }
      var msg = buildMessage();
      var mailto =
        "mailto:terkor@terkor.es?subject=" + encodeURIComponent(msg.subject) + "&body=" + encodeURIComponent(msg.body);
      window.location.href = mailto;
      if (status) {
        status.hidden = false;
        status.textContent = "Se ha abierto tu programa de correo con el mensaje listo para enviar.";
      }
    });

    var waBtn = form.querySelector("[data-whatsapp-fill]");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (isSpam()) return;
        var msg = buildMessage();
        var text = msg.subject + "\n\n" + msg.body;
        window.open("https://wa.me/34650971404?text=" + encodeURIComponent(text), "_blank", "noopener");
      });
    }
  });

  /* ---------- Galería de platos: lightbox accesible ---------- */
  ready(function () {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    var slides = Array.prototype.slice.call(lightbox.querySelectorAll("[data-slide]"));
    var openButtons = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox-open]"));
    var current = 0;
    var lastTrigger = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.hidden = i !== current;
      });
    }
    function openAt(index, trigger) {
      lastTrigger = trigger || null;
      show(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      var closeBtn = lightbox.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus();
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openAt(parseInt(btn.getAttribute("data-index"), 10) || 0, btn);
      });
    });
    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "Tab") trapFocus(lightbox, e);
    });
  });

  /* ---------- Animación de entrada (con degradación elegante) ---------- */
  ready(function () {
    if (!("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll(
      ".pillar, .service-card, .mini-service, .post-card, .contact-card, .split-media__figure, .split-media__text, .gallery__item"
    );
    if (!targets.length) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el, i) {
      el.setAttribute("data-reveal", "");
      el.style.transitionDelay = (i % 6) * 0.05 + "s";
      io.observe(el);
    });
  });
})();
