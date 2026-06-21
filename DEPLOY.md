# Hosting LineRate (free) and sharing it with the client

The design system is a Next.js app. The simplest free way to put it online so
you can send the client a link is **Vercel** (the company behind Next.js; the
Hobby tier is free for this).

## Option A: Vercel via GitHub (recommended, gives a stable URL)

1. Push this repo to GitHub (a private repo is fine).
   ```bash
   git remote add origin https://github.com/<you>/linerate-app.git
   git push -u origin main
   ```
2. Go to https://vercel.com, sign in with GitHub (free).
3. **Add New > Project**, import the `linerate-app` repo, and click **Deploy**.
   No configuration is needed; Vercel detects Next.js automatically.
4. You get a URL like `https://linerate-app.vercel.app`. Send that to the
   client. Every `git push` to `main` redeploys automatically.

## Option B: Vercel from the terminal (fastest, no GitHub)

```bash
npm i -g vercel
vercel          # first run: log in, accept defaults
vercel --prod   # promote to the public production URL
```

## Other free options

- **Netlify** and **Cloudflare Pages** both deploy Next.js on free tiers via
  the same "connect a Git repo" flow as Vercel.

## What the client does

Point them at the deployed URL. On the page, the **Get started** section has a
**Download DESIGN.md** button (the file is served at `/DESIGN.md`). Tell them:

1. Download `DESIGN.md`.
2. Open an AI tool (Claude, Cursor) or hand the file to a developer; paste
   `DESIGN.md` in as context.
3. Ask for a screen "in the LineRate system" (for example, "a settlement
   dashboard"). The tokens, type rules, primitives, and patterns in the file
   keep every result on brand. Brand marks (wordmark, avatars) download from
   the **Brand assets** section.

`DESIGN.md` is kept in sync with the live app automatically: the `sync:design`
npm script copies it into `/public` before every `dev` and `build`.
