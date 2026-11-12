/* TPPS: routing, language, catalogue, quote list and forms (cloned from the Energy Basics site).
   Hash routes as on the VoltGenics site: #/products, #/services/booking, ... */

(function () {
  "use strict";

  var TP = window.TP;
  var PAGES = ["home", "products", "services", "consulting", "about", "contact", "privacy", "terms"];
  var KEY_LANG = "tp.lang", KEY_QUOTE = "tp.quote", KEY_CONSENT = "tp.consent";

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
    var s = (TP.strings[lang] && TP.strings[lang][key]) || TP.strings.en[key] || key;
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

  function cards(list, limit) {
    return list.slice(0, limit || list.length).map(function (s) {
      var c = pick(s);
      // Services carry a photo (assets/images); other lists keep the icon only.
      var media = s.photo ? '<img class="card-photo" src="assets/images/' + s.photo + '" alt="" loading="lazy" decoding="async" width="480" height="480">' : "";
      return '<article class="card' + (s.photo ? " has-photo" : "") + '">' + media + '<div class="card-body">' + icon(s.icon) + "<h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p></div></article>";
    }).join("");
  }

  function options(list) {
    return list.map(function (s) { return '<option value="' + esc(s.en.name) + '">' + esc(pick(s).name) + "</option>"; }).join("");
  }

  // Services page: VoltGenics style photo cards. Each opens the booking form with that service chosen.
  function serviceCards() {
    var go = '<span class="svc-card-go" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
    return TP.services.map(function (s) {
      var c = pick(s);
      return '<a href="#/services/booking" class="svc-card" data-pick-service="' + esc(s.en.name) + '">' +
        '<span class="svc-card-img"><img src="assets/images/' + s.photo + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="svc-card-body"><span class="svc-card-text"><strong>' + esc(c.name) + "</strong><span>" + esc(c.desc) + "</span></span>" + go + "</span></a>";
    }).join("") +
      '<a href="#/services/booking" class="svc-card svc-card-cta"><span class="svc-card-body"><span class="svc-card-text"><strong>' +
      esc(t("svc.card.more.t")) + "</strong><span>" + esc(t("svc.card.more.d")) + "</span></span>" + go + "</span></a>";
  }

  // Home: a few catalogue products with photos, each linking to its category.
  var PREVIEW = ["rmu-24", "tx-1000", "xlpe-15", "inv-100"];
  function productPreview() {
    return PREVIEW.map(function (id) {
      var p = TP.products.filter(function (x) { return x.id === id; })[0];
      if (!p) return "";
      return '<a class="prod-tile" href="#/products/' + p.cat + '">' +
        '<span class="prod-tile-img"><img src="assets/images/' + p.photo + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="prod-tile-cat">' + esc(catName(p.cat)) + '</span><strong>' + esc(pick(p).name) + "</strong></a>";
    }).join("");
  }

  function renderStatic() {
    $$('[data-render="service-cards"]').forEach(function (el) { el.innerHTML = serviceCards(); });
    $$('[data-render="product-preview"]').forEach(function (el) { el.innerHTML = productPreview(); });
    $$('[data-render="services"]').forEach(function (el) { el.innerHTML = cards(TP.services, +el.dataset.limit || 0); });
    $$('[data-render="consulting"]').forEach(function (el) { el.innerHTML = cards(TP.consulting); });
    $$('[data-render="service-options"]').forEach(function (el) { var v = el.value; el.innerHTML = options(TP.services); if (v) el.value = v; });
    $$('[data-render="consulting-options"]').forEach(function (el) { var v = el.value; el.innerHTML = options(TP.consulting); if (v) el.value = v; });
    $$('[data-render="footer-cats"]').forEach(function (el) {
      el.innerHTML = TP.categories.map(function (c) { return '<a href="#/products/' + c.id + '">' + esc(c[lang] || c.en) + "</a>"; }).join("");
    });
    $$('[data-render="footer-services"]').forEach(function (el) {
      el.innerHTML = TP.services.slice(0, 4).map(function (s) { return '<a href="#/services">' + esc(pick(s).name) + "</a>"; }).join("") +
        '<a href="#/services/booking">' + esc(t("svc.cta")) + "</a>";
    });
  }

  /* ---------- Catalogue ---------- */

  var filter = { cat: "all", avail: "all", q: "" };
  var quote = load(KEY_QUOTE, {}) || {};

  function catName(id) {
    var c = TP.categories.filter(function (x) { return x.id === id; })[0];
    return c ? (c[lang] || c.en) : "";
  }

  function renderFilters() {
    var cats = [{ id: "all", label: t("all") }].concat(TP.categories.map(function (c) { return { id: c.id, label: c[lang] || c.en }; }));
    $("#cat-filters").innerHTML = cats.map(function (c) {
      return '<button type="button" class="filter-opt" data-filter-cat="' + c.id + '" aria-pressed="' + (filter.cat === c.id) + '">' + esc(c.label) + "</button>";
    }).join("");
    var av = [["all", t("all")], ["stock", t("avail.stock")], ["order", t("avail.order")]];
    $("#avail-filters").innerHTML = av.map(function (a) {
      return '<button type="button" class="filter-opt" data-filter-avail="' + a[0] + '" aria-pressed="' + (filter.avail === a[0]) + '">' + esc(a[1]) + "</button>";
    }).join("");
    var parts = [];
    if (filter.cat !== "all") parts.push(catName(filter.cat));
    if (filter.avail !== "all") parts.push(t("avail." + filter.avail));
    $("#filter-summary").textContent = parts.join(" · ");
  }

  function matches(p) {
    if (filter.cat !== "all" && p.cat !== filter.cat) return false;
    if (filter.avail === "stock" && !p.stock) return false;
    if (filter.avail === "order" && p.stock) return false;
    if (!filter.q) return true;
    var hay = [p.en.name, p.en.spec, p.ar.name, p.ar.spec, catName(p.cat)].join(" ").toLowerCase();
    return filter.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function renderProducts() {
    var list = TP.products.filter(matches);
    $("#result-count").textContent = list.length;
    $("#no-results").hidden = list.length > 0;
    $("#products").innerHTML = list.map(function (p) {
      var c = pick(p), cat = TP.categories.filter(function (x) { return x.id === p.cat; })[0];
      var inList = !!quote[p.id];
      return '<article class="product">' +
        '<div class="product-img">' + (p.photo ? '<img src="assets/images/' + p.photo + '" alt="" loading="lazy" decoding="async">' : icon(cat.icon, "var(--primary)")) + "</div>" +
        '<div class="product-body">' +
          '<span class="product-cat">' + esc(catName(p.cat)) + "</span>" +
          '<span class="product-name">' + esc(c.name) + "</span>" +
          '<span class="product-spec">' + esc(c.spec) + "</span>" +
          '<span class="avail' + (p.stock ? "" : " order") + '">' + esc(t(p.stock ? "avail.stock" : "avail.order")) + "</span>" +
          '<button type="button" class="btn btn-dark" data-add="' + p.id + '" aria-pressed="' + inList + '">' + esc(t(inList ? "prod.added" : "prod.add")) + "</button>" +
        "</div></article>";
    }).join("");
  }

  /* ---------- Quote list ---------- */

  function productById(id) { return TP.products.filter(function (p) { return p.id === id; })[0]; }

  function renderQuote() {
    var ids = Object.keys(quote).filter(productById);
    var count = ids.reduce(function (n, id) { return n + quote[id]; }, 0);
    $$("[data-quote-count]").forEach(function (el) { el.textContent = count; });
    $("#quote-empty").hidden = ids.length > 0;
    $("#quote-form").hidden = ids.length === 0;
    $("#quote-items").innerHTML = ids.map(function (id) {
      return '<div class="q-item"><span class="name">' + esc(pick(productById(id)).name) + "</span>" +
        '<label><span class="sr-only">' + esc(t("qty")) + '</span><input type="number" min="1" value="' + quote[id] + '" data-qty="' + id + '"></label>' +
        '<button type="button" data-remove="' + id + '">' + esc(t("remove")) + "</button></div>";
    }).join("");
  }

  function setQuote(id, qty) {
    if (qty > 0) quote[id] = qty; else delete quote[id];
    save(KEY_QUOTE, quote);
    renderQuote();
    renderProducts();
  }

  var lastFocus = null;
  function openQuote() {
    lastFocus = document.activeElement;
    $("#quote").hidden = false;
    $('[data-sent="quote"]').hidden = true;
    renderQuote();
    $("#quote .icon-btn").focus();
  }
  function closeQuote() {
    $("#quote").hidden = true;
    if (lastFocus) lastFocus.focus();
  }

  function renderAll() {
    fillIcons();
    renderStatic();
    renderFilters();
    renderProducts();
    renderQuote();
  }

  /* ---------- Forms ----------
     Forms are sent to Web3Forms (TP.forms), which emails them to info@tpps-sa.com.
     Field names are turned into readable labels; the quote list is added as text. */

  var LABELS = { name: "Name", company: "Company", email: "Email", phone: "Phone", message: "Message",
    service: "Service", voltage: "Voltage level", site: "Site location", date: "Preferred date",
    topic: "Topic", city: "Delivery city" };

  // Hidden honeypot field: people never see or tick it, spam bots often do.
  $$("[data-form]").forEach(function (form) {
    var trap = document.createElement("input");
    trap.type = "checkbox"; trap.name = "botcheck"; trap.tabIndex = -1;
    trap.setAttribute("aria-hidden", "true"); trap.className = "hp-trap";
    form.appendChild(trap);
  });

  function send(kind, data) {
    var body = {
      access_key: TP.forms.key,
      subject: TP.strings.en["mail.subject." + kind] + (lang === "ar" ? " (Arabic site)" : ""),
      from_name: "TPPS website",
      botcheck: false
    };
    Object.keys(data).forEach(function (k) { if (data[k] && k !== "botcheck") body[LABELS[k] || k] = data[k]; });
    if (data.email) body.replyto = data.email;
    if (kind === "quote") {
      body["Items"] = Object.keys(quote).map(function (id) {
        var p = productById(id);
        return p ? quote[id] + " × " + p.en.name + " (" + p.en.spec + ")" : "";
      }).filter(Boolean).join("\n");
    }
    return fetch(TP.forms.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || !j.success) throw new Error(j.message || ("HTTP " + r.status));
      });
    });
  }

  function onSubmit(e) {
    var form = e.target.closest("[data-form]");
    if (!form) return;
    e.preventDefault();
    if (form.dataset.busy) return;
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
    if (data.botcheck) return; // a bot ticked the hidden box: quietly drop it

    var btn = $('[type="submit"]', form), label = btn.textContent;
    form.dataset.busy = "1"; btn.disabled = true; btn.textContent = t("form.sending");

    send(kind, data).then(function () {
      form.reset();
      form.hidden = true;
      var ok = $('[data-sent="' + kind + '"]');
      if (ok) { ok.hidden = false; ok.setAttribute("tabindex", "-1"); ok.focus(); }
      if (kind === "quote") { quote = {}; save(KEY_QUOTE, quote); renderProducts(); $$("[data-quote-count]").forEach(function (el) { el.textContent = 0; }); $("#quote-items").innerHTML = ""; }
    }).catch(function () {
      err.textContent = t("err.send"); err.hidden = false;
    }).then(function () {
      delete form.dataset.busy; btn.disabled = false; btn.textContent = label;
    });
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

    if (page === "products" && sub && TP.categories.some(function (c) { return c.id === sub; })) {
      filter.cat = sub; renderFilters(); renderProducts();
    }
    closeMenu();
    setTitle();

    var target = sub && document.getElementById(sub);
    if (target) target.scrollIntoView();
    else if (changed || !sub) window.scrollTo(0, 0);
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

  /* ---------- Hero slideshows (services, products) ----------
     Advances every data-slideshow ms while its page is visible; stays on the first
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
    if ((el = e.target.closest("[data-pick-service]"))) {
      var sel = $('[data-form="booking"] [name="service"]');
      if (sel) sel.value = el.dataset.pickService;
    }
    if ((el = e.target.closest("[data-add]"))) { var id = el.dataset.add; return setQuote(id, quote[id] ? 0 : 1); }
    if ((el = e.target.closest("[data-remove]"))) return setQuote(el.dataset.remove, 0);
    if ((el = e.target.closest("[data-filter-cat]"))) { filter.cat = el.dataset.filterCat; renderFilters(); return renderProducts(); }
    if ((el = e.target.closest("[data-filter-avail]"))) { filter.avail = el.dataset.filterAvail; renderFilters(); return renderProducts(); }
    if (!(el = e.target.closest("[data-action]"))) return;
    switch (el.dataset.action) {
      case "toggle-menu":
        var open = $("#mobile-menu").hidden;
        $("#mobile-menu").hidden = !open;
        el.setAttribute("aria-expanded", String(open));
        break;
      case "toggle-filters":
        var f = $("#filters"), closed = f.classList.toggle("closed");
        el.setAttribute("aria-expanded", String(!closed));
        break;
      case "open-quote": openQuote(); break;
      case "close-quote": closeQuote(); break;
      case "to-top": window.scrollTo(0, 0); break;
      case "consent-ok": save(KEY_CONSENT, true); $("#consent").hidden = true; break;
      case "cookie-settings": $("#consent").hidden = false; $("#consent .btn").focus(); break;
    }
  });

  document.addEventListener("change", function (e) {
    var el = e.target.closest("[data-qty]");
    if (el) setQuote(el.dataset.qty, Math.max(0, parseInt(el.value, 10) || 0));
  });

  document.addEventListener("submit", onSubmit);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("#quote").hidden) closeQuote();
  });

  $("#search").addEventListener("input", function (e) { filter.q = e.target.value.trim(); renderProducts(); });
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
  if (!load(KEY_CONSENT, false)) $("#consent").hidden = false;
})();
