# myMoney — Visibility Plan (Google + AI assistants)

Site: https://mymoney.icedtealabs.com · Prepared 2026-11-16

## Status (updated 2026-11-16)

**Done in the code:**

- The home page is rendered as static HTML from `_data/home/en.yml` and `vi.yml`. A crawler that doesn't run JavaScript went from 460 words and no store links to 1,039 words (EN) and 1,400 (VI), with both store links.
- A real Vietnamese home page at `/vi/`, with hreflang pairs and a VI title and description. The EN/VI switch is now a link and remembers the choice.
- `/habita/` removed, with a 301 redirect to `/`.
- The sitemap has per-page `lastmod` dates and hreflang alternates. `robots.txt` names the AI crawlers. Added `llms.txt`.
- Structured data: Organization, WebSite, MobileApplication (with both offers), FAQPage, plus BreadcrumbList and Article/HowTo/FAQPage on content pages.
- 14 new pages (EN + VI): auto-capture, privacy, pricing, guides index, iPhone setup, Android setup, safe-to-spend budgeting.
- Keyword-led hero subline, internal links from the home sections to the new pages, campaign tags on store buttons, changelog headings fixed (h1 → h2).

**Still to do (needs you, outside the repo):**

1. Cloudflare → Security → Bots: make sure AI-bot blocking is off for this zone.
2. Verify the site in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, turn on Crawler Hints / IndexNow.
3. Set `appstore_provider_token` in `_config.yml` (App Store Connect → Analytics → Campaigns).
4. Use the positioning line from `_config.yml` `app_long_description` in both store listings, and link the website from them.
5. Wikidata item, Product Hunt, AlternativeTo and other profiles; then add their URLs to `org_same_as`.
6. Community posts, listicle outreach, launches (sections 4–5).
7. Comparison pages (section 3.3) and a "which Vietnamese banks work" page: these need checked facts about competitors and real tested banks, so they were left for you.
8. Self-host the fonts (Phase 1, item 8).

---

## 0. Where the site stood (audit of this repo, before the changes above)

What's already good: a keyword-led `<title>`, a description under 160 characters, canonical and OG/Twitter tags, a 1200×630 social card, `MobileApplication` + `FAQPage` JSON-LD, sitemap, robots.txt, WebP images, preloaded hero.

What's holding it back, in priority order:

| # | Problem | Why it matters | Where |
|---|---|---|---|
| 1 | **Most of the home page is injected by JavaScript.** The feature card, the "how it works" flow, the three feature accordions (capture / plan / privacy) and even the **store buttons** are empty `<div>`s in the HTML. | Google renders JS, late and only partly. GPTBot, ClaudeBot, PerplexityBot and most AI crawlers **don't run JS at all**: they see an H1, a few headings and the FAQ. They can't find the App Store / Play links. | `_layouts/home.html` (`#featCard`, `#flow`, `data-acc`, `data-stores`), `assets/js/home.js` |
| 2 | **Vietnamese exists only as a client-side swap.** One URL, `lang="en"`, VI text lives in `home.js`. | Vietnam is the core market and Google can't index a single Vietnamese word. Searches like "app quản lý chi tiêu" can never land here. | `assets/js/home.js` (`VI`), `_includes/head.html` |
| 3 | **`/habita/` publishes a saved copy of another company's site** (habitrotina.app, a Framer export, 25 files). | Duplicate third-party content on your domain, possible trademark problem, and a confusing topic signal. | `habita/` (not in `_config.yml` `exclude`) |
| 4 | **Only one page targets any search intent.** Everything else is legal pages and a changelog. | You can rank for about one query. AI assistants cite pages that answer a specific question. | `_pages/` |
| 5 | Every `<lastmod>` is the build time. | Google learns the dates are meaningless and stops trusting them. | `sitemap.xml` |
| 6 | Entity signals are thin: no `Organization` schema, `sameAs` lists only the two stores, `ios_app_country: us` while the link is `/vn/`. | LLMs and Google's Knowledge Graph decide "what is myMoney" from consistent facts across many sources. "myMoney" is a crowded name. | `_config.yml`, `_includes/head.html` |
| 7 | No `llms.txt`, and nobody has checked Cloudflare's AI-crawler blocking. | Cloudflare can block AI bots at the zone level, which overrides robots.txt. If it's on, ChatGPT, Claude and Perplexity can't read the site at all. | Cloudflare dashboard → Security → Bots |

