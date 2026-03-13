# GreenLight Chicago Landing Page

Minimal, modern, one-page static site for **GreenLight Chicago**, designed for free deployment on GitHub Pages.

## Suggested repository name

`greenlight-chicago-landing`

## Project structure

```text
greenlight-chicago-landing/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── logo.svg
│   └── favicon.svg
└── README.md
```

## Quick edits

1. **Change contact email + mailto template**
   - Open `script.js`
   - Edit `GREENLIGHT_EMAIL`, `JOIN_EMAIL_SUBJECT`, and `JOIN_EMAIL_BODY`
2. **Change text content**
   - Open `index.html`
3. **Change colors and typography**
   - Open `style.css`
   - Edit values in the `:root` section
4. **Change logo/favicon**
   - Replace files in `assets/` and keep the same filenames

## Local preview

From the project folder:

```bash
cd greenlight-chicago-landing
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Exact GitHub push steps

From inside `greenlight-chicago-landing`:

```bash
git init
git add .
git commit -m "Initial GreenLight Chicago landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/greenlight-chicago-landing.git
git push -u origin main
```

## Enable GitHub Pages (free)

1. On GitHub, open your repository.
2. Go to **Settings -> Pages**.
3. In **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Click **Save**.
6. Wait 1-3 minutes for deployment.
7. Site URL will be:
   - `https://YOUR_USERNAME.github.io/greenlight-chicago-landing/`

## Connect a custom domain later

1. Buy or use a domain (example: `greenlightchicago.org`).
2. In GitHub repo **Settings -> Pages**, add your domain under **Custom domain**.
3. Add DNS records at your domain provider:
   - For root domain (`greenlightchicago.org`): add these A records:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - For `www`: add a CNAME record pointing to `YOUR_USERNAME.github.io`.
4. Wait for DNS to propagate.
5. In GitHub Pages settings, enable **Enforce HTTPS** when available.

## Notes

- No backend required.
- All join CTAs use `mailto:`.
- Social links in footer are placeholders (`#`) and can be replaced later.
