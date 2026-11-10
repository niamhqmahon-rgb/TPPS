# TPPS: project guide for Claude

Static, bilingual (English / Arabic) website for **Three Phase Power System Est. (TPPS)**,
مؤسسة أنظمة الجهد الثلاثي للطاقة, an LV/MV/HV electrical contractor in Jeddah, Saudi Arabia (tpps-sa.com).
Built on the Energy Basics draft (`claude/lucid-cray-84bk01` branch, itself modelled on VoltGenics) and
restyled to the TPPS Brand Guidelines (Nov. 2025). First drafted in a `tpps/` folder of the EnergyBasics repo,
now its own repo.

## Tech
- **Cloned from the Energy Basics site** (`claude/lucid-cray-84bk01` in the EnergyBasics repo) on 3 Nov 2026 at the
  client's request: same structure, pages, components and copy, with TPPS colours, logo, contact details and the
  home hero photo. The earlier TPPS specific pages (photo slideshows, service photo rows, values) were replaced;
  they are in git history before that date if needed.
- Plain HTML, CSS and vanilla JS. No framework, no build step. Keep all paths relative.
- Single page app with hash routes: `#/`, `#/products`, `#/products/<category>`, `#/services`, `#/services/booking`,
  `#/consulting`, `#/consulting/scoping`, `#/about`, `#/contact`, `#/privacy`, `#/terms`.
  A second path segment that matches an element id scrolls to it.
- Preview: GitHub Pages from the working branch `claude/lucid-ptolemy-kh0c2q` (root folder):
  https://niamhqmahon-rgb.github.io/TPPS/ . Keep `.nojekyll`. Local: `python3 -m http.server 8000` in the repo root.

## Structure
- `index.html`: all pages (`<div data-page="...">`), header, footer, consent notice, quote drawer.
- `css/site.css`: all styles and `@font-face`. Brand colours are CSS variables in `:root` (TPPS palette mapped onto
  the Energy Basics variable names: `--primary` TPPS blue, `--accent`/`--sky` TPPS orange).
- `js/data.js`: contact details, icons, product categories, sample products, services, consulting areas (EN + AR).
- `js/i18n.js`: translations. English copy is written in `index.html`; `TP.strings.ar` holds every key.
- `js/app.js`: router, language switch, catalogue filters and search, quote list, forms (mailto), header, reveal.
- `assets/logo/tpps-logo-en.svg`, `tpps-logo-white-en.svg`: TPPS logo without the Arabic line (client request),
  vectors from the brand guidelines PDF. `tpps-mark*.svg`: logomark only.
- `assets/images/hero-power-lines.jpg`: home hero photo (power lines at sunset, 1740×1160, Unsplash licence).
- `assets/images/svc-*.jpg`: service photos (480×480) on the service cards (`photo` in `TP.services`). Five are the
  client's site photos from the Energy Basics design artifact; `svc-maintenance.jpg` is a crop of the hero photo.
  The close up shot with a branded work shirt was left out on purpose.
- Page header photos (restored after the clone): Services slideshow `services-1..4.jpg`, Products slideshow
  `product-switchgear/solar/cables/test.jpg` (3 s per photo, `data-slideshow`, logic in `app.js`), About
  `about-office-warm.jpg`, Consulting `consulting-tablet-warm.jpg` (supplied tablet photo, warm graded, same layout
  as About; 612×408, which is iStock preview size: confirm licence and get a larger version); Contact, Privacy and Terms have no photo header.
- `assets/images/products/<id>.jpg`: catalogue photos (same as the Energy Basics design artifact), `photo` in
  `TP.products`. The battery storage cabinet uses the client supplied solar and wind photo (cropped).
- About story panel: team photo `services-4.jpg` (engineers in PPE) with the caption "Safe. Reliable. Efficient."
- `assets/illustrations/hero-grid.svg`: blueprint art for the other page headers (EB style, TPPS colours).
- `assets/fonts/`: self hosted Montserrat and Noto Kufi Arabic (OFL, licences included).

## Hosting
- **Hostinger** (static files). `.htaccess` in the root: forces HTTPS, hides dot files and `.md`, security headers
  incl. a Content-Security-Policy (no inline scripts, no third party scripts, styles, fonts or frames). If you add an
  external service (map, analytics, form backend), extend the CSP for it. Upload a zip of the site files (not the
  notes) and extract it in `public_html`.
- **Forms** post to Web3Forms (`TP.forms` in `data.js`, `send()` in `app.js`), which emails info@tpps-sa.com
  (Microsoft Exchange). Free plan, about 250 messages a month. The key is public by design. Hidden `botcheck`
  honeypot against spam. Endpoint is allowed in `connect-src` in `.htaccess`. Privacy policy names Web3Forms.

## Rules when editing
- **Cache busting:** `index.html` loads CSS and JS with `?v=<date><letter>`. Bump it on every change to those files,
  otherwise visitors (GitHub Pages caches 10 min) get the new HTML with old CSS/JS. Changed images need a new file name.
- **Every text change goes into both languages** (`data-i18n` key + Arabic in `TP.strings.ar`).
- Use logical CSS (`inset-inline-start`, `margin-inline`, `text-align: start`) so RTL keeps working.
- Copy style: short headlines ending in a full stop, eyebrow with an orange square above each heading,
  navy and orange accent bar under headings, buttons ending in `→`. Avoid dashes in visible copy.
- Logo: never stretch, recolour, rotate or add effects (guidelines p. 16). Minimum 250 px wide for the full
  logo on screen where possible; colour logo on light backgrounds, white logo on navy.
- Privacy: only `tp.lang` in local storage. No analytics, no third party fonts, scripts or embeds.
- Accessibility: real links and buttons, alt text, visible focus, ≥ 44px targets, no horizontal scroll at 390px.
  Orange `#f26a1b` is too light for small text on white; use `--orange-ink` there.

## Brand
- Navy `#002855` (primary), charcoal `#333333` (secondary), orange `#f26a1b` (tertiary),
  greys `#7b8087`, `#cacbcc`, `#ededed`.
- The guidelines leave the typeface as `{fontname}`; Montserrat (used in the guide's own text) is the stand in.

## Open before launch
- Content is still the Energy Basics draft copy (business lines, sample products, services, consulting): replace
  with TPPS's real offering. Placeholders in `[brackets]` and yellow "Draft" labels remain.
- Real photography for product, service, about and team sections; client logos.
- Confirm the brand typeface, office hours, founding year, certifications, key projects.
- Arabic is a draft translation: needs review by a native speaker.
- Privacy policy and terms are drafts: need legal review (Saudi PDPL). 
