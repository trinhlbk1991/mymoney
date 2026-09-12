# myMoney — website

Marketing site, changelog, and legal pages for [myMoney](https://apps.apple.com/vn/app/mymoney-finance/id6475389461).
Static site built with Jekyll 4 and deployed to Cloudflare Pages.

The landing page design comes from the `Landing Page.dc.html` artboard in the
myMoney Claude Design project; the app screenshots in `assets/store/` are
exported from the same project.

## Local development

```sh
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## Editing content

Almost everything on the landing page is data in `_config.yml` — no HTML needed:

| Key | What it controls |
| --- | --- |
| `hero` | Eyebrow, headline, lede, and the three trust bullets |
| `steps` | The "Three taps a day" cards (numbered automatically) |
| `screens` | The three phone screenshots and their captions |
| `facts` | The stat cards next to the dark panel |
| `cta` | The lime call-to-action block |
| `accent_color` | The lime accent. The design file also ships amber `oklch(0.88 0.14 95)` and sky `oklch(0.86 0.10 200)` |
| `url` | Production domain — used for canonical and `og:image` URLs |

Long-form pages live in `_pages/` as Markdown and render through `_layouts/page.html`:
`privacypolicy.md`, `terms.md`, `changelog.md`, `deleteaccount.md`.

Styles are a single file, `main.scss`, compiled by Jekyll to `/main.css`.

## Deploying to Cloudflare Pages

`wrangler.toml` already declares `_site` as the build output directory.

**Via the dashboard (recommended — deploys on every push):**

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Pick this repo and the `main` branch.
3. Build command: `bundle exec jekyll build`
4. Build output directory: `_site`
5. Deploy. Then add the custom domain under the project's **Custom domains** tab,
   and set `url:` in `_config.yml` to match.

Cloudflare's build image ships Ruby 3.4.4 by default, which is what this site
needs (every gem requires only >= 3.2), so no version pin is required. To force
a specific one, add a `RUBY_VERSION` environment variable in the project's
build settings or commit a `.ruby-version` file.

**From your machine:**

```sh
bundle exec jekyll build
npx wrangler pages deploy _site --project-name=mymoney
```

`_headers` sets long cache lifetimes for `/assets/*` and basic security headers;
Cloudflare reads it from the build output.
