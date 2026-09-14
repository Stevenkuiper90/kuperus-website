# Website Autospuitbedrijf Kuperus

Nieuwe website voor [Autospuitbedrijf Kuperus B.V.](https://www.autospuitbedrijfkuperus.nl) in Heerenveen. Statische site, gehost via GitHub Pages.

## Status

Preview-fase, huisstijl definitief: **variant A** (donkerblauw met geel accent, kleuren uit het logo). Pagina's hebben een `noindex`-meta tot de livegang. Sommige foto's zijn nog plaatshouders tot de contentshoot (verwacht medio september 2026).

## Opzet

- Pure HTML/CSS, geen build-stap, geen framework
- `css/style.css` bevat het volledige ontwerp
- Beeldmateriaal in `assets/img/` (webp, geoptimaliseerd)
- Pagina's: `index.html`, `schadeherstel.html`, `vrachtwagens.html`, `stralen.html`, `voorwaarden.html`

## Checklist livegang

1. ~~Variant-keuze definitief maken~~ - klaar, variant A (14-09-2026)
2. ~~Variantschakelaar en variant B verwijderen~~ - klaar (14-09-2026)
3. DNS-gegevens naar SkarWeb (beheert DNS voor autospuitbedrijfkuperus.nl) - zie `projecten/kuperus-website/PLAN.md` in Mainframe voor de exacte records
4. **Pas als de DNS-wijziging bevestigd/doorgevoerd is**: `CNAME`-bestand toevoegen met `www.autospuitbedrijfkuperus.nl` en gelijktijdig pushen - LET OP: GitHub Pages redirect de `*.github.io`-preview-URL automatisch naar het custom domain zodra het CNAME-bestand er staat, dus dit breekt de huidige previewlink totdat de DNS ook echt wijst naar GitHub. Daarom bewust nog niet toegevoegd.
5. `noindex`-meta verwijderen uit alle pagina's
6. sitemap.xml/robots.txt controleren (staan er al, zie root), Google Search Console koppelen
7. 301-redirects vanaf de oude URL-structuur (zie SEO-STRATEGIE.md in Mainframe)
