# myMoney blog: brief for the post-writing automation

This folder drives the myMoney blog. `schedule.yml` lists every planned post.
This file says how to turn one entry into a published post. It is written for
an automated writer (an AI agent run on a schedule) and for the person who
reviews its work. `docs/` is excluded from the Jekyll build, so nothing here is
published.

## Calendar at a glance

Generated from `schedule.yml`, which is the source of truth: if the two
disagree, follow `schedule.yml`. Posts go out on Tuesdays, about two a month,
with a burst around Tết 2027 (6 February). "Needs you" means the author must
answer `author_questions` in `author_notes` before `draft_date`.

| Publish | ID | Series | Languages | Title | Needs you |
|---|---|---|---|---|---|
| 2026-11-20 | B00 | — | — | Build the blog section (prerequisite) | — |
| 2026-11-24 | P01 | money-basics | VI + EN | Cách quản lý chi tiêu cá nhân: hướng dẫn đầy đủ từ con số 0 |  |
| 2026-12-01 | P02 | money-basics | VI | Lương 10, 15, 20 triệu chi tiêu thế nào? Áp dụng quy tắc 50/30/20 |  |
| 2026-12-08 | P03 | cashless | VI + EN | Thanh toán QR cả ngày: làm sao biết mình đã tiêu bao nhiêu? |  |
| 2026-12-15 | P04 | money-basics | VI + EN | Tổng kết tài chính cuối năm: 7 câu hỏi nên tự hỏi trước năm mới |  |
| 2026-12-22 | P05 | money-basics | VI | Lập ngân sách Tết 2027: quà, lì xì, về quê và mua sắm |  |
| 2026-12-29 | P06 | money-basics | VI | Thưởng Tết nên dùng thế nào để không hết sạch trước rằm tháng Giêng |  |
| 2027-01-05 | P07 | money-basics | VI | Lì xì bao nhiêu là vừa? Cách đặt ngân sách lì xì Tết 2027 |  |
| 2027-01-12 | P08 | build | EN | How I built an expense tracker that reads bank notifications with Gemini | Yes |
| 2027-01-19 | P09 | cashless | VI + EN | Có an toàn khi cho app đọc thông báo ngân hàng không? |  |
| 2027-01-26 | P10 | build | EN | iOS 27's notification trigger in Shortcuts: what it lets third-party apps do | Yes |
| 2027-02-16 | P11 | money-basics | VI | Hết tiền sau Tết: kế hoạch 30 ngày để lấy lại cân bằng |  |
| 2027-02-23 | P12 | money-basics | VI + EN | Quỹ dự phòng khẩn cấp: cần bao nhiêu và xây thế nào |  |
| 2027-03-09 | P13 | cashless | VI + EN | Vì sao ghi chép chi tiêu thường bỏ cuộc sau 2 tuần (và cách sửa) |  |
| 2027-03-23 | P14 | money-basics | VI | Vợ chồng quản lý tài chính: tiền chung, tiền riêng hay cả hai? |  |
| 2027-04-06 | P15 | compare | VI + EN | App quản lý chi tiêu tốt nhất 2027: so sánh thật, dùng thật | Yes |
| 2027-04-20 | P16 | money-basics | VI | Quy tắc 6 chiếc lọ: còn hợp khi mọi thứ trả bằng QR? |  |
| 2027-05-04 | P17 | money-basics | VI | Sinh viên quản lý chi tiêu với 3–5 triệu mỗi tháng |  |
| 2027-05-18 | P18 | build | EN | Why myMoney is a one-time purchase, not a subscription | Yes |
| 2027-06-01 | P19 | cashless | VI + EN | Tự gõ, liên kết ngân hàng hay đọc thông báo: 3 cách ghi chép chi tiêu |  |
| 2027-06-15 | P20 | cashless | VI + EN | Quản lý tiền khi có nhiều tài khoản ngân hàng và ví điện tử |  |
| 2027-06-29 | P21 | compare | VI + EN | myMoney, Money Lover hay MISA MoneyKeeper: chọn app nào? | Yes |
| 2027-07-13 | P22 | cashless | VI + EN | Quản lý chi tiêu bằng Excel hay app: khi nào dùng cái nào? |  |
| 2027-07-27 | P23 | money-basics | VI | Tiết kiệm mua nhà, mua xe: tính mỗi tháng cần để dành bao nhiêu |  |
| 2027-08-10 | P24 | money-basics | VI + EN | 50k mỗi ngày thành bao nhiêu một năm? Sức nặng của những khoản chi nhỏ |  |
| 2027-08-24 | P25 | money-basics | VI | Sổ thu chi gia đình: ghi gì, ai ghi, và xem lại thế nào |  |
| 2027-09-07 | P26 | money-basics | VI | Đi đám cưới mừng bao nhiêu? Và cách để mùa cưới không vỡ ngân sách |  |

