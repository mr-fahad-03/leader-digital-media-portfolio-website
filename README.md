# Leader Digital Media — Website

Static website for **Leader Digital Media (SMC-Private) Limited**
Unit No. 10, Ramp Area, Shaikh Sultan Trust, Karachi 74200, Pakistan.

Plain HTML, CSS and JavaScript. No build step, no frameworks, no dependencies to install.
Open `index.html` in a browser to view it, or upload the whole folder to any web host.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `services.html` | Services (8 services) |
| `portfolio.html` | Our Work |
| `faq.html` | FAQs |
| `contact.html` | Contact + enquiry form + map |
| `privacy-policy.html` | Privacy Policy |
| `terms-and-conditions.html` | Terms & Conditions |
| `cookie-policy.html` | Cookie Policy |
| `refund-policy.html` | Refund & Cancellation Policy |
| `disclaimer.html` | Disclaimer |
| `404.html` | Not-found page |
| `sitemap.xml`, `robots.txt` | Search engine files |

Shared assets live in `assets/css/style.css` and `assets/js/main.js`.

---

## BEFORE YOU GO LIVE — placeholders to replace

These are stand-in values. Search and replace them across all `.html` files.

| Placeholder | Where | Replace with |
|---|---|---|
| `+92 300 1234567` / `+923001234567` | top bar, footer, contact page | Your real phone number |
| `info@leaderdigitalmedia.com` | throughout | Your real email address |
| `support@leaderdigitalmedia.com` | contact page, footer | Your real support email |
| `https://www.leaderdigitalmedia.com` | canonical tags, `sitemap.xml`, `robots.txt` | Your real domain |
| `href="#"` on social icons | header + footer | Your Facebook / Instagram / LinkedIn / YouTube URLs |
| Office hours (Mon–Sat, 10:00–19:00) | top bar, footer, contact | Your actual hours |

Example, from this folder:

```bash
# replace the phone number everywhere
sed -i '' 's/+92 300 1234567/+92 21 1234567/g; s/+923001234567/+92211234567/g' *.html
```

### Sample content to replace with your own

- **Statistics** on the home page (`120+ projects`, `60+ brands`, `9 years`, `94% retention`)
  and the About page — change these to your real figures.
- **Portfolio projects** in `portfolio.html` and the three on `index.html` are illustrative
  examples. Replace the project names, descriptions and result figures with work you have
  actually delivered, and get client permission before naming anyone.
- **Testimonials** on `index.html` are placeholders marked "Client name". Replace them with
  real, attributed quotes, or delete that section.
- **Hero "Campaign snapshot" figures** (+184%, +127%, 4.6x) — illustrative.

### Legal pages

The five policy pages are written as a solid, complete starting point referencing Pakistani
law and Karachi jurisdiction. Have a lawyer review them against how your company actually
operates before publishing. Update the "Last updated" date in each file when you do.

---

## Making the contact form actually send

The form on `contact.html` validates input and shows a success message, but it does **not**
send anything anywhere yet — there is no backend. Pick one:

**Option 1 — a form service (no server needed).** Sign up with a provider such as Formspree,
Web3Forms or Getform, then edit the `<form>` tag in `contact.html`:

```html
<form id="contact-form" action="https://your-form-endpoint" method="POST">
```

and in `assets/js/main.js`, delete the `e.preventDefault();` line inside the submit handler
so the browser performs the real submission once validation passes.

**Option 2 — your own backend.** Point the same `action` at your own PHP/Node endpoint.

**Option 3 — mailto (simplest, least reliable).** Replace the form with a plain
`mailto:` link. Not recommended — many visitors have no mail client configured.

---

## Deploying to Vercel

The site is static with no build step, so Vercel serves it as-is. `vercel.json` is already
configured (security headers, no URL rewriting) and `404.html` is picked up automatically.

**Option 1 — connect the GitHub repo (recommended).**

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import `mr-fahad-03/leader-digital-media-portfolio-website`.
3. Leave every setting at its default:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: *(empty)*
   - Output Directory: *(empty)*
4. Click **Deploy**.

Every push to `main` then redeploys automatically.

**Option 2 — deploy from this folder with the CLI.**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### After the first deploy

1. Add your custom domain under **Project → Settings → Domains**.
2. Update the domain in these files, which currently use a placeholder
   (`https://www.leaderdigitalmedia.com`):
   - the `<link rel="canonical">` and `og:url` tags in every `.html` file
   - `sitemap.xml`
   - `robots.txt`
3. Submit `sitemap.xml` through Google Search Console.

### Other hosts

Being plain static files, the site also runs on cPanel shared hosting (upload to
`public_html`), Netlify, Cloudflare Pages or GitHub Pages without changes.

---

## Notes on how it is built

- **Light theme**, no dark mode, as requested.
- **Responsive** down to 360px; verified with no horizontal overflow at 360, 768 and 1440px.
- **Accessible**: skip link, keyboard-operable menu and accordions, ARIA attributes on
  interactive controls, visible focus rings, `prefers-reduced-motion` respected.
- **SEO**: unique title and meta description per page, canonical URLs, Open Graph tags,
  Organization schema on the home page, FAQPage schema on the FAQ page.
- **No external dependencies** apart from Google Fonts (Sora + Inter). To self-host the
  fonts, download them and swap the `<link>` tag in each page's `<head>`.
- Icons are inline SVG, so there is no icon library to load.
