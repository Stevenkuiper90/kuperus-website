# Website Autospuitbedrijf Kuperus

Nieuwe website voor [Autospuitbedrijf Kuperus B.V.](https://www.autospuitbedrijfkuperus.nl) in Heerenveen. Statische site, gehost via GitHub Pages.

## Status

Preview-fase. Twee designvarianten:

- `index.html` - variant A: donkerblauw met geel accent (kleuren uit het logo)
- `variant-b.html` - variant B: zwart/antraciet met donkerblauw accent

De pagina's hebben een `noindex`-meta tot de livegang. Foto's zijn plaatshouders tot de contentshoot (week 34).

## Opzet

- Pure HTML/CSS, geen build-stap, geen framework
- `css/style.css` bevat het volledige ontwerp (variant A), `css/theme-b.css` overschrijft alleen de kleuren
- Beeldmateriaal in `assets/img/` (webp, geoptimaliseerd)

## Checklist livegang

1. `noindex`-meta verwijderen uit beide pagina's, variant-keuze definitief maken
2. Variantschakelaar (`.variant-switch`) verwijderen
3. CNAME-bestand toevoegen met `www.autospuitbedrijfkuperus.nl`
4. DNS bij SiteOnline: A-records apex naar GitHub Pages, CNAME `www` naar `stevenkuiper90.github.io` (MX-records niet aanraken)
5. sitemap.xml en regiopagina's (SEO) toevoegen
