# TPPS: project guide for Claude

Static, bilingual (English / Arabic) website for **Three Phase Power System Est. (TPPS)**,
مؤسسة أنظمة الجهد الثلاثي للطاقة, an LV/MV/HV electrical contractor in Jeddah, Saudi Arabia (tpps-sa.com).
Built on the Energy Basics draft (`claude/lucid-cray-84bk01` branch, itself modelled on VoltGenics) and
restyled to the TPPS Brand Guidelines (Nov. 2025). First drafted in a `tpps/` folder of the EnergyBasics repo,
now its own repo.

## Tech
- Plain HTML, CSS and vanilla JS. No framework, no build step. Keep all paths relative.
- Single page app with hash routes: `#/`, `#/services`, `#/services/<service id>`, `#/services/request`,
  `#/about`, `#/contact`, `#/privacy`, `#/terms`. A second path segment that matches an element id scrolls to it.
- Preview: GitHub Pages from the working branch `claude/lucid-ptolemy-kh0c2q` (root folder):
  https://niamhqmahon-rgb.github.io/TPPS/ . Keep `.nojekyll`. Local: `python3 -m http.server 8000` in the repo root.

## Structure
- `index.html`: all pages (`<div data-page="...">`), header, footer.
- `css/site.css`: all styles and `@font-face`. Brand colours are CSS variables in `:root`.
- `js/data.js`: contact details, icons, services, values, ways of working, sectors (EN + AR).
- `js/i18n.js`: translations. English copy is written in `index.html`; `TP.strings.ar` holds every key.
- `js/app.js`: router, language switch (sets `lang` and `dir="rtl"`), rendering, forms (mailto), header, reveal.
- `assets/logo/`: full logo (colour and white) and logomark, extracted as vectors from the brand guidelines PDF.
- `assets/images/hero-power-lines.jpg`: home hero photo (power lines at sunset, 1740×1160, from Unsplash:
  free for commercial use under the Unsplash licence, no credit required).
  A real TPPS project photo can replace it later, ideally 2400 px wide or more; give it a new file name.
- `assets/images/services-1.jpg` to `services-4.jpg`: Services hero slideshow (3 s per photo, `data-slideshow`
  in `index.html`, logic in `app.js`). Supplied by the client at 612 to 900 px wide: replace with 1600 px+ versions
  for sharpness, and confirm their licences.
- `assets/images/about-office-warm.jpg`: About hero (supplied office photo, 900×1350, warm graded with an orange
  glow on the ceiling light). Desktop shows it on the end side fading into navy; phones full bleed.
- `assets/images/svc-earthing-standin.jpg`, `svc-maintenance-standin.jpg`: generated stand in artwork for two
  service rows (marked Draft on the page). Other service rows reuse the supplied photos (`photo` in `data.js`).
- About story panel uses `services-4.jpg` (engineers in PPE at a cable installation).
- `assets/illustrations/`: `hero-grid.svg` (blueprint and three phase waveform) and the brand pattern tile.
- `assets/fonts/`: self hosted Montserrat and Noto Kufi Arabic (OFL, licences included).

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
- Real photography (projects, team, site work). The home hero has a photo; other page headers use the
  illustration. Earthing and maintenance service rows use stand in artwork; a real team photo is still to come.
- Confirm the brand typeface, service list, sectors, office hours, founding year, certifications, key projects
  and client logos.
- Forms open the visitor's email app (mailto). Replace `send()` in `app.js` with a real endpoint.
- Arabic is a draft translation: needs review by a native speaker.
- Privacy policy and terms are drafts: need legal review (Saudi PDPL). Hosting provider placeholder `[provider]`.
- Remove the orange "Draft" labels (`.todo`) and client logo placeholders (`.ph-img`).
