# Dilana Damsath — Portfolio

A minimal, editorial-style portfolio site with dark mode, a custom cursor,
scroll animations, and a contact form powered by Formspree — so the whole
site runs as static files and hosts cleanly on GitHub Pages.

## Files

```
portfolio/
├── index.html          Page structure
├── style.css            All styling, light + dark theme tokens
├── script.js            Cursor, preloader, dark mode, scroll reveal, form logic
├── assets/profile.jpg    Your processed profile photo
├── app.py                Optional — local backend that saves form entries to
│                          a CSV file. Only useful if you run the site locally
│                          with Python; not used once you're on GitHub Pages.
└── requirements.txt     Python dependency for app.py (Flask)
```

## 1. Set up Formspree (one-time, ~2 minutes)

The contact form needs somewhere to send messages. [Formspree](https://formspree.io)
is a free service that emails you every submission — no backend required.

1. Go to **https://formspree.io** and create a free account.
2. Click **New Form**, give it a name (e.g. "Portfolio Contact"), and copy
   the endpoint it gives you. It looks like:
   `https://formspree.io/f/abcdwxyz`
3. Open `index.html`, find this line, and replace `YOUR_FORM_ID`:
   ```html
   <form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" autocomplete="off">
   ```
4. Open `script.js`, find this line near the top of the form-handling code,
   and replace `YOUR_FORM_ID` with the **same** ID:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
5. Submit the form once after it's live — Formspree sends a confirmation
   email the first time, and you need to click it to activate the form.

## 2. Push the code to GitHub

If you don't already have a repo:

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME/YOUR_REPO` with your actual GitHub username and a repo
name you've created on GitHub (e.g. `portfolio` or `YOUR_USERNAME.github.io`).

## 3. Turn on GitHub Pages

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait a minute, then your site will be live at either:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO/` (normal repo), or
   - `https://YOUR_USERNAME.github.io/` (if the repo is literally named
     `YOUR_USERNAME.github.io`)

GitHub shows the exact URL at the top of the Pages settings once it's built.

## Before you publish

- **Add your real GitHub URL** for the profile buttons. Open `index.html`
  and search for `href="https://github.com/"` (nav, hero, mobile menu, and
  footer) and replace with `https://github.com/your-username`.
- **Add your real LinkedIn URL.** Search `index.html` for
  `YOUR_LINKEDIN_ID` (nav, hero, mobile menu, and footer) and replace with
  your profile, e.g. `https://www.linkedin.com/in/dilana-damsath`.
- **Add your CV.** Drop your resume PDF into the `assets` folder and name it
  exactly `Dilana-Damsath-CV.pdf` (or update the three
  `assets/Dilana-Damsath-CV.pdf` references in `index.html` — hero, mobile
  menu, and footer — to match whatever filename you use).
- **Double-check the Formspree ID** is correctly pasted in both `index.html`
  and `script.js` — a mismatch or leftover `YOUR_FORM_ID` will make the form
  fail silently.

## Running it locally with the CSV backend (optional)

If you ever want the original local-CSV version back (e.g. for testing
offline), `app.py` still works — it serves the site and writes submissions
to `contacts.csv`:

```bash
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000`. Note this only works when you run it this
way; it does nothing on GitHub Pages.

## Customizing

- **Colors & fonts** — CSS variables at the top of `style.css` (`:root` for
  light mode, `html[data-theme="dark"]` for dark).
- **Copy** — all text lives directly in `index.html`.
- **Photo** — swap `assets/profile.jpg` for a new image (similar portrait
  aspect ratio works best).
