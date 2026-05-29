# Big Hope Sports — Content Management (Sanity) Setup

The site content (sports/ranges, products, packages, hero images) now lives in
**Sanity**, a free hosted CMS. The client edits everything at **`/studio`** with
no code. The site is built with Next.js and deployed on **Vercel**, which
auto-updates whenever content is published.

You only need to do the one-time setup below **once**. After that, the client
just logs into `/studio`.

---

## Part 1 — One-time developer setup

### 1. Create the Sanity project
1. Go to https://www.sanity.io and sign up (free).
2. Create a new project (name it "Big Hope Sports"). Choose dataset
   **`production`**.
3. Copy the **Project ID** from https://www.sanity.io/manage.
4. Create an **API token**: project → **API → Tokens → Add token**, role
   **Editor**. Copy it (shown once).

### 2. Fill in environment variables
Edit `.env.local` (already created, git-ignored) and set:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_WRITE_TOKEN=<the Editor token>
SANITY_REVALIDATE_SECRET=<any long random string>
```
(`.env.example` lists every variable.)

### 3. Import the existing content + images
This uploads all current images and recreates every sport, product, package,
range, and the hero slider in Sanity:
```
npm run migrate
```
Run it once. It is safe to re-run (it overwrites by ID).

### 4. Run locally
```
npm run dev
```
- Site:   http://localhost:3000
- Studio: http://localhost:3000/studio  (log in with your Sanity account)

Check the homepage grid, a sport page, a product page, a range page, and
`/packages` all render with images coming from `cdn.sanity.io`.

### 5. Deploy to Vercel
1. Push this repo to GitHub.
2. Import it at https://vercel.com (framework auto-detected as Next.js).
3. In Vercel → Settings → **Environment Variables**, add the SAME variables as
   `.env.local` (including the SMTP ones for the contact/quote forms).
4. Deploy, then point the domain at Vercel.
   > Hostinger is no longer needed for hosting — keep it only if you use it for
   > the domain or email.

### 6. Turn on instant updates (webhook)
So the live site refreshes within seconds when the client publishes:
1. Sanity → **API → Webhooks → Create webhook**.
2. URL: `https://<your-vercel-domain>/api/revalidate`
3. Trigger on: **Create, Update, Delete**; Dataset: `production`.
4. Projection: `{"_type": _type}`
5. Secret: the same value as `SANITY_REVALIDATE_SECRET`.

(Even without the webhook, pages refresh automatically at least every 60s.)

---

## Part 2 — Client guide (no code)

Go to **`https://<your-site>/studio`** and log in.

**Change a product image or text**
1. Click **Products** → pick the product.
2. Click the image to replace it (drag & drop a new file), or edit the text.
3. Click **Publish**. The website updates within a few seconds.

**Add a brand-new range / sport section**
1. Click **Sports / Ranges → Create new**.
2. Add a **Name**, a **Card image**, and pick the **Quote category**.
3. **Publish** — it instantly appears as a new card on the homepage and gets its
   own page at `/sport/<name>`.
4. Then add products to it: **Products → Create new**, choose this sport under
   **Sport / Range**, add images, **Publish**.

**Change the homepage hero slider or "Why Big Hope" image**
1. Click **Site Settings**.
2. Edit the **Hero slider** slides (desktop + mobile image, text, link) or the
   banner image. **Publish**.

That's it — no files, no FTP, no developer needed.
