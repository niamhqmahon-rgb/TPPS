/* TPPS: routing, language, rendered lists and forms.
   Same structure as the Energy Basics draft: hash routes #/services, #/services/request, ...
   A second path segment that matches an element id scrolls to it. */

(function () {
  "use strict";

  var TP = window.TP;
  var PAGES = ["home", "services", "products", "about", "contact", "privacy", "terms"];
  var KEY_LANG = "tp.lang";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Storage can be unavailable (private mode, blocked site data): fail quietly. */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }

  /* ---------- Language ---------- */

  var lang = "en";

  // English copy is authored in the HTML; capture it once so we can switch back.
  $$("[data-i18n]").forEach(function (el) { TP.strings.en[el.dataset.i18n] = TP.strings.en[el.dataset.i18n] || el.textContent; });
  $$("[data-i18n-ph]").forEach(function (el) { TP.strings.en[el.dataset.i18nPh] = TP.strings.en[el.dataset.i18nPh] || el.placeholder; });
  $$("[data-i18n-aria]").forEach(function (el) { TP.strings.en[el.dataset.i18nAria] = TP.strings.en[el.dataset.i18nAria] || el.getAttribute("aria-label"); });
  $$("[data-i18n-alt]").forEach(function (el) { TP.strings.en[el.dataset.i18nAlt] = TP.strings.en[el.dataset.i18nAlt] || el.alt; });

  function t(key) {
    // An empty string is a valid translation (word order differs between languages).
    var tbl = TP.strings[lang] || {};
    var s = Object.prototype.hasOwnProperty.call(tbl, key) ? tbl[key] : (TP.strings.en[key] || key);
    return s.replace("{email}", TP.contact.email);
  }
  function pick(obj) { return obj[lang] || obj.en; }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    $$("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.dataset.i18nAlt); });
    $$("[data-i18n-msg]").forEach(function (el) { el.textContent = t(el.dataset.i18nMsg); });
    $$("[data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    renderAll();
    setTitle();
  }

  function setLang(l) {
    lang = l === "ar" ? "ar" : "en";
    save(KEY_LANG, lang);
    applyLang();
  }

  /* ---------- Rendering ---------- */

  function icon(name, color) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"' + (color ? ' style="--c:' + color + '"' : "") + ">" + (TP.icons[name] || "") + "</svg>";
  }

  function fillIcons() {
    $$("svg[data-icon]").forEach(function (svg) { svg.innerHTML = TP.icons[svg.dataset.icon] || ""; });
  }

  function cards(list, withIds) {
    return list.map(function (s, i) {
      var c = pick(s);
      return '<article class="card"' + (withIds && s.id ? ' id="' + s.id + '"' : "") + ">" +
        icon(s.icon, i % 2 ? "var(--orange-ink)" : "") + "<h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p></article>";
    }).join("");
  }

  // Services page: photo next to each service, alternating sides.
  function rows(list) {
    return list.map(function (s, i) {
      var c = pick(s);
      return '<article class="svc-row" id="' + s.id + '">' +
        '<div class="svc-media"><img src="assets/images/' + s.photo + '" alt="' + esc(c.name) + '" loading="lazy" decoding="async">' +
        (s.standin ? '<span class="todo">' + esc(t("todo.standin")) + "</span>" : "") + "</div>" +
        '<div class="svc-text"><span class="circle">' + icon(s.icon, i % 2 ? "var(--orange-ink)" : "") + "</span>" +
        "<h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p></div></article>";
    }).join("");
  }

  function options(list) {
    return list.map(function (s) { return '<option value="' + esc(s.en.name) + '">' + esc(pick(s).name) + "</option>"; }).join("");
  }

  function renderAll() {
    fillIcons();
    $$('[data-render="services"]').forEach(function (el) {
      // data-limit shows a subset (home); the full list on the services page gets anchor ids.
      var limit = +el.dataset.limit || 0;
      el.innerHTML = limit ? cards(TP.services.slice(3, 3 + limit), false) : rows(TP.services);
    });
    $$('[data-render="sectors"]').forEach(function (el) {
      el.innerHTML = TP.sectors.map(function (s, i) {
        return "<li>" + icon(s.icon, i % 2 ? "var(--orange-ink)" : "") + "<span>" + esc(s[lang] || s.en) + "</span></li>";
      }).join("");
    });
    $$('[data-render="products"]').forEach(function (el) { el.innerHTML = rows(TP.products); });
    $$('[data-render="product-options"]').forEach(function (el) { var v = el.value; el.innerHTML = options(TP.products); if (v) el.value = v; });
    $$('[data-render="service-options"]').forEach(function (el) { var v = el.value; el.innerHTML = options(TP.services); if (v) el.value = v; });
    $$('[data-render="footer-services"]').forEach(function (el) {
      el.innerHTML = TP.services.slice(0, 5).map(function (s) { return '<a href="#/services/' + s.id + '">' + esc(pick(s).name) + "</a>"; }).join("");
    });
  }

  /* ---------- Forms ----------
     No backend yet: forms validate, then open the visitor's email app with the
     request filled in. Swap send() for a POST to the real endpoint later. */

  function send(kind, data) {
    var lines = Object.keys(data).filter(function (k) { return data[k]; }).map(function (k) { return k + ": " + data[k]; });
    var href = "mailto:" + TP.contact.email + "?subject=" + encodeURIComponent(t("mail.subject." + kind)) + "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
    return true;
  }

  function onSubmit(e) {
    var form = e.target.closest("[data-form]");
    if (!form) return;
    e.preventDefault();
    var err = $("[data-error]", form);
    var bad = $$("[required]", form).filter(function (f) { return !f.value.trim(); });
    var email = $('[type="email"]', form);
    err.hidden = true;
    $$("[aria-invalid]", form).forEach(function (f) { f.removeAttribute("aria-invalid"); });
    if (bad.length) {
      bad.forEach(function (f) { f.setAttribute("aria-invalid", "true"); });
      err.textContent = t("err.required"); err.hidden = false; bad[0].focus(); return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.setAttribute("aria-invalid", "true");
      err.textContent = t("err.email"); err.hidden = false; email.focus(); return;
    }
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
    var kind = form.dataset.form;
    try { send(kind, data); } catch (x) { err.textContent = t("err.send"); err.hidden = false; return; }
    form.reset();
    form.hidden = true;
    var ok = $('[data-sent="' + kind + '"]');
    if (ok) ok.hidden = false;
  }

  /* ---------- Router ---------- */

  var page = "home";

  function setTitle() { document.title = t("title." + (page || "home")); }

  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    var next = PAGES.indexOf(parts[0]) !== -1 ? parts[0] : "home";
    var sub = parts[1] || "";
    var changed = next !== page;
    page = next;

    $$("[data-page]").forEach(function (el) { el.hidden = el.dataset.page !== page; });
    $$("[data-nav]").forEach(function (a) {
      if (a.dataset.nav === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    // Forms reappear when visiting a page again.
    $$('[data-page="' + page + '"] [data-form]').forEach(function (f) { f.hidden = false; });
    $$('[data-page="' + page + '"] [data-sent]').forEach(function (s) { s.hidden = true; });

    closeMenu();
    setTitle();

    var target = sub && document.getElementById(sub);
    if (target) {
      target.scrollIntoView();
      if (target.classList.contains("card") || target.classList.contains("svc-row")) { target.style.borderColor = "var(--orange)"; setTimeout(function () { target.style.borderColor = ""; }, 1600); }
    } else if (changed || !sub) window.scrollTo(0, 0);
    if (changed) $("#main").focus({ preventScroll: true });
    reveal();
  }

  /* ---------- Header, menu, reveal, back to top ---------- */

  function closeMenu() {
    $("#mobile-menu").hidden = true;
    $('[data-action="toggle-menu"]').setAttribute("aria-expanded", "false");
  }

  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    $("#header").classList.toggle("scrolled", y > 8);
    $("#progress").style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
    $(".to-top").classList.toggle("show", y > 600);
  }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function reveal() {
    $$(".reveal:not(.in)").forEach(function (el) { if (io) io.observe(el); else el.classList.add("in"); });
  }

  /* ---------- Hero slideshow (services) ----------
     Advances every data-slideshow ms while its page is visible. Stays on the first
     photo for visitors who ask for reduced motion. */

  $$("[data-slideshow]").forEach(function (box) {
    var slides = $$("img", box), i = 0, ms = +box.dataset.slideshow || 3000;
    if (slides.length < 2 || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    setInterval(function () {
      if (box.closest("[data-page]").hidden || document.hidden) return;
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, ms);
  });

  /* ---------- Events ---------- */

  document.addEventListener("click", function (e) {
    var el;
    if ((el = e.target.closest("[data-lang]"))) return setLang(el.dataset.lang);
    if (!(el = e.target.closest("[data-action]"))) return;
    switch (el.dataset.action) {
      case "toggle-menu":
        var open = $("#mobile-menu").hidden;
        $("#mobile-menu").hidden = !open;
        el.setAttribute("aria-expanded", String(open));
        break;
      case "to-top": window.scrollTo(0, 0); break;
    }
  });

  document.addEventListener("submit", onSubmit);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("#mobile-menu").hidden) { closeMenu(); $('[data-action="toggle-menu"]').focus(); }
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Start ---------- */

  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var saved = load(KEY_LANG, null);
  lang = saved || ((navigator.language || "").toLowerCase().indexOf("ar") === 0 ? "ar" : "en");
  page = null;
  applyLang();
  route();
  onScroll();
})();
