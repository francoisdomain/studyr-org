// Eleventy configuration for studyr.org
// Docs: https://www.11ty.dev/docs/config/
import fs from "node:fs";
import path from "node:path";

const STATUS_LABELS = {
  "available": "Available now",
  "coming-soon": "Coming soon",
  "out-of-print": "Out of print",
};

export default function (eleventyConfig) {
  // ---------------------------------------------------------------- Static files
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/downloads": "downloads" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Self-hosted fonts (no Google Fonts request)
  const rhd = "node_modules/@fontsource/red-hat-display/files";
  for (const w of [400, 500, 700, 900]) {
    eleventyConfig.addPassthroughCopy({
      [`${rhd}/red-hat-display-latin-${w}-normal.woff2`]: `assets/fonts/red-hat-display-${w}.woff2`,
    });
  }
  const cp = "node_modules/@fontsource/courier-prime/files";
  for (const w of [400, 700]) {
    eleventyConfig.addPassthroughCopy({
      [`${cp}/courier-prime-latin-${w}-normal.woff2`]: `assets/fonts/courier-prime-${w}.woff2`,
    });
  }

  // ---------------------------------------------------------------- Collections
  // Every Markdown file in src/books/ is a book. Sorted by series, then volume.
  eleventyConfig.addCollection("books", (api) =>
    api.getFilteredByGlob("src/books/*.md").sort((a, b) =>
      (a.data.seriesOrder ?? 99) - (b.data.seriesOrder ?? 99) ||
      a.data.series.localeCompare(b.data.series) ||
      a.data.volume - b.data.volume)
  );

  // Books that get their own sub-pages
  const sortedBooks = (api) => api.getFilteredByGlob("src/books/*.md");
  eleventyConfig.addCollection("booksWithKillerChallenge", (api) =>
    sortedBooks(api).filter((b) => b.data.killerChallenge));
  eleventyConfig.addCollection("booksWithBonusChallenges", (api) =>
    sortedBooks(api).filter((b) => b.data.bonusChallenges));

  // Books grouped by series: [{ name, books: [...] }]
  eleventyConfig.addFilter("groupBySeries", (books) => {
    const groups = [];
    for (const book of books) {
      let g = groups.find((x) => x.name === book.data.series);
      if (!g) groups.push((g = { name: book.data.series, platform: book.data.platform, books: [] }));
      g.books.push(book);
    }
    return groups;
  });

  // The next upcoming book with a release date (featured on the home page)
  eleventyConfig.addFilter("nextRelease", (books) =>
    books
      .filter((b) => b.data.status === "coming-soon" && b.data.releaseDate)
      .sort((a, b) => new Date(a.data.releaseDate) - new Date(b.data.releaseDate))[0]
  );

  eleventyConfig.addFilter("withStatus", (books, status) => books.filter((b) => b.data.status === status));
  eleventyConfig.addFilter("findByUrl", (books, url) => books.find((b) => b.url === url));
  eleventyConfig.addFilter("sameSeries", (books, series, exceptUrl) =>
    books.filter((b) => b.data.series === series && b.url !== exceptUrl));
  eleventyConfig.addFilter("withField", (books, field) => books.filter((b) => b.data[field]));

  // ---------------------------------------------------------------- Filters
  eleventyConfig.addFilter("statusLabel", (s) => STATUS_LABELS[s] || s);

  eleventyConfig.addFilter("longDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }));

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  eleventyConfig.addFilter("absoluteUrl", (p, base) => new URL(p, base).href);

  // ---------------------------------------------------------------- Link check
  // After each build, every internal link, image and #anchor must resolve,
  // otherwise the build fails. Keeps redirects and menus honest as books are added.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const out = dir.output;
    const htmlFiles = [];
    (function walk(d) {
      for (const f of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, f.name);
        if (f.isDirectory()) walk(p);
        else if (f.name.endsWith(".html")) htmlFiles.push(p);
      }
    })(out);

    const idsCache = new Map();
    const idsOf = (file) => {
      if (!idsCache.has(file)) {
        const html = fs.readFileSync(file, "utf8");
        idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
      }
      return idsCache.get(file);
    };
    const resolve = (urlPath) => {
      const p = path.join(out, decodeURIComponent(urlPath));
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
      const idx = path.join(p, "index.html");
      return fs.existsSync(idx) ? idx : null;
    };

    const problems = [];
    for (const file of htmlFiles) {
      const html = fs.readFileSync(file, "utf8");
      const refs = [...html.matchAll(/\s(?:href|src|content)="(\/[^"]*)"/g)].map((m) => m[1]);
      for (const ref of refs) {
        if (ref.startsWith("//")) continue;
        const [pathAndQuery, hash] = ref.split("#");
        const urlPath = pathAndQuery.split("?")[0];
        const target = urlPath ? resolve(urlPath) : file;
        if (!target) { problems.push(`${path.relative(out, file)} → ${ref} (missing page/file)`); continue; }
        if (hash && target.endsWith(".html") && !idsOf(target).has(hash)) {
          problems.push(`${path.relative(out, file)} → ${ref} (missing #${hash})`);
        }
      }
    }
    if (problems.length) {
      throw new Error(`Broken internal links:\n  ${[...new Set(problems)].join("\n  ")}`);
    }
    console.log(`[link check] ${htmlFiles.length} pages, all internal links OK`);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
