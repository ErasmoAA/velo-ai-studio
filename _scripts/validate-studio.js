#!/usr/bin/env node

/**
 * Production smoke test for the browser application.
 *
 * This intentionally stays dependency-free so it can run in CI immediately
 * after the Eleventy build. It validates the static browser contract and
 * syntax of every inline JavaScript block without executing browser APIs.
 */

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const studioPath = path.join(root, 'studio.html');
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readStudio() {
  if (!fs.existsSync(studioPath)) {
    fail('studio.html is missing.');
    return null;
  }
  return fs.readFileSync(studioPath, 'utf8');
}

function validateDocument(html) {
  if (!/^<!doctype html>/i.test(html.trim())) {
    fail('studio.html must start with a valid HTML doctype.');
  }
  if (!/<html\b[^>]*lang=["'][^"']+["']/i.test(html)) {
    fail('studio.html must declare an html lang attribute.');
  }
  if (!/<meta\s+name=["']viewport["'][^>]*>/i.test(html)) {
    fail('studio.html is missing the viewport meta tag.');
  }
  if (!/<body[\s>]/i.test(html) || !/<\/body>/i.test(html)) {
    fail('studio.html has an invalid body boundary.');
  }
  if (!/<script[\s>]/i.test(html)) {
    fail('studio.html contains no application script.');
  }

  const ids = new Map();
  for (const match of html.matchAll(/\bid=["']([^"']+)["']/gi)) {
    const id = match[1];
    ids.set(id, (ids.get(id) || 0) + 1);
  }
  for (const [id, count] of ids) {
    if (count > 1) fail(`Duplicate DOM id detected: ${id} (${count} occurrences).`);
  }

  // A getElementById call can legitimately target an element created later
  // by the application, so unresolved references are reported as warnings,
  // not hard failures. This keeps the check useful without blocking valid UI
  // patterns such as dynamically-created progress/output elements.
  const referencedIds = new Set();
  for (const match of html.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g)) {
    referencedIds.add(match[1]);
  }
  for (const match of html.matchAll(/querySelector(?:All)?\(\s*["']#([A-Za-z0-9_-]+)["']\s*\)/g)) {
    referencedIds.add(match[1]);
  }
  for (const id of referencedIds) {
    if (!ids.has(id)) warn(`DOM id is not present statically and may be runtime-created: ${id}.`);
  }
}

function validateSecurity(html) {
  const forbiddenRemotePatterns = [
    /quge5\.com/i,
    /worker[^\n]{0,160}https?:\/\//i,
    /https?:\/\/[^\s"']*(?:eval|obfus|inject|payload)/i,
  ];
  for (const pattern of forbiddenRemotePatterns) {
    if (pattern.test(html)) fail(`Forbidden remote runtime pattern detected: ${pattern}`);
  }

  const secretPatterns = [
    /sk-[A-Za-z0-9_-]{20,}/,
    /AIza[0-9A-Za-z_-]{20,}/,
    /ghp_[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /xox[baprs]-[A-Za-z0-9-]{20,}/,
  ];
  for (const pattern of secretPatterns) {
    if (pattern.test(html)) fail(`Possible credential embedded in studio.html: ${pattern}`);
  }

  if (/\beval\s*\(/.test(html) || /\bnew\s+Function\s*\(/.test(html)) {
    fail('Dynamic code execution (eval/new Function) is not allowed in the studio runtime.');
  }
  if (/document\.write\s*\(/.test(html)) {
    warn('document.write detected; prefer DOM APIs to avoid load-time and injection hazards.');
  }
}

function validateScripts(html) {
  const scripts = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = match[1] || '';
    const code = match[2] || '';
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/application\/ld\+json/i.test(attrs)) continue;
    if (!code.trim()) continue;
    scripts.push(code);
  }

  if (!scripts.length) {
    fail('No executable inline JavaScript block was found.');
    return;
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'velo-studio-check-'));
  try {
    scripts.forEach((code, index) => {
      const file = path.join(tempDir, `script-${index + 1}.js`);
      fs.writeFileSync(file, code, 'utf8');
      const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
      if (result.status !== 0) {
        const detail = (result.stderr || result.stdout || 'unknown syntax error').trim().split('\n').slice(0, 3).join(' ');
        fail(`Inline JavaScript block ${index + 1} has a syntax error: ${detail}`);
      }
    });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

const html = readStudio();
if (html) {
  validateDocument(html);
  validateSecurity(html);
  validateScripts(html);
}

if (failures.length) {
  console.error('Velo studio validation FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Velo studio validation PASSED');
console.log(`- validated ${html ? (html.match(/<script\b/gi) || []).length : 0} script tags`);
console.log('- document structure and duplicate DOM ids checked');
console.log('- literal DOM references audited (runtime-created ids allowed)');
console.log('- inline JavaScript syntax checked with Node');
console.log('- no blocked remote runtime or embedded credential pattern detected');
for (const warning of warnings) console.warn(`WARN: ${warning}`);
