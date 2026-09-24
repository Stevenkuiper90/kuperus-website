// Zet de Umami-teller (cookievrij) in alle echte HTML-pagina's en markeert klikken op
// bellen en mailen als events. Veilig om opnieuw te draaien (idempotent).
// Gebruik: node scripts/add-umami.js <website-id>
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const websiteId = process.argv[2];
if (!/^[0-9a-f-]{36}$/i.test(websiteId || '')) {
  console.error('Gebruik: node scripts/add-umami.js <website-id> (uuid uit Umami > Website-instellingen)');
  process.exit(1);
}

const SCRIPT_TAG = `  <script defer src="https://cloud.umami.is/script.js" data-website-id="${websiteId}"></script>\n`;
const SKIP_DIRS = new Set(['.git', 'node_modules', 'test', 'scripts']);

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return SKIP_DIRS.has(e.name) ? [] : htmlFiles(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

let changed = 0;
for (const file of htmlFiles(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  // Redirect-stubs van de oude WordPress-site niet meetellen.
  if (/http-equiv=["']refresh["']/i.test(html)) continue;

  const before = html;
  if (!html.includes('cloud.umami.is/script.js')) {
    html = html.replace('</head>', SCRIPT_TAG + '</head>');
  }
  html = html.replace(/<a ([^>]*href="(tel|mailto):[^"]*"[^>]*)>/g, (m, attrs, kind) => {
    if (attrs.includes('data-umami-event')) return m;
    const event = kind === 'tel' ? 'klik-bellen' : 'klik-mailen';
    return `<a ${attrs} data-umami-event="${event}">`;
  });

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
    console.log('bijgewerkt:', path.relative(ROOT, file));
  }
}
console.log(`Klaar: ${changed} pagina('s) bijgewerkt.`);
