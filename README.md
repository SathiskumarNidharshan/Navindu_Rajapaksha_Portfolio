# Brooklyn Portfolio (NEXVIA INNOVATION)

Personal portfolio site with an admin CMS. Built for local development and **Netlify** hosting.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
- Default login: `admin` / `admin123`

Local content is stored in SQLite at `data/portfolio.db`.

## Deploy to Netlify

1. Push this project to GitHub (or connect the folder in Netlify).
2. In Netlify: **Add new site → Import from Git**.
3. Build settings (already in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Site settings → **Environment variables** (recommended):
   - `ADMIN_USERNAME` = your admin username
   - `ADMIN_PASSWORD` = a strong password  
   These apply on the **first** deploy when admin data is created.
5. Deploy. Your site URL will serve the portfolio; admin is at `/admin`.

Before deploying, you can verify the production build locally:

```bash
npm run verify:netlify
```

On Netlify, content and contact messages are stored with **Netlify Blobs** (persistent). The public site and `/api/*` routes work on the same domain.

### Important notes for Netlify

- Prefer image paths under `/images/...` (files in `public/images`) instead of huge base64 uploads — Netlify function request size is limited (~6MB).
- After first deploy, sign in at `/admin` and click **Save** on each section you change.
- Change the default password immediately if you did not set `ADMIN_PASSWORD`.

## What the admin can edit

Site branding, hero, about, process, portfolio, CTA, blog, services, clients, testimonials, contact, footer, and the contact inbox.
