// ─── ROUTES ───────────────────────────────
// Every page has a real, shareable URL. `key` matches the id of its <div class="page">
// (id="page-<key>"), `nav` is the top-level nav item that should highlight for it.
const ROUTES = {
  'home': {
    path: '/',
    nav: 'home',
    title: 'Xylora — Helping Local Businesses Grow with AI, Websites & Automation',
    desc: 'Xylora Digital helps Australian local businesses attract more customers and save time with AI lead capture, websites, SEO, automation and custom software. Book a free Discovery Call.'
  },
  'services': {
    path: '/services',
    nav: 'services',
    title: 'Services — AI, Websites, SEO & Automation | Xylora Digital',
    desc: 'From AI-powered lead capture to high-performing websites, SEO, automation and custom software — explore how Xylora Digital helps your business grow.'
  },
  'service-never-miss-a-lead': {
    path: '/services/never-miss-a-lead',
    nav: 'services',
    title: 'Never Miss a Lead (Coming Soon) — AI Missed Call Recovery | Xylora Digital',
    desc: 'Coming soon: AI-powered missed call recovery that texts customers back automatically, answers common questions, captures and qualifies leads, and notifies you when action is required.'
  },
  'service-seo': {
    path: '/services/seo',
    nav: 'services',
    title: 'SEO (Coming Soon) — Local, Technical & AI Search Optimisation | Xylora Digital',
    desc: 'Coming soon: SEO tailored to your business to improve your visibility on Google, attract more local customers and build long-term organic growth. Register your interest.'
  },
  'service-websites': {
    path: '/services/websites',
    nav: 'services',
    title: 'Customer-Winning Websites — Fast, Modern, Conversion-Focused | Xylora Digital',
    desc: 'Beautiful, fast, conversion-focused websites — whether that means a new build or improving your existing site — designed to turn visitors into customers. Mobile responsive, modern and SEO-ready.'
  },
  'service-automation': {
    path: '/services/automation',
    nav: 'services',
    title: 'Time Back Automation (Coming Soon) — Follow-Ups, Bookings & Workflows | Xylora Digital',
    desc: 'Coming soon: automation that handles repetitive tasks so you spend less time on admin and more time running your business. Register your interest.'
  },
  'service-custom-software': {
    path: '/services/custom-software',
    nav: 'services',
    title: 'Custom Software & Apps — Portals, Systems & Mobile | Xylora Digital',
    desc: 'We design and build custom software, client portals, internal systems and mobile applications tailored to how your business actually works.'
  },
  'portfolio': {
    path: '/portfolio',
    nav: 'portfolio',
    title: 'Portfolio — Work That Drives Results | Xylora Digital',
    desc: 'Client websites and custom software from Xylora Digital — concept redesigns and real systems we build for small businesses.'
  },
  'portfolio-websites': {
    path: '/portfolio/websites',
    nav: 'portfolio',
    title: 'Client Websites — Portfolio | Xylora Digital',
    desc: 'Website redesigns and builds for local businesses — modern, mobile-first, and built to turn visitors into enquiries.'
  },
  'portfolio-software': {
    path: '/portfolio/software',
    nav: 'portfolio',
    title: 'Custom Software & Apps — Portfolio | Xylora Digital',
    desc: 'Custom software and client portals from Xylora Digital, including the multi-service client portal we build and use ourselves.'
  },
  'about': {
    path: '/about',
    nav: 'about',
    title: 'About — Founder-Led Digital Growth | Xylora Digital',
    desc: 'Xylora Digital is founder-led. You work directly with the person building your website, AI and automation — no account managers, no hand-offs.'
  },
  'contact': {
    path: '/contact',
    nav: 'contact',
    title: 'Contact — Let’s Talk About Your Business | Xylora Digital',
    desc: 'Get in touch with Xylora Digital, or book a free Discovery Call to discuss your goals and where technology can help.'
  },
  'audit': {
    path: '/website-review',
    nav: null,
    title: 'Free Website Review — See Where Customers Slip Through | Xylora Digital',
    desc: 'A thorough, no-obligation review of your website and online presence, showing exactly where enquiries are being lost.'
  },
  'newsletter': {
    path: '/newsletter',
    nav: 'newsletter',
    title: 'The Xylora Digest — AI Newsletter for Business Leaders | Xylora Digital',
    desc: 'The Xylora Digest is a free AI newsletter for Australian business leaders — weekly executive AI insights and a fortnightly curated tech wrap-up. Subscribe free.'
  },
  'newsletter-archive': {
    path: '/newsletter/archive',
    nav: 'newsletter',
    title: 'Archive — The Xylora Digest | Xylora Digital',
    desc: 'Every past issue of The Xylora Digest — Xylora Digital\'s free AI newsletter for Australian business leaders.'
  }
};

