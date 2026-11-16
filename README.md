# myMoney — website

Marketing site, changelog, and legal pages for [myMoney](https://apps.apple.com/app/id6475389461).
Static site built with Jekyll 4 and deployed to Cloudflare Pages.

The site is in English and Vietnamese. The home page is a product-page layout
(gradient hero with a timed feature switcher, a four-step workflow, accordion
feature sections, pricing and FAQ) at `/` and `/vi/`. Feature pages and guides
live under `/auto-capture/`, `/privacy-by-design/`, `/pricing/`, `/guides/` and
their Vietnamese twins under `/vi/`.

Its screenshots in `assets/real/` are the light raw captures from
mymoney-mobile's `screenshots/raw/<en|vi>/iphone/light/`, resized to 660px wide
WebP (`cwebp -q 80 -resize 660 0`). `assets/guide/` holds two crops from the
app's Shortcuts setup guide.

## Local development

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## Editing content

Every word is rendered as static HTML at build time, so search engines and AI
crawlers (which mostly don't run JavaScript) can read it all.

| File | What it holds |
| --- | --- |
| `_data/home/en.yml`, `_data/home/vi.yml` | All home page copy, its `<title>` and description, FAQ (also emitted as FAQPage JSON-LD) and which screenshot each section shows. Same keys in both; bump `last_modified` when you change it |
| `_layouts/home.html` | The home page markup, rendered from the data above |
| `assets/js/home.js` | Behaviour only: switcher timer, accordions, store order on Android, remembered language |
| `assets/css/home.css` | The home page styles |
| `_pages/*.md`, `_pages/guides/`, `_pages/vi/` | Long-form pages, rendered by `_layouts/page.html` (front matter documented at the top of that file) |
| `_data/ui.yml` | Header, footer and button strings for the long-form pages, per language |
| `_config.yml` | Domain, store links, the one-sentence positioning, structured-data facts (`feature_list`, `org_same_as`) |

Adding a page: write it in `_pages/` (or `_pages/vi/`) with `lang`, `alt` (the
other language's URL), `title`, `seo_title` (≤ 60 characters), `description`
(≤ 160), `lede` (a 2–3 sentence direct answer), `schema` and `last_modified`.
Write both languages and point their `alt`s at each other, then add the page to
`llms.txt` and the footer links in `_data/`.

`/get/` (`_pages/get.html`) sends phones to their store; the QR code in the
closing section points there.

## Search and AI visibility

- `_includes/head.html` emits the title, description, canonical, hreflang pairs,
  Open Graph tags and JSON-LD: Organization, WebSite, MobileApplication and
  FAQPage on the home pages; BreadcrumbList plus Article or HowTo (and FAQPage
  when a page has `faq`) on the long-form pages.
- `sitemap.xml` lists every page with its `last_modified` date and its
  translation. `robots.txt` allows every crawler and names the AI ones.
- `llms.txt` is a plain summary of the app for AI assistants. Keep its facts in
  step with the app.
- Store buttons carry campaign tags: Google Play `utm_` referrers now, App Store
  `ct=` tokens once `appstore_provider_token` is set in `_config.yml`.
- `_redirects` sends the removed `/habita/` pages home.
- The plan behind all this is in `docs/seo-visibility-plan.md` (not published).

Every page shares `assets/social-card.jpg` (1200×630) as its `og:image`. It is
rendered from `tool/social-card.html`; after editing that file run
`tool/render-social-card.sh` (needs Google Chrome).

The long-form pages are styled by `main.scss`, compiled by Jekyll to `/main.css`; the home page uses `assets/css/home.css`.

## Deploying to Cloudflare

The site deploys as an **assets-only Worker**: Jekyll builds `_site`, and
`wrangler.toml` points `[assets] directory` at it. There is no Worker script.

### Workers Builds (deploys on every push to `main`)

In the Cloudflare dashboard, open the Worker, then **Settings → Build**:

| Setting | Value |
| --- | --- |
| Build command | `bundle exec jekyll build` |
| Deploy command | `npx wrangler deploy` (the default) |
| Branch control | `main` |

The build command is what generates `_site`. Without it the deploy fails with
`Missing entry-point to Worker script or to assets directory`, because there is
nothing in the assets directory to upload.

Cloudflare's build image ships Ruby 3.4.4 by default, which is what this site
needs (every gem requires only >= 3.2), so no version pin is required. To force
a specific one, add a `RUBY_VERSION` environment variable in the project's
build settings or commit a `.ruby-version` file.

Then add the custom domain under the Worker's **Domains & Routes**, and set
`url:` in `_config.yml` to match.

### From your machine

```sh
bundle exec jekyll build
npx wrangler deploy
```

`_headers` sets long cache lifetimes for `/assets/*` and basic security headers;
Workers static assets reads it from the build output.
