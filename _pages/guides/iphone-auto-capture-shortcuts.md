---
layout: page
lang: en
alt: /vi/huong-dan/tu-ghi-chi-tieu-iphone/
title: How to track expenses automatically on iPhone with Shortcuts
seo_title: "Track Expenses Automatically on iPhone with Shortcuts"
eyebrow: Guide · iPhone
description: >-
  Set up one Shortcuts automation so every bank payment notification on your
  iPhone is logged in myMoney automatically. iOS 27 or later, about 2 minutes.
lede: >-
  On iPhone, myMoney logs payments automatically through one Shortcuts
  automation: when your bank app posts a notification, Shortcuts passes it to
  myMoney's Capture Notification action, and the payment becomes a
  transaction. You need iOS 27 or later, and it takes about two minutes to set
  up.
schema: howto
tool: myMoney for iPhone
last_modified: 2026-11-16
breadcrumb:
  - [Guides, /guides/]
steps:
  - ["Install myMoney and turn on auto-capture", "Install myMoney from the App Store and open auto-capture in the app. It shows the same steps with screenshots."]
  - ["Create a notification automation", "Open the Shortcuts app, go to Automation, create a new personal automation and choose Notification: When I receive a notification from your bank app."]
  - ["Pick your bank and e-wallet apps", "Tap the app list and add every bank and e-wallet app you pay with. Set the automation to run immediately, without asking."]
  - ["Add the Capture Notification action", "Add myMoney's Capture Notification action and set its input to the Notification from the trigger."]
  - ["Make a payment and check To review", "Pay as usual. The payment appears in myMoney's To review list, ready to confirm."]
related:
  - [/guides/android-auto-capture/, Set up auto-capture on Android]
  - [/auto-capture/, How auto-capture works]
  - [/privacy-by-design/, What myMoney reads, and what it never touches]
faq:
  - q: Which iOS version do I need?
    a: iOS 27 or later. On earlier versions, you can still log payments by hand in two taps.
  - q: Do I have to open myMoney for it to work?
    a: >-
      No. Once the automation is set to run immediately, it runs in the
      background each time your bank app posts a notification.
  - q: Will it read my messages or other notifications?
    a: >-
      Only if you add those apps to the automation. myMoney only sees the
      notifications that the automation hands to it.
  - q: How do I turn it off?
    a: Delete or turn off the automation in the Shortcuts app. Nothing more is sent to myMoney.
---

## Before you start

- An iPhone on **iOS 27 or later**
- **myMoney** from the App Store
- Your bank or e-wallet app with **payment notifications turned on** (check its own notification settings)

## Step by step

1. **Install myMoney and turn on auto-capture.** In the app, open auto-capture. It walks you through these same steps with screenshots, so you can follow along there.
2. **Create a notification automation.** Open **Shortcuts**, tap **Automation**, create a new automation, and choose **Notification**. The trigger reads *When I receive a notification from…*

   ![The Shortcuts trigger: When I receive a notification from an app](/assets/guide/step_5.webp)

3. **Pick your bank and e-wallet apps.** Tap the app next to *from* and add each bank and e-wallet app you pay with. Set the automation to **run immediately**, so it doesn't ask you each time.
4. **Add the Capture Notification action.** Search for **myMoney** in the actions list, add **Capture Notification**, and set its input to the **Notification** that triggered the automation.

   ![The myMoney Capture Notification action, with the Notification as input](/assets/guide/step_7.webp)

5. **Make a payment and check To review.** Pay as usual. The payment shows up in **To review** with the amount, merchant, category and wallet filled in. Confirm it with one tap, or turn off review to let captures save on their own.

## Tips

- **One automation, several banks.** You can add more apps to the same automation later.
- **Card digits pick the wallet.** Add the last 3–4 digits of each card to its wallet in myMoney, and payments land in the right place.
- **Your first 3 captures are free.** After that, [Bánh Xèo](/pricing/) reads every payment. Payments that arrive before you buy wait in To review.
