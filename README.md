# Softco Website

Static multi-page website for Softco Digital (English + PK variants), built with HTML, CSS, and JavaScript.

## Tech Stack
- HTML5
- CSS3
- JavaScript (jQuery + plugins)

## Project Structure
- `index.html` - Main home page
- `home-pk.html` - Pakistani home page
- `services.html`, `services-pk.html` - Services pages
- `assets/` - Shared CSS, JS, images, fonts
- `blog/`, `ppc/` - Additional sections/pages

## Run Locally
Use a local static server (recommended):

```powershell
cd d:\fahad\newsoftco-main
python -m http.server 5500 --bind 127.0.0.1
```

Then open:
- `http://127.0.0.1:5500/`
- `http://127.0.0.1:5500/home-pk.html`

## Deployment
This project is static, so it can be deployed on:
- Vercel
- Netlify
- GitHub Pages
- Any standard web hosting

## Notes
- Navbar, logo placement, dropdown behavior, and mobile responsiveness have been adjusted across pages.
- Use hard refresh (`Ctrl + Shift + R`) after CSS/JS updates.