---

## 1. Positioning and keywords

**One-line positioning (use word-for-word everywhere: site, stores, profiles, press):**
> myMoney is an expense tracker for iPhone and Android that reads your bank's payment notifications with AI and records each transaction automatically, with no bank login.

The repeated sentence is the point. LLMs learn an entity from consistent, repeated descriptions.

**Name disambiguation.** Always write "myMoney by Iced Tea Labs" or "myMoney Finance" in profiles and the first mention on third-party sites. A plain "myMoney" collides with banks and other apps.

### Keyword clusters

| Cluster | English targets | Vietnamese targets | Page |
|---|---|---|---|
| Core (high volume, competitive) | expense tracker app, budget app iPhone, money manager app | app quản lý chi tiêu, ứng dụng quản lý tài chính cá nhân, app ghi chép thu chi | Home (EN / VI) |
| **Differentiator (winnable)** | automatic expense tracker, expense tracker that reads bank notifications, budget app without bank login, AI expense tracker | app tự động ghi chi tiêu, ghi chép chi tiêu tự động từ thông báo ngân hàng, app quản lý chi tiêu không cần liên kết ngân hàng | /auto-capture/ |
| How-to / setup | iPhone shortcut notification automation, track spending from bank notifications | cách tự động ghi chi tiêu trên iPhone, phím tắt iPhone thông báo ngân hàng | /guides/… |
| Comparison | Money Lover alternative, Spendee alternative, best expense tracker Vietnam | app thay thế Money Lover, app quản lý chi tiêu tốt nhất 2026 | /compare/… |
| Method / budgeting | daily spending limit, safe to spend calculator, monthly budget method | cách lập ngân sách hàng tháng, quy tắc 50/30/20, cách tiết kiệm tiền | /guides/… |
| Privacy | expense tracker no bank access, private budget app | app quản lý tiền an toàn, không cần đăng nhập ngân hàng | /privacy-by-design/ |

Check volumes in Google Search Console after 4 weeks of data, and in Google Keyword Planner (set the location to Vietnam for the VI terms).

---

## 2. Phase 1: Technical foundation (weeks 1–2)

1. **Render all home-page content as static HTML.** Move the feature switcher, flow steps, accordions and store buttons into the Jekyll layout (data in `_data/home.en.yml` / `_data/home.vi.yml`). Keep JS only for behaviour (tabs, timing, accordion open/close). Test: `curl -s https://mymoney.icedtealabs.com | grep -c "apps.apple.com"` must be ≥ 1, and every feature name must appear in the raw HTML.
2. **Build a real Vietnamese site at `/vi/`.** Static pages with `lang="vi"`, translated `<title>`, description, OG tags and JSON-LD. Add `hreflang` on both versions:
   ```html
   <link rel="alternate" hreflang="en" href="https://mymoney.icedtealabs.com/">
   <link rel="alternate" hreflang="vi" href="https://mymoney.icedtealabs.com/vi/">
   <link rel="alternate" hreflang="x-default" href="https://mymoney.icedtealabs.com/">
   ```
   The EN/VI toggle becomes a link between the two URLs. Don't auto-redirect by browser language: crawlers must reach both.
3. **Remove `/habita/`** from the repo, or at least add it to `exclude`. Redirect `/habita/*` to `/` (status 301) in `_redirects` in case anything got indexed.
4. **Fix the sitemap:** a real `lastmod` per page (`page.last_modified_at` via `jekyll-last-modified-at`, or front matter), plus `/vi/` URLs with `xhtml:link` hreflang entries.
5. **Strengthen structured data:**
   - Add an `Organization` node (Iced Tea Labs: logo, url, `sameAs` = X, Instagram, GitHub, LinkedIn, Product Hunt, Wikidata once it exists).
   - `MobileApplication`: add the offer for Bánh Xèo, a one-time in-app purchase, so the "free" claim isn't misleading. Add `aggregateRating` **only** with real store numbers kept up to date, never invented ones.
   - Per-page `BreadcrumbList`, `HowTo`-style step markup on guides, and `Article` (with `author`, `datePublished`, `dateModified`) on content pages.
   - Align `ios_app_country` with the store link.
