# Brigid — marketing site & family dashboard

> Bridging home and healthcare. A daily phone check-in that helps older adults
> recover safely at home — and keeps families in the loop.

This repo is the Brigid website: a fast, flowing, Apple-style marketing site plus
a live, interactive demo of the family dashboard.

## Why it's built this way

It's a **buildless static site** — plain HTML, one shared CSS design system, and a
little vanilla JavaScript. That means:

- **No build step, no tooling.** Nothing to `npm install`. It opens by
  double-clicking a file and deploys to any static host as-is.
- **Deploy anywhere.** GitHub Pages, Netlify, Vercel, Cloudflare Pages, or an
  S3 bucket — just point it at this folder.
- **Fast and durable.** The marketing pages have no framework and no runtime
  dependencies (only Google Fonts loaded from the web).

The "Apple flow" — big typography, generous whitespace, and content that fades and
rises into view as you scroll — comes from the design system and scroll animations
in `assets/`, not from a framework.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — the flowing scroll experience (hero → Eleanor's story → the gap → how it works → triage → why Brigid → dashboard preview → CTA) |
| `how-it-works.html` | The daily call, the clinical tools behind it, the triage system, the dashboard |
| `about.html` | Mission, Eleanor's story in full, values, and our origin at Queen's DDQIC |
| `for-partners.html` | The value case (cost of readmission), market size, and the commercialization roadmap |
| `faq.html` | Common questions, in an accordion |
| `contact.html` | Contact form (demo — see note below) and details |
| `product.html` | The interactive family dashboard demo (React) |

## Shared assets

| File | Purpose |
| --- | --- |
| `assets/brigid.css` | The whole design system — colours, type, components, responsive rules |
| `assets/brigid.js` | Scroll reveals, sticky nav, mobile menu, FAQ accordion, stat count-ups, form handling |
| `assets/favicon.svg` | Brand mark (a hearth flame) |
| `assets/img/illo-morning.svg` | Sunrise-through-a-window scene (How it works hero) — has gentle animated steam & light |
| `assets/img/illo-armchair.svg` | An older person resting at home (Home testimonial) — has an animated lamp glow |
| `assets/img/illo-portrait.svg` | Portrait of "Eleanor" (About → her story) |

## Imagery — and how to add your own photos

The warm visuals are **original illustrations** (in the brand palette, so they always
match and always load). They're placeholders you can keep, or swap for real
photography whenever you have it. There's a ready-made component for exactly that.

**To drop in a real photo**, replace an illustration `<img>` with a framed figure:

```html
<div class="media-figure duotone tall">
  <img src="assets/img/your-photo.jpg" alt="Describe the photo for screen readers" />
  <div class="cap">Optional caption</div>   <!-- omit if you don't want one -->
</div>
```

- `duotone` washes any colour photo into the forest/sage brand palette so it blends
  in. Drop it to show the photo in full colour.
- Size modifiers: `tall` (4:5), `square` (1:1), or omit for the default 4:3.
- `contain` (instead of cropping) if the image shouldn't be cropped.

**Where to find free, properly-licensed photos:** [Pexels](https://www.pexels.com),
[Unsplash](https://unsplash.com), and [Wikimedia Commons](https://commons.wikimedia.org)
all have collections of older adults under licenses that allow commercial use.
Download the file into `assets/img/` and reference it as above.

> **A note for a health brand:** photos of identifiable people need the right
> license *and*, ideally, the person's consent — especially when they're presented
> as patients. Until you have real, consenting stories, the illustrations (and the
> clearly-labelled example testimonial on the home page) keep the site honest.

## A few notes

- **The dashboard** (`product.html`) is a React app that loads React and Babel from
  a CDN (unpkg) and compiles in the browser. It needs an internet connection the
  first time it loads. Everything else on the site is plain HTML/CSS/JS. If you ever
  want to remove that CDN dependency, this page is the one to convert to a build step.
- **The contact form** doesn't send anywhere yet — it shows a success state for the
  demo. Wire it to a form backend (Formspree, Netlify Forms, or your own endpoint)
  when you're ready. Until then it points people to `hello@brigidhealth.ca`.
- **Records** in the dashboard are editable and saved to the browser's
  `localStorage`, so edits persist per-device.

## Editing content

Copy lives directly in each `.html` file — there's no CMS. To change a headline or a
stat, open the relevant page and edit the text. To restyle globally, edit
`assets/brigid.css` (the `:root` block at the top holds every colour and font).

## Deploying to GitHub Pages

1. Push to GitHub.
2. In the repo's **Settings → Pages**, set the source to the branch and `/root`.
3. Your site goes live at `https://<user>.github.io/<repo>/`.

---

Built at Queen's University DDQIC · Kingston · Toronto · brigidhealth.ca
