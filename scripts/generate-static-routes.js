#!/usr/bin/env node
'use strict';

/*
 * Generates a real static HTML file per route (e.g. about/index.html,
 * services/seo/index.html) with that route's correct <title>, meta
 * description, canonical, and OG tags baked into the raw <head>.
 *
 * Why: this is a single-page app served from one static index.html for
 * every URL. A crawler's first-pass fetch of the raw HTML only ever sees
 * the homepage's head tags, since the correct per-route values are only
 * applied client-side (setMeta() in script.js) after the JS runs. Google
 * was collapsing routes into the homepage as duplicate canonicals as a
 * result. The body is copied through unchanged — client-side navigation
 * (script.js's navigate()) still works exactly as before once JS loads.
 *
 * ROUTES itself is never duplicated here: it's extracted from script.js's
 * own source text (not required as a module, since script.js has
 * top-level window/document references that would throw in Node), so
 * there is exactly one place this data can ever be edited.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCRIPT_JS_PATH = path.join(ROOT, 'script.js');
const INDEX_HTML_PATH = path.join(ROOT, 'index.html');
const VERCEL_JSON_PATH = path.join(ROOT, 'vercel.json');
const SITE_ORIGIN = 'https://xyloradigital.com';

/*
 * Vercel only auto-resolves a directory's index.html for a trailing-slash
 * request (e.g. /services/seo/). The no-slash form actually used
 * everywhere on this site (ROUTES paths, sitemap.xml, every internal
 * link) falls straight through to the SPA catch-all rewrite instead of
 * the generated static file — confirmed by hand on a preview deployment.
 * So vercel.json needs an explicit rewrite per route (both forms) ahead
 * of the catch-all. This check fails the build loudly if a route in
 * ROUTES doesn't have a matching pair of rewrites, so a future route
 * added to ROUTES without updating vercel.json can't silently ship
 * without this fix applying to it.
 */
function assertRewritesCoverRoutes(routes, nonHomeKeys) {
  const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf8'));
  const sources = new Set((vercelConfig.rewrites || []).map((r) => r.source));

  const missing = [];
  for (const key of nonHomeKeys) {
    const routePath = routes[key].path;
    const withSlash = routePath.endsWith('/') ? routePath : routePath + '/';
    if (!sources.has(routePath)) missing.push(routePath);
    if (!sources.has(withSlash)) missing.push(withSlash);
  }

  if (missing.length > 0) {
    throw new Error(
      'generate-static-routes: vercel.json is missing explicit rewrites for: ' +
      missing.join(', ') +
      '. Add a rewrite for each (both with and without a trailing slash) ' +
      'pointing at its generated <path>/index.html, ahead of the catch-all rewrite.'
    );
  }
}

function extractRoutes(scriptSource) {
  const marker = "const ROUTES = {";
  const markerIndex = scriptSource.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error('generate-static-routes: could not find "const ROUTES = {" in script.js');
  }

  const braceStart = markerIndex + marker.length - 1; // index of the opening '{'

  let depth = 0;
  let inString = false;
  let quoteChar = '';
  let end = -1;

  for (let i = braceStart; i < scriptSource.length; i++) {
    const ch = scriptSource[i];
    const prev = scriptSource[i - 1];

    if (inString) {
      if (ch === quoteChar && prev !== '\\') inString = false;
      continue;
    }

    if (ch === "'" || ch === '"') {
      inString = true;
      quoteChar = ch;
      continue;
    }

    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new Error('generate-static-routes: could not find matching closing brace for ROUTES');
  }

  const literal = scriptSource.slice(braceStart, end + 1);
  // Safe: this is our own authored source, extracted from our own repo file.
  return new Function('return (' + literal + ');')();
}

function escapeHtmlText(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function replaceOrThrow(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`generate-static-routes: expected tag not found while patching ${label}`);
  }
  return html.replace(regex, replacement);
}

function buildRouteHtml(baseHtml, route) {
  const canonicalUrl = SITE_ORIGIN + route.path;
  const title = escapeHtmlText(route.title);
  const titleAttr = escapeAttr(route.title);
  const descAttr = escapeAttr(route.desc);
  const canonicalAttr = escapeAttr(canonicalUrl);

  let out = baseHtml;

  out = replaceOrThrow(out, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  out = replaceOrThrow(out, /(<meta name="description" content=")[^"]*(">)/, `$1${descAttr}$2`, 'meta[name=description]');
  out = replaceOrThrow(out, /(<link rel="canonical" href=")[^"]*(">)/, `$1${canonicalAttr}$2`, 'link[rel=canonical]');
  out = replaceOrThrow(out, /(<meta property="og:title" content=")[^"]*(">)/, `$1${titleAttr}$2`, 'meta[property=og:title]');
  out = replaceOrThrow(out, /(<meta property="og:description" content=")[^"]*(">)/, `$1${descAttr}$2`, 'meta[property=og:description]');
  out = replaceOrThrow(out, /(<meta property="og:url" content=")[^"]*(">)/, `$1${canonicalAttr}$2`, 'meta[property=og:url]');

  return out;
}

function main() {
  const scriptSource = fs.readFileSync(SCRIPT_JS_PATH, 'utf8');
  const ROUTES = extractRoutes(scriptSource);
  const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

  const allKeys = Object.keys(ROUTES);
  const keysToGenerate = allKeys.filter((key) => key !== 'home');

  const expectedCount = allKeys.length - 1;
  if (keysToGenerate.length !== expectedCount) {
    throw new Error(
      `generate-static-routes: expected ${expectedCount} non-home routes, got ${keysToGenerate.length}`
    );
  }

  assertRewritesCoverRoutes(ROUTES, keysToGenerate);

  let written = 0;
  for (const key of keysToGenerate) {
    const route = ROUTES[key];
    if (!route || !route.path || !route.title || !route.desc) {
      throw new Error(`generate-static-routes: route "${key}" is missing path/title/desc`);
    }

    const outHtml = buildRouteHtml(baseHtml, route);

    const relDir = route.path.replace(/^\/+/, '');
    const outDir = path.join(ROOT, relDir);
    const outFile = path.join(outDir, 'index.html');

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outFile, outHtml, 'utf8');
    written++;
    console.log(`  ${route.path.padEnd(32)} -> ${path.relative(ROOT, outFile)}`);
  }

  console.log(`\ngenerate-static-routes: wrote ${written} static route files (of ${allKeys.length} total routes, 'home' excluded).`);

  if (written !== expectedCount) {
    throw new Error(`generate-static-routes: wrote ${written} files but expected ${expectedCount}`);
  }
}

main();