---

## 1. When a run starts

1. Read this file and `schedule.yml` in full.
2. **Check the blog exists.** If `_layouts/post.html` or `_pages/blog.md` is
   missing, the blog section (entry `B00` in `schedule.yml`) hasn't been built.
   Stop and report that; don't create posts the site can't render.
3. **Pick the work.** Take entries where `status: planned` and
   `draft_date <= today`, in `publish_date` order. Write **at most 2 posts per
   run**.
4. **Author input gate.** If an entry has `needs_author_input: true` and its
   `author_notes` is empty, don't write it. Set `status: blocked`, list the
   unanswered `author_questions` in the run report, and move to the next entry.
   Never make up the author's experience, numbers, test results or opinions.
5. For each post: write every language listed under `langs` (section 3), run
   the checks (section 6), set the entry's `status: drafted`, fill `files:` with
   the paths created, and open **one pull request per post** titled
   `Blog: <English or Vietnamese title> (publish <publish_date>)`.
6. **Don't merge.** A person reviews each post and merges it on or after
   `publish_date`. Merging deploys the site. After the merge, the reviewer (or
   the next run, if it sees the post on `main`) sets `status: published`.

Status values: `planned` → `drafted` (PR open) → `published` (on `main`), or
`blocked` (waiting for author input; goes back to `planned` once `author_notes`
is filled in).

---

## 2. Files and front matter

Posts are Markdown files in `_posts/`, one file per language:

```
_posts/<publish_date>-<slug>.md          # English → /blog/<slug>/
_posts/<publish_date>-<vi slug>.md       # Vietnamese → /vi/blog/<vi slug>/
```

Front matter (fields in `<>` come from the entry in `schedule.yml`):

```yaml
---
layout: post
lang: <en|vi>
title: "<title>"
seo_title: "<seo_title>"           # ≤ 60 characters
description: "<description>"       # ≤ 155 characters
lede: >-
  <2–3 sentence direct answer to the primary keyword's question>
date: <publish_date>
last_modified: <publish_date>
permalink: /blog/<slug>/           # Vietnamese: /vi/blog/<slug>/
alt: /vi/blog/<other slug>/        # only if the entry has both languages
series: <series id>
tags: [<tags>]
image: /assets/blog/<slug>.jpg     # optional: leave out unless a real image was made
related:
  - [/url/, Title]                 # from internal_links
faq:
  - q: <question>
    a: <answer, 1–3 sentences>
schema: article
---
```

The FAQ goes in front matter only. The layout renders it and emits FAQPage
data, so don't repeat it in the body.

---

## 3. How to write a post

### Voice

- Plain, warm and direct, like a friend who's good with money. Not a bank, not
  a guru. Short sentences. Second person ("you" / "bạn").
- **Vietnamese posts are written in Vietnamese from scratch, not translated.**
  Use everyday words ("tiền nhà", "lương về", "cuối tháng") and the units people
  use ("15 triệu", "200k", "₫"). Number format in Vietnamese: `15.000.000₫`;
  in English: `15,000,000₫`.
- No hype ("revolutionary", "bí kíp", "đột phá"), no clickbait, no fear-selling.

### Structure

1. **Lede (front matter):** answers the main question in 2–3 sentences, before
   anything else. Write it as if it's the only part someone will read.
2. **Body:** follow the entry's `outline`. Each item is one `##` section; you
   may add `###` subsections. No `#` headings in the body: the layout prints the
   title.
3. **Worked example:** every post in the `money-basics` and `cashless` series
   includes the `worked_example` described in the entry, with real arithmetic
   in đồng, set out as a table or step by step. Check every sum twice.