// Pages that start with a dark hero (nav logo needs to be white)
const darkHeroPages = ['about', 'audit', 'newsletter', 'newsletter-archive'];

// path → key lookup, built once from ROUTES so the two can never drift apart
const PATH_TO_KEY = Object.keys(ROUTES).reduce((map, key) => {
  map[ROUTES[key].path] = key;
  return map;
}, {});

const SITE_ORIGIN = window.location.origin;

function setNavTheme(page) {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('dark-hero', darkHeroPages.includes(page));
}

// Normalise a pathname to the canonical form used as a ROUTES key
function keyFromPath(pathname) {
  let p = (pathname || '/').replace(/\/index\.html$/i, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');   // strip trailing slash, keep bare "/"
  if (p === '') p = '/';
  return PATH_TO_KEY[p.toLowerCase()] || null;
}

function setMeta(route) {
  document.title = route.title;

  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', route.desc);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', SITE_ORIGIN + route.path);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', route.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', route.desc);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', SITE_ORIGIN + route.path);
}

// ─── NAVIGATION ───────────────────────────────
// `push` is false when we're responding to the browser's own history (back/forward)
// or restoring the page on first load — otherwise we'd push a duplicate entry.
function navigate(page, push = true) {
  const route = ROUTES[page];
  if (!route) return;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === route.nav);
  });

  if (push && window.location.pathname !== route.path) {
    history.pushState({ page }, '', route.path);
  }

  setMeta(route);
  closeMobile();
  closeServicesMenu();
  window.scrollTo({ top: 0, behavior: 'instant' });
  setNavTheme(page);
  setTimeout(initReveals, 100);

  if (page === 'newsletter') loadNewsletterFeatured();
  if (page === 'newsletter-archive') loadNewsletterArchive();
}

window.addEventListener('popstate', (e) => {
  const page = (e.state && e.state.page) || keyFromPath(window.location.pathname) || 'home';
  navigate(page, false);
});

// Let internal links behave like real links (open in a new tab, copy link address,
// show their destination in the status bar) while still routing client-side.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-route]');
  if (!link) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  navigate(link.dataset.route);
});

// ─── MOBILE NAV ─────────────────────────────────
function toggleMobile() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
}

// Services submenu inside the mobile drawer
function toggleMobileServices(btn) {
  btn.closest('.mobile-nav-group').classList.toggle('open');
}

// ─── SERVICES DROPDOWN (desktop) ─────────────────
function syncServicesMenuAria(item) {
  const caret = item.querySelector('.nav-caret');
  if (caret) caret.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
}

function closeServicesMenu() {
  const item = document.getElementById('navServices');
  if (!item) return;
  item.classList.remove('open');
  syncServicesMenuAria(item);
}

function toggleServicesMenu(e) {
  e.stopPropagation();
  e.preventDefault();
  const item = document.getElementById('navServices');
  item.classList.toggle('open');
  syncServicesMenuAria(item);
}

document.addEventListener('click', (e) => {
  const item = document.getElementById('navServices');
  if (item && !item.contains(e.target)) closeServicesMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeServicesMenu(); closeMobile(); }
});

// ─── SCROLL NAV ─────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});

// ─── SCROLL REVEALS ─────────────────────────────────
function initReveals() {
  const reveals = document.querySelectorAll('.page.active .reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => {
    el.classList.remove('visible');
    io.observe(el);
  });
}

