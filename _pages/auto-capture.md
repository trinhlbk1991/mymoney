---
layout: page
lang: en
alt: /vi/tu-ghi-giao-dich/
title: Automatic expense tracking from bank notifications
seo_title: "Automatic Expense Tracker from Bank Notifications | myMoney"
eyebrow: Auto-capture
description: >-
  myMoney turns the payment notifications from your bank and e-wallet apps into
  transactions with Gemini AI. No bank login, no typing. Android and iPhone.
lede: >-
  myMoney's auto-capture reads the payment notification your bank or e-wallet
  app already shows when you pay, and Google's Gemini AI turns it into a
  transaction with the amount, merchant, category and wallet filled in. It
  never connects to your bank, and it works with any bank that sends payment
  notifications.
schema: article
date_published: 2026-11-16
last_modified: 2026-11-16
related:
  - [/guides/iphone-auto-capture-shortcuts/, "Set up auto-capture on iPhone with Shortcuts"]
  - [/guides/android-auto-capture/, "Set up auto-capture on Android"]
  - [/privacy-by-design/, What myMoney reads, and what it never touches]
  - [/pricing/, "Pricing: Free and Bánh Xèo"]
faq:
  - q: Which banks and e-wallets does auto-capture support?
    a: >-
      Any bank or e-wallet app that shows a notification when you pay.
      myMoney reads the text of the notification, so there's no list of
      supported banks to wait for, and it reads notifications in any language.
  - q: Do I need to give myMoney my bank username or password?
    a: >-
      No. myMoney never connects to your bank and never asks for a login. It
      only reads notifications that are already on your phone, from the apps
      you choose.
  - q: Does auto-capture work on iPhone?
    a: >-
      Yes, on iOS 27 or later, through one Shortcuts automation that runs when
      your bank app posts a notification. The app shows you how to set it up
      with screenshots.
  - q: What does it cost?
    a: >-
      Your first 3 auto-captured payments are free. After that, Bánh Xèo, the
      Premium version bought once with no subscription, reads every payment.
      Payments that arrive before you buy wait in To review and are read when
      you do.
  - q: Does it pick up OTP codes and promotions?
    a: >-
      No. Promotional messages and one-time passcodes are skipped, so only
      real payments become transactions.
---

## How it works

1. **You pay as usual.** Card, QR code or e-wallet. Your bank or e-wallet app sends its normal notification.
2. **myMoney reads it.** Only notifications from the apps you picked are read. The text goes to Google's Gemini AI, which works out the amount, whether money went out or came in, the currency, the merchant and the category.
3. **It lands in the right wallet.** Add the last 3–4 digits of a card to a wallet, and payments made with that card go into that wallet.
4. **You confirm, or it saves itself.** By default, each capture waits in **To review**, so you can check it and edit any field. If you trust it, let captures save on their own.
5. **Your budget updates.** Your daily safe-to-spend amount, category budgets and goals change the moment a payment lands.

## What makes it different

Most expense trackers make you choose between typing every purchase or connecting your bank account. Bank sync needs your login, often goes through a third-party aggregator, and covers only some banks in some countries.

myMoney takes a third route: **your phone already receives a notification for every payment, so myMoney reads that.**

| | Typing it in | Bank sync | myMoney auto-capture |
|---|---|---|---|
| Effort per payment | Every time | None | None |
| Bank login needed | No | Yes | **No** |
| Works with any bank | Yes | Only supported banks | **Any bank that sends notifications** |
| Cash payments | Yes | No | Yes, by hand in 2 taps |

## Make it fit the way you spend

- **Keyword rules.** Tie a word to a category so a merchant always lands in the same place. For example, your usual coffee shop always goes to your food category.
- **Review or auto-save.** Keep review on while you build trust, and turn it off later.
- **Wallets by card digits.** One wallet per card, filled in automatically.
- **Edit anything.** Every field of every capture stays editable.

## Android and iPhone

- **Android:** allow myMoney notification access, pick your bank and e-wallet apps, and you're done. [Step-by-step Android guide](/guides/android-auto-capture/).
- **iPhone (iOS 27+):** create one Shortcuts automation that sends your bank app's notifications to myMoney's **Capture Notification** action. [Step-by-step iPhone guide](/guides/iphone-auto-capture-shortcuts/).

## What it sends, and what it doesn't

For each payment notification it reads, myMoney sends Gemini the notification's title and text, the name of the app that posted it, your category names and the wallet's currency. It never sends your transaction history, your other apps' notifications or any login. Results stay on your phone. [Read the full breakdown](/privacy-by-design/).
