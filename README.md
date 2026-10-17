# christopherhamm.com

Personal resume site for Christopher Hamm, served by GitHub Pages from this repository (custom domain in `CNAME`).

## Files

- `index.html` – the resume page
- `style.css` – styles, including dark mode and the print layout used for the PDF
- `Christopher-Hamm-Resume.pdf` – downloadable resume, generated from `index.html`
- `US9805135-Patent.pdf`, `headshot.jpg`, `favicon.ico` – linked assets
- `404.html`, `robots.txt`, `sitemap.xml` – site housekeeping

## Updating

1. Edit `index.html`.
2. Regenerate the PDF so it matches the page:

   ```sh
   npm install playwright && npx playwright install chromium   # first time only
   node scripts/build-pdf.js
   ```

3. Update `<lastmod>` in `sitemap.xml` and commit.
