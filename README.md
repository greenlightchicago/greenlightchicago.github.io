# GreenLight Chicago One-Page Website

Production-ready static landing page for **GreenLight Chicago**, built with HTML, CSS, and JavaScript only.

## Suggested repository name

`greenlightchicago.github.io`

If you want the site at `https://greenlightchicago.github.io`, the repository name must be exactly `greenlightchicago.github.io` under the `greenlightchicago` account.

## Project structure

```text
.
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── logo.svg
    └── favicon.svg
```

## What to edit later

### 1) Edit email address + mailto fields

Open `script.js` and edit:

- `GREENLIGHT_EMAIL`
- `JOIN_EMAIL_SUBJECT`
- `JOIN_EMAIL_BODY`

All join buttons and visible email text are automatically updated from those constants.

### 2) Edit text content

Open `index.html` and update copy section-by-section.

### 3) Edit colors and typography

Open `style.css` and update CSS variables inside `:root`.

### 4) Edit launch goals metrics

Open `index.html` and change each metric's:

- `data-target="..."`
- label text below it

These are animated by JavaScript in `script.js`.

## Run locally

```bash
cd "/Users/tanmaichad/Documents/New project/greenlight-chicago-landing"
python3 -m http.server 8080
```

Visit [http://localhost:8080](http://localhost:8080).

## Push to GitHub (exact commands)

If your remote already exists and points to your target repo:

```bash
cd "/Users/tanmaichad/Documents/New project/greenlight-chicago-landing"
git add .
git commit -m "Update GreenLight Chicago landing page"
git push origin main
```

If you need to set the remote for the first time:

```bash
cd "/Users/tanmaichad/Documents/New project/greenlight-chicago-landing"
git remote add origin https://github.com/greenlightchicago/greenlightchicago.github.io.git
git add .
git commit -m "Initial GreenLight Chicago landing page"
git push -u origin main
```

## Enable GitHub Pages

For a user-site repository (`greenlightchicago.github.io`), GitHub will typically publish automatically from `main`.

If needed:

1. Go to repository `Settings -> Pages`
2. Under **Build and deployment**, select **Deploy from a branch**
3. Select branch `main` and folder `/(root)`
4. Save

Live URL:

- [https://greenlightchicago.github.io](https://greenlightchicago.github.io)

## Connect a custom domain later

1. Buy your domain (example: `greenlightchicago.org`)
2. In GitHub repo `Settings -> Pages`, set **Custom domain**
3. Add DNS records at your domain provider:

For root domain (`@`), add A records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For `www`, add CNAME:

- `www -> greenlightchicago.github.io`

4. Wait for DNS propagation
5. Enable **Enforce HTTPS** in GitHub Pages

## Notes

- No backend required.
- No external JS libraries used.
- Animations respect `prefers-reduced-motion`.
