# My Directus Blog

A professional, editorial-style blog frontend built with Next.js 14, powered by Directus CMS.

## Stack
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS Backend**: Directus (self-hosted on Render)
- **Database**: Supabase PostgreSQL
- **Hosting**: Vercel (free)
- **Ads**: Google AdSense

---

## Step 1 — Set Up Directus Collection

In your Directus instance, create a collection called `posts` with these fields:

| Field | Type | Notes |
|---|---|---|
| `slug` | String (Unique) | URL-friendly post identifier e.g. `my-first-post` |
| `title` | String | Post headline |
| `excerpt` | Text | Short 2-3 sentence preview |
| `content` | WYSIWYG (HTML) | Full post body |
| `cover_image` | Image (File) | Cover/thumbnail image |
| `status` | Dropdown | Options: `published`, `draft` |
| `date_published` | Datetime | Publication date |
| `tags` | Tags (CSV) | Comma-separated tags |
| `read_time` | Integer | Estimated minutes to read |

**Then create a Directus Access Token:**
- Settings → Access Tokens → Create Token
- Give it read access to the `posts` collection
- Copy the token value

---

## Step 2 — Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required values:
- `NEXT_PUBLIC_DIRECTUS_URL` — your Render Directus URL
- `DIRECTUS_TOKEN` — your Directus access token
- `NEXT_PUBLIC_SITE_URL` — your Vercel deployment URL
- `NEXT_PUBLIC_BLOG_NAME` — your blog's name
- `NEXT_PUBLIC_BLOG_DESCRIPTION` — your blog's tagline
- `REVALIDATE_SECRET` — secret for n8n webhook revalidation

Optional:
- `NEXT_PUBLIC_ADSENSE_ID` — your Google AdSense publisher ID

---

## Step 3 — Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all environment variables in Vercel's project settings
4. Deploy

---

## Step 4 — n8n Automation

### Auto-publish a post from n8n:
```
POST https://your-directus.onrender.com/items/posts
Authorization: Bearer YOUR_DIRECTUS_TOKEN
Content-Type: application/json

{
  "title": "Post Title",
  "slug": "post-title",
  "excerpt": "Short preview...",
  "content": "<p>Full HTML content...</p>",
  "status": "published",
  "date_published": "2026-03-03T12:00:00",
  "tags": ["tech", "news"],
  "read_time": 5
}
```

### Trigger Vercel revalidation after publishing:
```
POST https://your-blog.vercel.app/api/revalidate
x-revalidate-secret: YOUR_REVALIDATE_SECRET
Content-Type: application/json

{
  "slug": "post-title"
}
```

Wire both HTTP Request nodes in sequence inside n8n — first create post, then revalidate.

---

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