6. **AI-crawler access:**
   - Cloudflare → Security → Bots: make sure "Block AI bots" / AI Scrape Shield is **off** for this zone, and check AI Crawl Control so GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot and Google-Extended are allowed.
   - Name them in `robots.txt` (still `Allow: /`). This documents intent and protects against blanket rules later.
   - Add `/llms.txt`: a plain-Markdown summary of what the app is, key facts (platforms, price model, languages, how auto-capture works, privacy), and links to every key page. Optionally add `/llms-full.txt` with the full text of the guides.
7. **Search consoles:** verify in Google Search Console and Bing Webmaster Tools (Bing's index feeds ChatGPT search and Copilot). Submit the sitemap and turn on IndexNow (Cloudflare has a one-click Crawler Hints option).
8. **Core Web Vitals:** self-host Manrope and IBM Plex Mono (removes two third-party connections from the critical path), and check LCP and CLS in PageSpeed Insights on mobile.

---

## 3. Phase 2: Content (weeks 2–8)

Rule for every page: **answer first.** Put a 2–3 sentence direct answer under the H1, then detail, then an FAQ block. That's what Google's AI Overviews and chatbots quote. Write concrete facts (numbers, steps, platforms, prices), not slogans. Publish each page in EN and VI.

### 3.1 Core pages

| URL | Title tag (≤ 60 chars) | Meta description (≤ 155 chars) |
|---|---|---|
| `/` | myMoney: AI Expense Tracker That Logs Payments for You | Budget app for iPhone & Android. AI reads your bank's payment notifications and records each transaction. No bank login, no typing. Free to start. |
| `/vi/` | myMoney: App quản lý chi tiêu tự động bằng AI | Ứng dụng quản lý chi tiêu cho iPhone & Android. AI đọc thông báo thanh toán từ ngân hàng, tự ghi giao dịch. Không cần đăng nhập ngân hàng. |
| `/auto-capture/` | Automatic Expense Tracking from Bank Notifications | How myMoney turns payment notifications from any bank or e-wallet into transactions with Gemini AI: amount, merchant, category and wallet. |
| `/privacy-by-design/` | A Budget App That Never Asks for Your Bank Login | What myMoney reads, what it never touches, where your data lives, and how Google Drive backup works. Plain answers, no fine print. |
| `/pricing/` | myMoney Pricing: Free, or Bánh Xèo Bought Once | Free to download with 3 auto-captures. Bánh Xèo unlocks everything with one payment: no subscription. Here's exactly what each includes. |

**Home page copy tweak.** Keep the brand H1 ("Pay as usual. It's already written down."), but make the hero subline carry the keywords:
> *myMoney is an automatic expense tracker for iPhone and Android. It reads the payment notifications your bank already sends and records each transaction, with no bank login and no typing.*

### 3.2 Guides (how-to intent: highest AI-citation potential)

1. How to track expenses automatically on iPhone with Shortcuts (iOS 27), step by step with screenshots from `assets/guide/`
2. How to log spending from bank notifications on Android
3. Which Vietnamese banks and e-wallets work? (MoMo, ZaloPay, VCB, Techcombank, MB, TPBank… "any app that shows a payment notification", with tested examples.) This one is gold for VI searches.
4. The daily "safe-to-spend" method: how to make a monthly budget last
5. 50/30/20 budget in đồng: a worked example on a 15 million VND salary
6. How to save for a goal: an emergency fund, a trip, a phone
7. Cash vs. card: logging cash payments in 2 taps

### 3.3 Comparisons (bottom-of-funnel, heavily used by chatbots)

- `/compare/money-lover/`, `/compare/misa-moneykeeper/`, `/compare/spendee/`
- `/best-expense-tracker-apps-vietnam/` (an honest roundup that includes competitors)

Keep them fair and dated, with a feature table. State where a competitor is stronger (bank sync, web app). Balanced pages get cited; one-sided ones get ignored.

### 3.4 Changelog

The changelog already exists. Give each major version its own anchor heading with a date. This is a freshness signal, and it answers "does myMoney support X?" questions.

---

## 4. Phase 3: AI assistant visibility (GEO), ongoing

LLMs recommend what they see **described consistently across many independent sources**. Your own site is just one source. Rankings in ChatGPT, Perplexity and Gemini follow web search (Bing and Google) plus mentions on high-trust sites.

1. **Seed the entity:**
   - Create a Wikidata item for myMoney (software, developer Iced Tea Labs, platforms, official website, App Store ID, Play Store ID).
   - Fill out profiles with the identical positioning line: Product Hunt, AlternativeTo (list it as an alternative to Money Lover, Spendee, YNAB, Monefy), SaaSHub, G2/Capterra (consumer section), Crunchbase for Iced Tea Labs, LinkedIn page.
2. **Communities where questions get asked** (be a helpful person who built the thing, not a spammer):
   - Reddit: r/personalfinance, r/ynab (alternatives threads), r/iphone and r/shortcuts (the Shortcuts-automation angle is a natural fit), r/androidapps, r/VietNam.
   - Vietnamese: Tinhte.vn, Voz, Facebook groups on personal finance and saving money (quản lý tài chính cá nhân, tiết kiệm), Spiderum (long-form post: "Mình làm app tự ghi chi tiêu từ thông báo ngân hàng").
   - Reddit and forum threads are among the most-cited sources in AI answers.
3. **Get into the listicles.** Find the pages that currently rank for "best expense tracker app 2026", "app quản lý chi tiêu tốt nhất" and "Money Lover alternative". Email their authors with a short pitch, a press kit (fill `presskit_download_link`) and a promo code.
4. **Launch moments:** Product Hunt launch of 7.0 "AI auto-capture"; Show HN ("I built an expense tracker that reads bank notifications instead of asking for your bank login"); posts on the developer's own blog (trinhlbk.dev) about the build, Gemini use and the iOS Shortcuts approach. Dev posts earn links naturally.
5. **Vietnamese tech press:** Genk, VnExpress Số hóa, Tinhte reviews, and finance YouTubers/TikTokers (review videos also show up in Google's video results).
6. **Test monthly.** Ask ChatGPT, Gemini, Claude, Perplexity and Copilot a fixed list of 10 prompts (EN + VI), for example "best app to track expenses automatically in Vietnam", "budget app that doesn't need bank login", "app ghi chi tiêu tự động". Log whether myMoney is mentioned and which sources they cite, then go after those sources.

---

## 5. App Store / Play Store (ASO)

Store listings rank in Google too, and assistants often link them.

- The subtitle (iOS, 30 chars) and short description (Play, 80 chars) should carry the differentiator: "AI expense tracker, auto-log" / "Tự ghi chi tiêu bằng AI".
- Localize both listings fully (EN + VI) with keyword fields researched separately for each.
- Ask for ratings at a happy moment (after the 5th correct auto-capture), and reply to every review.
- Link the website from both listings (marketing URL / developer website) to complete the entity loop.

---

## 6. Measurement

| KPI | Tool | 90-day target |
|---|---|---|
| Indexed pages (EN + VI) | Search Console | 25+ |
| Impressions / clicks, non-brand queries | Search Console | Steady weekly growth; top 10 for 5+ differentiator terms |
| Referring domains | Search Console links / Ahrefs Webmaster Tools (free) | 30+ |
| AI mentions (10-prompt test × 5 assistants) | Manual sheet, monthly | Mentioned in ≥ 15 of 50 answers |
| AI referral traffic | Cloudflare Web Analytics or GA4: referrers chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, copilot.microsoft.com | Tracked from day 1 |
| Store page visits from the web | App Store Connect campaign links (`ct=` param), Play UTM | Tracked from day 1 |
| AI crawler hits | Cloudflare AI Crawl Control | Non-zero for every major bot |

Add campaign tokens to every store link on the site (`?pt=…&ct=website-hero`, Play `&referrer=utm_source%3Dwebsite`) so you can see which page drives installs.

---

## 7. Timeline

| Weeks | Focus | Deliverables |
|---|---|---|
| 1–2 | Technical | Static home HTML, `/vi/` + hreflang, remove `/habita/`, sitemap lastmod, Organization schema, robots + `llms.txt`, Cloudflare bot check, GSC + Bing |
| 3–4 | Core pages | `/auto-capture/`, `/privacy-by-design/`, `/pricing/` (EN + VI); new hero subline; press kit |
| 5–8 | Content + launch | 4 guides, 2 comparisons; Product Hunt + Show HN; Wikidata + directory profiles; first Reddit/Tinhte posts |
| 9–12 | Authority | Remaining guides and comparisons; listicle outreach (20 pitches); 2 dev-blog posts; first monthly AI-mention report; refresh pages based on GSC queries |
| Ongoing | | 2 new pages/month, changelog per release, monthly AI test, review replies |