// ─── FAQ ─────────────────────────────────
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  // Only collapse siblings within the same list, so separate FAQ blocks don't fight
  const list = item.closest('.faq-list') || document;
  list.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── NEWSLETTER (live beehiiv RSS via /api/newsletter) ─────────────────────
const DIGEST_FALLBACK_URL = 'https://digest.xyloradigital.com';
const newsletterCache = { featured: null, archive: null };
const newsletterLoading = { featured: false, archive: false };

function formatIssueDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Feed descriptions can carry markup — strip tags with a regex rather than
// round-tripping through innerHTML, so nothing in the feed ever gets parsed as DOM.
function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function buildIssueLink(issue) {
  const a = document.createElement('a');
  a.href = typeof issue.link === 'string' && /^https?:\/\//i.test(issue.link) ? issue.link : DIGEST_FALLBACK_URL;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  return a;
}

function buildIssueThumb(issue, width, height, className) {
  const wrap = document.createElement('div');
  wrap.className = className;
  if (issue.thumbnailUrl) {
    const img = document.createElement('img');
    img.src = issue.thumbnailUrl;
    img.alt = issue.title || 'The Xylora Digest';
    img.loading = 'lazy';
    img.width = width;
    img.height = height;
    wrap.appendChild(img);
  } else {
    wrap.classList.add('newsletter-thumb-placeholder');
    wrap.textContent = 'The Xylora Digest';
  }
  return wrap;
}

function renderNewsletterFallback(container, message) {
  clearChildren(container);
  const box = document.createElement('div');
  box.className = 'newsletter-fallback';
  const msg = document.createElement('p');
  msg.textContent = message;
  const link = document.createElement('a');
  link.href = DIGEST_FALLBACK_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'btn btn-ghost';
  link.textContent = 'Read the Digest on beehiiv →';
  box.append(msg, link);
  container.appendChild(box);
}

function renderNewsletterFeatured(issues) {
  const container = document.getElementById('newsletterIssues');
  if (!container) return;
  clearChildren(container);

  if (!issues.length) {
    renderNewsletterFallback(container, 'No issues are live yet.');
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'newsletter-issues-grid';

  const [featured, ...rest] = issues;
  const side = rest.slice(0, 6);

  const featuredLink = buildIssueLink(featured);
  featuredLink.className = 'newsletter-featured-card';
  featuredLink.appendChild(buildIssueThumb(featured, 640, 360, 'newsletter-featured-img'));
  const fBody = document.createElement('div');
  fBody.className = 'newsletter-featured-body';
  const fDate = document.createElement('span');
  fDate.className = 'newsletter-card-date';
  fDate.textContent = formatIssueDate(featured.publishedDate);
  const fTitle = document.createElement('h3');
  fTitle.className = 'newsletter-featured-title';
  fTitle.textContent = featured.title;
  const fSub = document.createElement('p');
  fSub.className = 'newsletter-card-subtitle';
  fSub.textContent = stripHtml(featured.subtitle);
  const fCta = document.createElement('span');
  fCta.className = 'newsletter-card-cta';
  fCta.textContent = 'Read issue →';
  fBody.append(fDate, fTitle, fSub, fCta);
  featuredLink.appendChild(fBody);

  const sideList = document.createElement('div');
  sideList.className = 'newsletter-side-list';
  side.forEach((issue) => {
    const link = buildIssueLink(issue);
    link.className = 'newsletter-side-card';
    link.appendChild(buildIssueThumb(issue, 160, 90, 'newsletter-side-img'));
    const body = document.createElement('div');
    body.className = 'newsletter-side-body';
    const date = document.createElement('span');
    date.className = 'newsletter-card-date';
    date.textContent = formatIssueDate(issue.publishedDate);
    const title = document.createElement('h4');
    title.className = 'newsletter-side-title';
    title.textContent = issue.title;
    body.append(date, title);
    link.appendChild(body);
    sideList.appendChild(link);
  });

  grid.append(featuredLink, sideList);
  container.appendChild(grid);
}

function renderArchiveList(issues) {
  const container = document.getElementById('archiveIssues');
  if (!container) return;
  clearChildren(container);

  if (!issues.length) {
    renderNewsletterFallback(container, 'No issues are live yet.');
    return;
  }

  const list = document.createElement('div');
  list.className = 'archive-list';
  issues.forEach((issue) => {
    const link = buildIssueLink(issue);
    link.className = 'archive-item';
    link.appendChild(buildIssueThumb(issue, 120, 68, 'archive-item-img'));
    const body = document.createElement('div');
    body.className = 'archive-item-body';
    const title = document.createElement('h3');
    title.className = 'archive-item-title';
    title.textContent = issue.title;
    const meta = document.createElement('div');
    meta.className = 'archive-item-meta';
    const dateSpan = document.createElement('span');
    dateSpan.textContent = formatIssueDate(issue.publishedDate);
    meta.appendChild(dateSpan);
    if (issue.author) {
      const authorSpan = document.createElement('span');
      authorSpan.textContent = issue.author;
      meta.appendChild(authorSpan);
    }
    body.append(title, meta);
    link.appendChild(body);
    list.appendChild(link);
  });
  container.appendChild(list);
}

async function fetchNewsletterIssues(limit) {
  const url = '/api/newsletter' + (limit ? ('?limit=' + limit) : '');
  const res = await fetch(url);
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || data.error) throw new Error((data && data.error) || 'Request failed');
  return Array.isArray(data.issues) ? data.issues : [];
}

