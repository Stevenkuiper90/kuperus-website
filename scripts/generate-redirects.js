// Genereert statische redirect-stubs voor oude WordPress-URL's (meta-refresh + canonical,
// want GitHub Pages ondersteunt geen server-side 301). Eenmalig gedraaid bij livegang.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.autospuitbedrijfkuperus.nl';

// [oude map (zonder leidende/sluitende slash), nieuw pad (relatief t.o.v. root, met # waar van toepassing)]
const redirects = [
  ['portfolio-items/industrieel-stralen-en-conserveren', 'stralen.html'],
  ['portfolio-items/spuiten', 'spuitwerk.html'],
  ['portfolio-items/stralen-voor-de-particulier', 'stralen.html'],
  ['contact/routebeschrijving', '#contact'],
  ['home/diensten', '#diensten'],
  ['home/geschiedenis', '#over-ons'],
  ['home/fotogalerij', '#werk'],
  ['disclaimer', 'voorwaarden.html'],
  ['privacy-verklaring', 'voorwaarden.html'],
  ['sitemap', ''],
  ['schade', 'schadeherstel.html'],
  ['schade/schadeherstel', 'schadeherstel.html'],
  ['schade/bedrijven', 'schadeherstel.html'],
  ['schade/particulier', 'schadeherstel.html'],
  ['schade/uitdeuken', 'schadeherstel.html'],
  ['spuiten', 'spuitwerk.html'],
  ['spuiten/voorbereiding', 'spuitwerk.html'],
  ['spuiten/bedrijven', 'spuitwerk.html'],
  ['spuiten/interieur', 'spuitwerk.html'],
  ['spuiten/industrie-en-landbouw', 'spuitwerk.html'],
  ['spuiten/particulier', 'spuitwerk.html'],
  ['belettering', 'belettering.html'],
  ['belettering/bedrijfswagen', 'belettering.html'],
  ['belettering/vrachtwagens', 'belettering.html'],
  ['belettering/trailers-en-opleggers', 'belettering.html'],
  ['stralen', 'stralen.html'],
  ['stralen/bedrijven', 'stralen.html'],
  ['stralen/stralen-en-ontroesten', 'stralen.html'],
  ['stralen/particulier', 'stralen.html'],
  ['stralen/industrie-en-landbouw', 'stralen.html'],
  ['stralen-voor-bedrijven', 'stralen.html'],
  ['stralen-boten', 'stralen.html'],
  ['industrie', '#diensten'],
  ['contact', '#contact'],
  ['onderhoud', ''],
  ['test', ''],
  ['spuitbedrijf-sneek', ''],
  ['spuitbedrijf-heerenveen', ''],
  ['spuitbedrijf-joure', ''],
  ['spuitbedrijf-friesland', ''],
  ['spuitbedrijf-drachten', ''],
];

function pageFor(oldPath, newPath) {
  const target = newPath.startsWith('#') ? `${BASE}/${newPath}` : `${BASE}/${newPath}`;
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autospuitbedrijf Kuperus</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <meta name="robots" content="noindex, follow">
</head>
<body>
  <p>Deze pagina is verplaatst. Ga naar <a href="${target}">${target}</a>.</p>
</body>
</html>
`;
}

let count = 0;
for (const [oldPath, newPath] of redirects) {
  const dir = path.join(ROOT, oldPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageFor(oldPath, newPath));
  count++;
}
console.log(`${count} redirect-stubs gegenereerd.`);
