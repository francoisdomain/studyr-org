# studyR — studyr.org

Static rebuild of [studyr.org](https://studyr.org/), originally hosted on WordPress.com.
Plain HTML + CSS + a few lines of JavaScript: no framework, no build step.

## Structure

```
index.html                              Home
ampscript-vol-1/                        Learn → AMPscript (vol.1) book page + Amazon store links
ampscript-vol-1-2/                      Downloads → AMPscript vol 1 & 2 (DropBox data files)
killer-challenges/                      Challenges → Killer Challenges
bonus-challenges/                       Challenges → Bonus Challenges
ampscript-vol-1-help/                   Killer Challenge help & solution
ampscript-vol-1-bonus-challenges/       Vol.1 bonus challenges
ampscript-vol-1-beta-testers/           Beta testers (linked from the home cover image)
2022/12/03/ampscript-vol-1/             Original blog post
assets/css/style.css                    All styles (colours, fonts, layout tokens at the top)
assets/js/main.js                       Mobile menu + dropdown behaviour
assets/img/                             Images (see "Images" below)
scripts/fetch-assets.sh                 Pulls the original images from the WordPress site
```

Each page lives in its own folder as `index.html`, so URLs stay identical to the
WordPress site (`/killer-challenges/` etc.) and existing links keep working.

## Run locally

Paths are root-relative (`/assets/...`), so serve the folder rather than opening files directly:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Images

The three images (book covers + favicon) are copied from the live site with:

```bash
./scripts/fetch-assets.sh
```

Run it once before the first deploy (and before WordPress.com is switched off), then commit `assets/img/`.

## Making changes

- **Colours / fonts / widths:** edit the variables at the top of `assets/css/style.css`
  (`--color-bg` is the mint green, `--content-size` the reading column).
- **Navigation:** the header and footer are repeated in every `index.html`. When adding a page
  or menu item, update the `<nav>` block in each file (search for `class="nav__list"`).
- **New page:** copy an existing folder (e.g. `bonus-challenges/`), rename it, and edit the
  `<title>`, meta description, canonical URL and `<main>` content.

## Deploy

Works on any static host. For GitHub Pages: Settings → Pages → deploy from `main` / root.
The `CNAME` file sets the custom domain to `studyr.org`; point the domain's DNS at GitHub Pages
when you are ready to move off WordPress.com. Netlify, Vercel and Cloudflare Pages work the same
way with no build command and `/` as the publish directory.
