# Intro
Create a website inspired by printscreens of a couple of websites found in this folder. It will be a website about a company doing construction work.
It should be a static site with no database, we still don't have any content so you can fill it with lore epsum data.
Use the provided logo (tc.png) and theme the website with the logo colours. The theme should be light coloured.
Make sure the website is responsive and also light weight.

# Job
- use printscreens and logo to design a site inspired by the printscreens with s light colour background and colours matching the logo
- compare your creation with source and itterate if needed.
- use construction images you can find on the net with no copiright.

# Status
Site is built and reviewed by the client as of 2026-08-18. Structure below is for whoever (human or Claude) picks up future edits.

# Hosting & build
- Hosted on GitHub Pages. Plain HTML/CSS/JS, no build step, no framework — push to `main`, enable Pages, done.
- No package.json, no bundler. Keep it that way; it's what makes the site lightweight and zero-maintenance.

# Site structure
- Bilingual: French pages live at the repo root, English mirrors live under `en/`. Every FR page has a same-named (or slug-translated) EN counterpart, and the language toggle in the topbar links between them directly — no JS language detection.
- Shared design system: `css/style.css` (all component classes, palette as CSS custom properties in `:root`) and `js/main.js` (mobile nav toggle, sticky header shadow, animated stat counters, gallery filter, contact-form fake-submit handler). Both are shared by every page via relative paths (`css/style.css` from root pages, `../css/style.css` from `en/` pages).
- No templating — header/nav/footer markup is duplicated verbatim across every HTML file. When editing shared chrome (nav links, footer columns, service list, service areas), the change has to be repeated across all ~30 HTML files. For bulk mechanical edits like this, a short Python/sed script over all `*.html` + `en/*.html` files is faster and safer than hand-editing each one.
- Service pages: each service has its own dedicated page (e.g. `renovation-cuisine.html` / `en/kitchen-renovation.html`) rather than just a section on `services.html`. Pattern per page: hero, intro + checklist (`why__list`), a "related services" mini `services-grid`, CTA banner, footer. `services.html`/`en/services.html` and the homepage service cards link to these dedicated pages by matching the Unsplash photo id used in each card.
- Images are hotlinked from `images.unsplash.com` (no local binaries besides `tc.png`). URLs follow `https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=<w>&h=<h>&q=75`. Before reusing a photo id, verify it 200s (`curl -o /dev/null -w "%{http_code}" ...`) — some ids 404.

# Known placeholders — replace before real launch
- All business details are fictional lorem-ipsum-style placeholders: phone (514 555-0142), email (info@tiranaconstruction.ca), address (2580 Rue Principale, Longueuil), RBQ license number, testimonials, stats (years/projects/satisfaction %), and the "founded 2013" timeline on the About page.
- The contact form (`contact.html` / `en/contact.html`) has no backend — it fakes a success message via inline JS. To actually receive submissions, wire in a form service (e.g. Formspree) and update the `<form action>`.
- Social links (Facebook/Instagram icons in topbar and footer) point to `#`.
- Palette was sampled from `tc.png` (red `#c81414`, charcoal `#1a1a1a`, concrete `#9c9c9c`, brick/wood `#82402a`) — defined as CSS variables at the top of `css/style.css` if it ever needs adjusting.

# Github
Repo: https://github.com/tcghcom/demo.git
Deployed via GitHub Pages to https://demo.tirana-construction.com (custom domain, see `CNAME`).
Auth: use `gh auth login` or a locally-exported token env var when pushing — never store a PAT in this file (it gets committed to the repo).
