#!/usr/bin/env node
/**
 * Spreads publication dates across Jan–Apr 2026 instead of the current cluster
 * at 2026-03-23/24 (content-farm signal).
 *
 * Touches:
 *   - _data/legacyPosts.json           (posts 01-10)
 *   - blog/posts/*.md frontmatter      (posts 11-17)
 *   - blog/NN-*.html                   (Spanish + English visible byline, schema.org)
 *
 * Idempotent: re-running produces the same result (no drift on subsequent runs).
 */
const fs   = require('fs');
const path = require('path');

// Canonical date assignment per post number (ISO YYYY-MM-DD)
const DATES = {
  '01': '2026-01-15',
  '02': '2026-01-22',
  '03': '2026-01-29',
  '04': '2026-02-05',
  '05': '2026-02-12',
  '06': '2026-02-19',
  '07': '2026-02-26',
  '08': '2026-03-05',
  '09': '2026-03-12',
  '10': '2026-03-19',
  '11': '2026-03-26',
  '12': '2026-04-02',
  '13': '2026-04-05',
  '14': '2026-04-08',
  '15': '2026-04-11',
  '16': '2026-04-14',
  '17': '2026-04-17',
};

const MES_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MON_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function fmtEs(iso) {
  const [y,m,d] = iso.split('-').map(Number);
  return `${d} de ${MES_ES[m-1]} de ${y}`;
}
function fmtEn(iso) {
  const [y,m,d] = iso.split('-').map(Number);
  return `${MON_EN[m-1]} ${d}, ${y}`;
}

let mods = 0;

// ── 1. legacyPosts.json ──
const legacyPath = path.join(__dirname, '..', '_data', 'legacyPosts.json');
const legacy = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
let legacyChanged = false;
for (const item of legacy) {
  const num = item.num;
  if (DATES[num] && item.date !== DATES[num]) {
    item.date = DATES[num];
    legacyChanged = true;
  }
}
if (legacyChanged) {
  fs.writeFileSync(legacyPath, JSON.stringify(legacy, null, 2) + '\n', 'utf8');
  console.log('✓ UPDATED: _data/legacyPosts.json');
  mods++;
}

// ── 2. CMS markdown frontmatter (blog/posts/*.md) ──
const postsDir = path.join(__dirname, '..', 'blog', 'posts');
for (const fname of fs.readdirSync(postsDir)) {
  if (!fname.endsWith('.md')) continue;
  const fpath = path.join(postsDir, fname);
  const src = fs.readFileSync(fpath, 'utf8');
  // Extract num: "NN" from frontmatter
  const numMatch = src.match(/^num:\s*"?(\d+)"?\s*$/m);
  if (!numMatch) { console.warn('  skip (no num):', fname); continue; }
  const num = numMatch[1].padStart(2,'0');
  const newDate = DATES[num];
  if (!newDate) { console.warn('  skip (no mapping):', fname); continue; }
  const updated = src.replace(/^date:\s*\S+\s*$/m, `date: ${newDate}`);
  if (updated !== src) {
    fs.writeFileSync(fpath, updated, 'utf8');
    console.log(`✓ UPDATED: blog/posts/${fname} → ${newDate}`);
    mods++;
  }
}

// ── 3. Static legacy HTML files (01-10) ──
const blogDir = path.join(__dirname, '..', 'blog');
for (const fname of fs.readdirSync(blogDir)) {
  const m = fname.match(/^(\d{2})-.*\.html$/);
  if (!m) continue;
  const num = m[1];
  const newDate = DATES[num];
  if (!newDate) continue;
  const fpath = path.join(blogDir, fname);
  let src = fs.readFileSync(fpath, 'utf8');
  const before = src;

  // (a) schema datePublished + dateModified
  src = src.replace(/"datePublished":\s*"\d{4}-\d{2}-\d{2}"/g, `"datePublished": "${newDate}"`);
  src = src.replace(/"dateModified":\s*"\d{4}-\d{2}-\d{2}"/g, `"dateModified": "${newDate}"`);

  // (b) Spanish visible byline — find "<p class="meta">DD de MONTH de YYYY · ... </p>"
  src = src.replace(
    /(<p class="meta">)[^·<]+(· [^·<]+ · [^<]+<\/p>)/g,
    (mm, pre, post) => {
      // heuristic: if the post contains "min read" we're in EN block; otherwise ES
      // But replace uses global, so just detect from the '· X min lectura/read' token
      if (/min read/.test(post)) {
        return `${pre}${fmtEn(newDate)} ${post}`;
      }
      return `${pre}${fmtEs(newDate)} ${post}`;
    }
  );

  if (src !== before) {
    fs.writeFileSync(fpath, src, 'utf8');
    console.log(`✓ UPDATED: blog/${fname} → ${newDate}`);
    mods++;
  }
}

console.log(`\nDone. ${mods} file(s) modified.`);
