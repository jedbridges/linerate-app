# Hosting LineRate (free) and sharing it with the client

The design system ships as a static export (`output: "export"` in
`next.config.ts`), so it can be hosted on any static file host for free.

## Live deploy: GitHub Pages (automated)

This repo deploys to GitHub Pages on every push to `main` via
`.github/workflows/deploy.yml`. The workflow builds the static export with
`NEXT_PUBLIC_BASE_PATH=/linerate-app` (so assets resolve under the project
sub-path) and publishes the `out/` folder.

- **URL:** `https://<your-github-username>.github.io/linerate-app/`
- **Redeploy:** just `git push` to `main`. The Actions run rebuilds and
  republishes automatically.
- **One-time setup** (already done if this repo was created with the
  automation): in the repo, **Settings > Pages > Build and deployment >
  Source** must be set to **GitHub Actions**.

If you ever rename the repo, update `NEXT_PUBLIC_BASE_PATH` in the workflow to
match the new name (it must equal `/<repo-name>`), or the CSS/JS will 404.

## Local production preview

```bash
npm run build                      # emits ./out (root-path build)
npx serve out                      # preview at http://localhost:3000

# To preview exactly as Pages serves it (under /linerate-app):
NEXT_PUBLIC_BASE_PATH=/linerate-app npm run build
```

## Other free options

The same `out/` folder works anywhere static:

- **Netlify / Cloudflare Pages:** connect the Git repo; build command
  `npm run build`, publish directory `out`. These serve from the domain root,
  so leave `NEXT_PUBLIC_BASE_PATH` unset (no sub-path needed).
- **Vercel:** import the repo at https://vercel.com (free Hobby tier). Vercel
  detects Next.js automatically and serves from the root, so no base path.

## What the client does

Point them at the deployed URL. On the page, the **Get started** section has a
**Download DESIGN.md** button (served at `<base>/DESIGN.md`). Tell them:

1. Download `DESIGN.md`.
2. Open an AI tool (Claude, Cursor) or hand the file to a developer; paste
   `DESIGN.md` in as context.
3. Ask for a screen "in the LineRate system" (for example, "a settlement
   dashboard"). The tokens, type rules, primitives, and patterns in the file
   keep every result on brand. Brand marks (wordmark, avatars) download from
   the **Brand assets** section.

`DESIGN.md` is kept in sync with the live app automatically: the `sync:design`
npm script copies it into `/public` before every `dev` and `build`.
