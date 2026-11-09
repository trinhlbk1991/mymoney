# myMoney — website

Marketing site, changelog, and legal pages for [myMoney](https://apps.apple.com/vn/app/mymoney-finance/id6475389461).
Static site built with Jekyll 4 and deployed to Cloudflare Pages.

The home page is a product-page layout: a gradient hero with a timed feature
switcher, a four-step workflow, accordion feature sections, pricing and FAQ.
Its screenshots in `assets/real/` are the light raw captures from
mymoney-mobile's `screenshots/raw/<en|vi>/iphone/light/`, resized to 660px wide
WebP (`cwebp -q 80 -resize 660 0`); the page swaps them with the language.
`assets/guide/` holds two crops from the app's Shortcuts setup guide.

## Local development

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## Editing content

The home page has its own files and carries its copy in English and Vietnamese:

| File | What it holds |
| --- | --- |
| `_layouts/home.html` | The page markup and its English copy (`data-i18n` keys) |
| `assets/js/home.js` | The Vietnamese copy (`VI`), and the hero switcher, workflow and accordion content in both languages, including which screenshot and crop each one shows |
| `assets/css/home.css` | The home page styles |
| `_config.yml` `capture`, `features`, `faq` | Only the link preview and structured data; keep them in step with the page |
| `seo_title`, `app_description` | The home page `<title>` and the meta/OG description (keep it under 160 characters) |
| `url` | Production domain, used for canonical and `og:image` URLs |

`/get/` (`_pages/get.html`) sends phones to their store; the QR code in the
closing section points there.

## Link previews and SEO

Every page shares `assets/social-card.jpg` (1200×630) as its `og:image`. It is
rendered from `tool/social-card.html`; after editing that file run
`tool/render-social-card.sh` (needs Google Chrome). The home page also carries
`MobileApplication` and `FAQPage` JSON-LD, built in `_includes/head.html` from
`_config.yml`. `sitemap.xml` and `robots.txt` are generated from `url:`.

Long-form pages live in `_pages/` as Markdown and render through `_layouts/page.html`:
`privacypolicy.md`, `terms.md`, `changelog.md`, `deleteaccount.md`.

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
