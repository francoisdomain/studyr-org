# studyR — studyr.org

The studyR website: books that teach marketers to code, one volume at a time.
Built with [Eleventy](https://www.11ty.dev/) as a static site, with no framework and no JavaScript bundle.
GitHub builds it and publishes it to GitHub Pages on every push to `main`.

## Adding or updating a book: the 90% case

Every book is **one Markdown file** in `src/books/`. The file name becomes the URL:
`src/books/handlebars-vol-1.md` → `studyr.org/handlebars-vol-1/`.

Adding a file automatically:
- adds it to the **Books** menu (grouped by series) and the `/books/` catalogue,
- shows it on the home page (the next upcoming release is featured),
- adds it to the sitemap and to "More in this series" on sibling books.

### Fields

| Field | What it does |
|---|---|
| `series`, `volume` | e.g. `Handlebars`, `1` → shown as "Handlebars Vol.1" |
| `fullTitle`, `platform`, `level`, `tagline` | Text shown on the book page |
| `seriesOrder` | Order of series in menus (lower first) |
| `status` | `coming-soon`, `available` or `out-of-print` |
| `releaseDate` | `2027-01-27`: shown on coming-soon pages; the soonest is featured on the home page |
| `asin` | Amazon ID. When set and `status: available`, the Amazon buttons for all 12 stores appear |
| `cover`, `coverWide`, `coverOg` | Images in `src/assets/img/`. **No cover yet?** Leave it out and a typographic placeholder is drawn in the series colour |
| `features` | The tags shown under the title (Theory, Examples…) |
| `downloads` | Parts, each with files and import steps. Put the files in `src/downloads/<book>/` |
| `killerChallenge` | Creates `/<book>/help/` with the approach and solution download |
| `bonusChallenges: true` | Creates `/<book>/bonus-challenges/` with a comment thread |

Copy `src/books/ampscript-vol-1.md` as a template: it uses every field.
Anything written below the `---` becomes the "About" section of the book page.

### Launch day for a book

```yaml
status: available          # was: coming-soon
asin: B0XXXXXXXX
cover: /assets/img/handlebars-vol1-cover.webp
```

### New series

Add its colours at the top of `src/assets/css/style.css` (`--series-<name>-bg` / `--series-<name>-book`)
and a matching `.cover--<name>` line under "Covers". Otherwise placeholders fall back to grey.

## Other content

| What | Where |
|---|---|
| Home page (hero, The Method) | `src/index.njk` |
| Downloads, Killer and Bonus Challenges index pages | `src/pages/` (lists are generated from the books) |
| Header / menu / footer | `src/_includes/partials/` |
| Book page layout | `src/_includes/layouts/book.njk` |
| Site name, tagline, Amazon stores, comments settings | `src/_data/site.json` |
| Old URL → new URL redirects | `src/_data/redirects.json` |
| Colours, fonts, spacing | variables at the top of `src/assets/css/style.css` |

## Run locally

```bash
npm install
npm start          # http://localhost:8080, reloads on save
npm run build      # outputs to _site/
```

The build **fails if any internal link, image, download or #anchor is broken**, so a renamed page or missing file
can't go live by accident.

## Bonus Challenge comments (one-time setup)

Comments use [giscus](https://giscus.app): each book's thread is stored as a GitHub Discussion in this repo.
It's free, has no database and no ads, and moderation happens in GitHub. Readers need a GitHub account to post.

1. Repo **Settings → General → Features**: tick **Discussions**.
2. In the **Discussions** tab, create a category called **Bonus Challenges**. Use the *Announcement* type so only
   giscus/you can start threads.
3. Install the giscus app: https://github.com/apps/giscus → only this repository.
4. On https://giscus.app enter `francoisdomain/studyr-org`, pick the category, and copy the `data-category-id`
   value into `comments.categoryId` in `src/_data/site.json`.

Until step 4 is done, the page shows "The discussion thread for these challenges opens soon."

## Deploy (one-time setup)

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Custom domain `studyr.org` (the `CNAME` file is already included). Then point the domain's DNS at GitHub Pages
   ([instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)),
   and tick **Enforce HTTPS** once the certificate is issued.

After that, every push to `main` builds and publishes the site (see the **Actions** tab).
Pull requests are built too, so broken links show up before merging.

## Old WordPress URLs

Every URL from the WordPress site still works:

| Old | Now |
|---|---|
| `/`, `/ampscript-vol-1/`, `/killer-challenges/`, `/bonus-challenges/` | same URL |
| `/ampscript-vol-1-2/` | → `/downloads/` |
| `/ampscript-vol-1-help/` | → `/ampscript-vol-1/help/` |
| `/ampscript-vol-1-bonus-challenges/` | → `/ampscript-vol-1/bonus-challenges/` |
| `/ampscript-vol-1-beta-testers/` | → `/ampscript-vol-1/` |
| `/2022/12/03/ampscript-vol-1/` | → `/ampscript-vol-1/#about` |
