# Shaik Haroon Rasheed — Portfolio

Personal portfolio site. Pure HTML/CSS/JS — no build step, no dependencies.
Edit a file, push, and it's live.

## 📁 Folder structure

```
portfolio/
├── index.html              ← the whole site (structure/content only)
├── assets/
│   ├── css/
│   │   └── style.css       ← all styling lives here
│   ├── js/
│   │   └── script.js       ← all interactivity/animation lives here
│   ├── images/
│   │   └── gallery/        ← drop screenshots here, reference in index.html
│   └── resume/
│       └── resume.pdf      ← replace with your real résumé (same filename)
├── favicon.svg
├── manifest.json           ← PWA metadata (name, theme color, icon)
├── robots.txt               ← tells search engines what to crawl
├── sitemap.xml               ← tells search engines your pages
└── README.md                ← this file
```

**Why split like this:** `index.html` only holds structure and text, so you can
edit copy without scrolling past 500 lines of CSS. `style.css` holds all
design tokens (colors, fonts, spacing) at the top under `:root{}` — change a
color there once and it updates everywhere. `script.js` holds every animation
and interaction (particles, typewriter, scroll reveal, magnetic buttons,
contact form) in isolated, commented blocks.

## 🚀 First-time GitHub setup

1. **Create the repo on GitHub**
   - New repository → name it e.g. `portfolio` (or `<your-username>.github.io`
     if you want it at the root of your GitHub Pages domain).
   - Keep it public, don't initialize with a README (you already have one).

2. **Push this folder to it** (run from inside this folder):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save. Your site goes live in ~1 minute at:
     `https://<your-username>.github.io/<repo-name>/`
     (or `https://<your-username>.github.io/` if you named the repo
     `<your-username>.github.io`)

4. **Update the URLs in the code to match your real domain**
   - In `index.html`: search `shaikharoonrasheed.dev` and replace with your
     actual GitHub Pages URL (or custom domain if you buy one later).
   - In `robots.txt` and `sitemap.xml`: same — update the URL.

## ✏️ Making changes going forward

Once it's pushed, your day-to-day loop is:

```bash
git pull                      # get latest (if editing from multiple machines)
# ... edit files ...
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages automatically rebuilds within a minute or two of every push —
no separate deploy step.

**Common edits and where to make them:**

| I want to change...                  | Edit this file                          |
|---------------------------------------|------------------------------------------|
| Text, sections, links, projects       | `index.html`                              |
| Colors, fonts, spacing, layout        | `assets/css/style.css` (start at `:root`) |
| Animations, particle effect, form logic | `assets/js/script.js`                   |
| Résumé                                | `assets/resume/resume.pdf`                |
| Screenshots / gallery images          | `assets/images/gallery/`                  |
| Site icon                             | `favicon.svg`                             |

Every editable spot in `index.html` is marked with an `<!-- EDIT: ... -->`
comment — search for `EDIT` to find them all.

## 🖼️ Adding real images

1. Drop the image file into `assets/images/gallery/`, e.g. `dashboard.png`.
2. In `index.html`, find the matching `.gallery-slot` placeholder `<div>` and
   replace it with:
   ```html
   <img src="assets/images/gallery/dashboard.png" alt="HealSphear AI dashboard" style="border-radius:12px; width:100%; height:100%; object-fit:cover;">
   ```

## ➕ Adding a new project

Duplicate one `.project-card` block in the Projects section of `index.html`
and edit its title, description, and tags — no CSS changes needed, the grid
adapts automatically.

## 🌐 Optional: custom domain

If you buy a domain later (e.g. `haroonrasheed.dev`):
1. Add a file named `CNAME` (no extension) in the repo root containing just
   the domain name.
2. Point your domain's DNS `A` records to GitHub Pages' IPs (GitHub's docs
   have the current list) or a `CNAME` record to
   `<your-username>.github.io`.
3. Re-enable HTTPS in Settings → Pages once DNS propagates.

## 🧪 Previewing locally before pushing

No build tools needed — just open `index.html` directly in a browser, or for
a closer-to-production preview, run a tiny local server from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```