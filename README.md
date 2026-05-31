# Sai Teja Jarabala — Cinematic Portfolio v3

Premium Next.js App Router portfolio using a cinematic talking-head video background, Three.js particles, GSAP entrance animations, and resume-aligned project sections.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## GitHub Pages Deployment

This version is configured for:

```text
https://saitejajarabala.github.io/sai-teja-portfolio/
```

Deploy with:

```bash
npm install
npm run deploy
```

Then in GitHub:

```text
Settings → Pages → Deploy from a branch → gh-pages → /(root)
```

## Important Fixes in v3

- Added `next.config.js` with production-only GitHub Pages base path.
- Added `public/.nojekyll` so GitHub Pages serves `_next` assets correctly.
- Updated deploy command to `gh-pages -d out -t` so dotfiles are published.
- Added production-safe video path handling for `/media/portfolio-intro.mp4`.
- Added `.gitignore` to avoid pushing `node_modules`, `.next`, and `out` to `main`.

## Structure

```text
app/
components/VideoIntro/
public/media/portfolio-intro.mp4
public/.nojekyll
next.config.js
package.json
```
