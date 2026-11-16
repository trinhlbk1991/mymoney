---
layout: page
lang: en
alt: /vi/quyen-rieng-tu/
title: A budget app that never asks for your bank login
seo_title: "Private Budget App With No Bank Login | myMoney"
eyebrow: How privacy works
description: >-
  What myMoney reads, what it never touches, where your data lives and how
  backup works. A private expense tracker with no bank connection.
lede: >-
  myMoney never connects to your bank and never asks for a password. Your
  transactions, budgets and goals are stored on your phone. Auto-capture reads
  only the notifications from apps you pick, and sends only that notification's
  text to Google's Gemini AI to turn it into a transaction.
schema: article
date_published: 2026-11-16
last_modified: 2026-11-16
related:
  - [/auto-capture/, How auto-capture works]
  - [/privacypolicy/, The full privacy policy]
  - [/deleteaccount/, How to delete your account and data]
faq:
  - q: Can myMoney see my bank account?
    a: >-
      No. myMoney has no connection to your bank. It only sees what your bank
      app already shows in a notification on your phone, and only if you
      added that app to auto-capture.
  - q: Does the developer receive my financial data?
    a: >-
      No. Your records are stored on your device. Notification text sent for
      auto-capture goes to Google's Gemini service, which returns the result;
      the developer does not receive or store it. Backups go to your own
      Google Drive, which the developer cannot open.
  - q: Is my data sold?
    a: >-
      No. Nothing is sold on. The free version shows ads through Google AdMob;
      Bánh Xèo, the paid version, has none.
---

## The short version

| | Where it goes |
|---|---|
| Your transactions, wallets, budgets, goals, receipt photos | **Your phone.** Not collected by myMoney. |
| Backups (if you turn them on) | **Your own Google Drive.** The developer can't open it. |
| Notifications from apps you didn't pick | **Nowhere.** Never read, stored or sent. |
| Notifications from apps you picked (auto-capture) | Title and text, app name, your category names and wallet currency are sent to **Google's Gemini AI** to work out the transaction. |
| Your bank login | **Never asked for.** myMoney doesn't connect to banks. |

## What auto-capture reads

Auto-capture is off until you turn it on. On Android, the system asks you to grant notification access first. On iPhone, nothing is read unless you create the Shortcuts automation yourself.

- **Only the apps you add.** Every other app's notifications are ignored.
- **Only notifications with a number in them.** Messages without an amount aren't read.
- **What leaves your phone:** the notification's title and text exactly as your bank posted it, the app's name, your category names and the wallet's currency. These go to Gemini through Google's Firebase AI Logic. Depending on your bank, the text can include the amount, the merchant, a transfer message, your balance or part of an account number.
- **What comes back** is kept only in the app's database on your phone. Confirmed or dismissed items are deleted after 30 days, and none of this is included in backups.

## How to stop it

Turn auto-capture off in Settings, or remove myMoney's notification access in Android settings (on iPhone, delete the automation). Nothing more is read, and any notifications waiting to be read are discarded.

## Other services in the app

To be complete: myMoney uses Firebase Analytics and Crashlytics to understand usage and fix crashes, Firebase Authentication if you sign in, and Google AdMob to show ads in the free version. The [privacy policy](/privacypolicy/) lists each one with links to their own policies.
