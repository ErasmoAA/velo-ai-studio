#!/usr/bin/env node
/**
 * Transforms the 10 legacy static blog posts:
 *  - Replaces Organization author in Schema.org with Person
 *  - Updates meta byline from "Velo AI Studio" to "Por Ali A." / "By Ali A."
 *  - Injects author-box CSS rules into the <style> block
 *  - Appends author-box + AI disclosure HTML between the .cta link and the <footer>
 *
 * Idempotent: running twice is safe — already-transformed files are skipped per section.
 */
const fs   = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'blog');
const FILES = [
  '01-que-es-velo-ai-studio.html',
  '02-como-crear-videos-con-ia.html',
  '03-guia-formatos-video.html',
  '04-pollinations-ai-gratis.html',
  '05-subtitulos-automaticos.html',
  '06-monetizar-canal-youtube.html',
  '07-estilos-visuales-ia.html',
  '08-text-to-speech-videos-ia.html',
  '09-errores-comunes-videos-ia.html',
  '10-canal-youtube-sin-mostrar-cara.html',
];

// -- CSS to inject (above footer{) --
const AUTHOR_CSS = `
    .author-box{display:flex;align-items:center;gap:18px;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;margin:48px 0 24px;}
    .author-avatar{width:64px;height:64px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Syne',sans-serif;font-weight:800;font-size:1.6rem;box-shadow:0 4px 16px rgba(124,58,237,0.25);}
    .author-meta{flex:1;}
    .author-meta .author-role{font-family:'Space Mono',monospace;font-size:0.62rem;color:var(--accent2);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:3px;}
    .author-meta .author-name{font-size:1rem;font-weight:700;color:var(--text);margin-bottom:6px;}
    .author-meta .author-bio{font-size:0.82rem;color:var(--muted);line-height:1.55;margin-bottom:8px;}
    .author-meta .author-links a{font-family:'Space Mono',monospace;font-size:0.7rem;color:var(--accent2);text-decoration:none;margin-right:14px;}
    .author-meta .author-links a:hover{text-decoration:underline;}
    .ai-disclosure{background:rgba(245,158,11,0.06);border-left:3px solid var(--accent3);border-radius:0 8px 8px 0;padding:12px 16px;margin:0 0 24px;font-family:'Space Mono',monospace;font-size:0.7rem;color:var(--muted);line-height:1.55;}
    .ai-disclosure strong{color:var(--accent3);}
    .ai-disclosure a{color:var(--accent2);}
    @media(max-width:540px){.author-box{flex-direction:column;text-align:center;}}
`;

// -- HTML for Spanish --
const AUTHOR_BOX_ES = `
      <!-- Author box -->
      <div class="author-box">
        <div class="author-avatar" aria-hidden="true">A</div>
        <div class="author-meta">
          <p class="author-role">Autor del artículo</p>
          <p class="author-name">Ali A.</p>
          <p class="author-bio">Desarrollador web con más de 6 años de experiencia en JavaScript, WebCodecs y APIs de IA generativa. Creador y editor principal de Velo AI Studio. Verifico técnicamente cada artículo antes de publicarlo.</p>
          <div class="author-links">
            <a href="../about.html">Biografía →</a>
            <a href="../editorial.html">Metodología editorial</a>
            <a href="mailto:contacto@veloaistudio.online">Contacto</a>
          </div>
        </div>
      </div>

      <!-- AI disclosure -->
      <p class="ai-disclosure">
        <strong>Transparencia:</strong> este artículo fue redactado con asistencia de modelos de lenguaje (GPT-5 / Claude) para su estructura inicial, y posteriormente revisado, verificado técnicamente y editado manualmente por el autor antes de publicarse. Lee el <a href="../editorial.html">protocolo editorial completo</a>.
      </p>
`;

// -- HTML for English --
const AUTHOR_BOX_EN = `
      <!-- Author box -->
      <div class="author-box">
        <div class="author-avatar" aria-hidden="true">A</div>
        <div class="author-meta">
          <p class="author-role">Article author</p>
          <p class="author-name">Ali A.</p>
          <p class="author-bio">Web developer with 6+ years building applications with JavaScript, WebCodecs, and generative AI APIs. Creator and editor-in-chief of Velo AI Studio. I technically verify every article before publishing.</p>
          <div class="author-links">
            <a href="../about.html">Bio →</a>
            <a href="../editorial.html">Editorial methodology</a>
            <a href="mailto:contacto@veloaistudio.online">Contact</a>
          </div>
        </div>
      </div>

      <!-- AI disclosure -->
      <p class="ai-disclosure">
        <strong>Transparency:</strong> this article was drafted with assistance from language models (GPT-5 / Claude) for its initial structure, then reviewed, technically verified, and manually edited by the author before publishing. Read the <a href="../editorial.html">full editorial protocol</a>.
      </p>
`;

// Person author JSON-LD block (replaces "author": { "@type": "Organization", "name": "Velo AI Studio" })
const PERSON_AUTHOR = `"author": { "@type": "Person", "@id": "https://veloaistudio.online/about.html#person", "name": "Ali A.", "url": "https://veloaistudio.online/about.html", "jobTitle": "Desarrollador y editor principal de Velo AI Studio" }`;

let totalChanges = 0;

for (const fname of FILES) {
  const fpath = path.join(BLOG_DIR, fname);
  if (!fs.existsSync(fpath)) { console.warn('SKIP (missing):', fname); continue; }
  let src = fs.readFileSync(fpath, 'utf8');
  const before = src;

  // 1. Inject CSS before the first `footer{` rule (idempotent check)
  if (!src.includes('.author-box{')) {
    src = src.replace(/(\n\s{4}footer\{)/, AUTHOR_CSS + '$1');
  }

  // 2. Replace Organization author with Person author in schema (if present)
  src = src.replace(
    /"author":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"Velo AI Studio"\s*\}/g,
    PERSON_AUTHOR
  );

  // 3. Rewrite meta byline — Spanish
  src = src.replace(/(·\s*)Velo AI Studio(<\/p>)/g, '$1Por <a href="../about.html" style="color:var(--accent2);text-decoration:none;">Ali A.</a>$2');

  // 4. Inject author box + AI disclosure — ONCE per language section.
  //    Heuristic: insert right before each </div>\s*<footer> pair that is preceded
  //    by a .cta anchor. We walk the file looking for the pattern.
  //    Spanish section: lang-es div
  src = src.replace(
    /(<!-- SPANISH -->[\s\S]*?)(\n\s*<footer>)/,
    (m, block, footerOpen) => {
      if (block.includes('class="author-box"')) return m; // already done
      // insert before the footer
      return block + AUTHOR_BOX_ES + footerOpen;
    }
  );
  src = src.replace(
    /(<!-- ENGLISH -->[\s\S]*?)(\n\s*<footer>)/,
    (m, block, footerOpen) => {
      if (block.includes('class="author-box"')) return m;
      return block + AUTHOR_BOX_EN + footerOpen;
    }
  );

  if (src !== before) {
    fs.writeFileSync(fpath, src, 'utf8');
    console.log('✓ UPDATED:', fname);
    totalChanges++;
  } else {
    console.log('· no-op:', fname);
  }
}

console.log(`\nDone. ${totalChanges} file(s) modified.`);