4. **The app:** mention myMoney **once in the body**, where it really answers
   the problem (use the entry's `app_tie_in`), linking to the feature or guide
   page given. The layout adds the download box at the end, so don't add your
   own store links or calls to download.
5. **FAQ:** 3–5 questions from `faq_seed`, rewritten as people actually type
   them, each answered in 1–3 sentences.
6. **Internal links:** link every URL in `internal_links` somewhere natural in
   the body, plus 1–2 earlier published posts from `schedule.yml` where they
   fit.

Length: aim for the entry's `words` (±20%). Cut filler before cutting content.

### Facts and claims: the hard rules

- **Never invent statistics, studies, surveys, quotes or user stories.** Don't
  write "theo khảo sát…" or "studies show…" unless the source is in the entry's
  `sources` and you link it.
- **Facts about myMoney** come only from the site's own pages: `/auto-capture/`,
  `/privacy-by-design/`, `/pricing/`, the guides, `/changelog/` and
  `/privacypolicy/`. If a fact isn't on one of those pages, leave it out.
  Facts in short: works with any bank or e-wallet that shows payment
  notifications; no bank login; Gemini reads the notification; Android via
  notification access, iPhone (iOS 27+) via one Shortcuts automation; first 3
  auto-captures free; Bánh Xèo is the one-time Premium purchase; English and
  Vietnamese; any currency; data stays on the phone; optional Google Drive
  backup.
- **Facts about other apps** (only in posts with `needs_author_input`) come only
  from `author_notes`.
- **Things that change** (interest rates, prices, laws, tax thresholds, bank
  fees): don't give specific figures. Say what to compare and where to check
  (the bank's own rate page, the tax authority). If the entry asks for a
  figure, use the source it names and write the date you checked.
- **Customs** (lì xì, wedding gifts): describe what people commonly do as
  ranges with factors (region, closeness, income), not one "correct" amount.
  Say it varies.
- **Not financial advice:** no specific investments, funds, stocks or crypto. In
  posts about saving, recommend a habit or a rule, not a product.

### SEO

- The primary keyword appears in: `seo_title`, `description`, the lede, the
  first `##` heading or the paragraph under it, and naturally 2–4 more times.
  Secondary keywords appear once each where they read naturally. Never stuff.
- `seo_title` ≤ 60 characters; `description` ≤ 155 characters, a full sentence
  that makes someone want to click.
- Slugs: lowercase, ASCII, hyphens; Vietnamese slugs without diacritics (as in
  the entry).

---

## 4. Images

Optional. If the run can make a simple original image (a chart of the worked
example, a diagram), save it at 1200×630 as `assets/blog/<slug>.jpg` (also
used as the link preview) and inline images as WebP under `assets/blog/`. Every
image needs real `alt` text. No stock photos, no AI-generated photos of people,
no screenshots of other companies' apps.

---

## 5. Seasonal posts

Entries with `seasonal: true` are tied to a date (Tết, the end of the year).
If a run picks one up after its `publish_date` has passed, don't write it.
Set `status: blocked` with the note `missed season` and report it.

---

## 6. Checks before opening the PR

- [ ] `bundle exec jekyll build` succeeds and the post renders at its permalink.
- [ ] `seo_title` ≤ 60 and `description` ≤ 155 characters.
- [ ] Exactly one `<h1>` on the page (the layout's), no `#` headings in the body.
- [ ] Every internal link resolves to a built page; external links are https.
- [ ] Both language versions exist when `langs` lists two, and their `alt`s point at each other.
- [ ] Every number in the worked example adds up.
- [ ] No invented statistics, quotes or sources (section 3).
- [ ] myMoney mentioned once in the body, no store links in the body.
- [ ] `schedule.yml` entry updated: `status: drafted`, `files:` filled in.

The PR description lists: the post's URL(s), primary keyword, word count per
language, and anything the reviewer should check (figures, customs, claims).

---

## 7. After publishing (for the person)

- Request indexing for the new URL in Google Search Console.
- Share build-in-public posts (series `build`) where the entry says
  (`promote_on`).
- 6–8 weeks after publishing, check the post's search queries in Search Console.
  If it ranks for something the post doesn't fully answer, add a section and
  bump `last_modified`.
