#!/usr/bin/env node

/**
 * Lightweight production smoke test for the browser application.
 *
 * This does not execute browser APIs. It validates the static contract that
 * must be present for studio.html to load safely and for the build to ship
 * the actual application entry point.
 */

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const studioPath = path.join(root, 'studio.html');

const failures = [];

function fail(message) {
  failures.push(message);
}

if (!fs.existsSync(studioPath)) {
  fail('studio.html is missing.');
} else {
  const html = fs.readFileSync(studioPath, 'utf8');

  if (!/^<!doctype html>/i.test(html.trim())) {
    fail('studio.html must start with a valid HTML doctype.');
  }

  if (!/<meta\s+name=["']viewport["']/i.test(html)) {
    fail('studio.html is missing the viewport meta tag.');
  }

  if (!/<body[\s>]/i.test(html) || !/<\/body>/i.test(html)) {
    fail('studio.html has an invalid body boundary.');
  }

  if (!/<script[\s>]/i.test(html)) {
    fail('studio.html contains no application script.');
  }

  // The old implementation had a remote worker/script path. Keep this guard
  // in CI so a future change cannot silently reintroduce it.
  const forbiddenRemotePatterns = [
    /quge5\.com/i,
    /worker[^\n]{0,120}https?:\/\//i,
  ];

  for (const pattern of forbiddenRemotePatterns) {
    if (pattern.test(html)) {
      fail(`Forbidden remote runtime pattern detected: ${pattern}`);
    }
  }

  // API credentials must never be embedded in the shipped browser document.
  const secretPatterns = [
    /sk-[A-Za-z0-9_-]{20,}/,
    /AIza[0-9A-Za-z_-]{20,}/,
    /ghp_[A-Za-z0-9]{20,}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
  ];

  for (const pattern of secretPatterns) {
    if (pattern.test(html)) {
      fail(`Possible credential embedded in studio.html: ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error('Velo studio validation FAILED');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Velo studio validation PASSED');
console.log('- studio.html exists and has the expected document structure');
console.log('- no blocked remote runtime pattern detected');
console.log('- no common embedded API credential pattern detected');
