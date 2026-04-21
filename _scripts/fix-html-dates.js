#!/usr/bin/env node
/**
 * Fixes only the visible byline date in legacy HTML posts.
 * Targets the specific Spanish "DD de MONTH de YYYY" and English "MONTH DD, YYYY"
 * tokens inside <p class="meta">...</p>.
 */
const fs   = require('fs');
const path = require('path');

const DATES = {
  '01': '2026-01-15','02':'2026-01-22','03':'2026-01-29','04':'2026-02-05',
  '05': '2026-02-12','06':'2026-02-19','07':'2026-02-26','08':'2026-03-05',
  '09': '2026-03-12','10':'2026-03-19',
};

const MES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const MON = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function fmtEs(iso){const[y,m,d]=iso.split('-').map(Number);return `${d} de ${MES[m-1]} de ${y}`;}
function fmtEn(iso){const[y,m,d]=iso.split('-').map(Number);return `${MON[m-1]} ${d}, ${y}`;}

const blogDir = path.join(__dirname, '..', 'blog');
let n = 0;
for (const fname of fs.readdirSync(blogDir)) {
  const m = fname.match(/^(\d{2})-.*\.html$/);
  if (!m) continue;
  const num = m[1];
  const iso = DATES[num];
  if (!iso) continue;
  const fpath = path.join(blogDir, fname);
  let src = fs.readFileSync(fpath, 'utf8');
  const before = src;

  // Spanish date (before "de enero/febrero/...") — replace any occurrence of "\d+ de MONTH de \d{4}"
  const esRe = /\b\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+\d{4}\b/g;
  src = src.replace(esRe, fmtEs(iso));

  // English date — "Month Day, Year"
  const enRe = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s*\d{4}\b/g;
  src = src.replace(enRe, fmtEn(iso));

  if (src !== before) {
    fs.writeFileSync(fpath, src, 'utf8');
    console.log(`✓ ${fname} → ${iso}`);
    n++;
  }
}
console.log(`\nDone. ${n} file(s) modified.`);
