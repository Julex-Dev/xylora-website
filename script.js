// ─── NAVIGATION ───────────────────────────────
// Pages that start with a dark hero (nav logo needs to be white)
const darkHeroPages = ['about', 'audit'];

function setNavTheme(page) {
  const nav = document.getElementById('mainNav');
  if (darkHeroPages.includes(page)) {
    nav.classList.add('dark-hero');
  } else {
    nav.classList.remove('dark-hero');
  }
}

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  closeMobile();
  window.scrollTo({ top: 0, behavior: 'instant' });
  setNavTheme(page);
  setTimeout(initReveals, 100);
}

// ─── MOBILE NAV ─────────────────────────────────
function toggleMobile() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMobile() {
  document.getElementById('mobileNav').classList.remove('open');
}

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
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
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
  navigate('home');
  setTimeout(() => {
    document.querySelectorAll('#page-home .reveal').forEach(el => {
      if (!el.classList.contains('visible')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('visible');
      }
    });
  }, 200);
});