async function loadNewsletterFeatured() {
  if (newsletterCache.featured) { renderNewsletterFeatured(newsletterCache.featured); return; }
  if (newsletterLoading.featured) return;
  newsletterLoading.featured = true;
  try {
    const issues = await fetchNewsletterIssues(7);
    newsletterCache.featured = issues;
    renderNewsletterFeatured(issues);
  } catch (err) {
    const container = document.getElementById('newsletterIssues');
    if (container) renderNewsletterFallback(container, "We couldn't load the latest issues right now.");
  } finally {
    newsletterLoading.featured = false;
  }
}

async function loadNewsletterArchive() {
  if (newsletterCache.archive) { renderArchiveList(newsletterCache.archive); return; }
  if (newsletterLoading.archive) return;
  newsletterLoading.archive = true;
  try {
    const issues = await fetchNewsletterIssues(null);
    newsletterCache.archive = issues;
    renderArchiveList(issues);
  } catch (err) {
    const container = document.getElementById('archiveIssues');
    if (container) renderNewsletterFallback(container, "We couldn't load the archive right now.");
  } finally {
    newsletterLoading.archive = false;
  }
}

// ─── FORM SUBMIT ─────────────────────────────────
function handleFormSubmit(btn) {
  btn.textContent = '✓ Sent!';
  btn.disabled = true;
  btn.style.background = 'var(--c-accent)';
  showNotification();
}

function showNotification(msg) {
  const n = document.getElementById('notification');
  n.classList.add('show');
  setTimeout(() => n.classList.remove('show'), 4000);
}

// ─── INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // GitHub Pages can't rewrite deep paths, so 404.html bounces them here as
  // "/?/services/seo". Put the real path back before we resolve the route.
  if (window.location.search.charAt(1) === '/') {
    const restored = window.location.search.slice(1).replace(/~and~/g, '&');
    history.replaceState(null, '', restored + window.location.hash);
  }

  const page = keyFromPath(window.location.pathname) || 'home';
  navigate(page, false);

  // Unknown deep link — land on home with a clean URL rather than a blank page
  if (!keyFromPath(window.location.pathname)) {
    history.replaceState({ page: 'home' }, '', '/');
  } else {
    history.replaceState({ page }, '', ROUTES[page].path);
  }

  setTimeout(() => {
    document.querySelectorAll('.page.active .reveal').forEach(el => {
      if (!el.classList.contains('visible')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('visible');
      }
    });
  }, 200);
});
