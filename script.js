// ─── ROUTES ───────────────────────────────
// Every page has a real, shareable URL. `key` matches the id of its <div class="page">
// (id="page-<key>"), `nav` is the top-level nav item that should highlight for it.
const ROUTES = {
  'home': {
    path: '/',
    nav: 'home',
    title: 'Digital Marketing Sydney | Xylora Digital',
    desc: 'Looking for digital marketing in Sydney? Xylora Digital offers expert digital marketing consultancy to boost visibility, generate leads and grow your business.'
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
    title: 'Search Engine Marketing Agency in Sydney | Xylora Digital',
    desc: 'Looking for a search engine marketing agency in Sydney? Xylora Digital delivers local SEO, technical SEO and Google Business Profile management that build lasting organic visibility.'
  },
  'service-websites': {
    path: '/services/websites',
    nav: 'services',
    title: 'Web Design Agency Sydney | Website Design Companies | Xylora',
    desc: 'Looking for a web design agency in Sydney? Xylora Digital is one of the website design companies in Sydney building fast, modern sites that build trust and turn visitors into enquiries.'
  },
  'service-ai-website-assistant': {
    path: '/services/ai-website-assistant',
    nav: 'services',
    title: 'AI Website Assistant — 24/7 Website Chatbot | Xylora Digital',
    desc: 'A monthly managed AI chatbot for your website that answers questions, qualifies enquiries and captures leads around the clock, then notifies you when it matters.'
  },
  'service-automation': {
    path: '/services/automation',
    nav: 'services',
    title: 'AI Agency Sydney | We Automate What Slows You Down',
    desc: 'We automate what slows you down. From repetitive tasks to smarter workflows, our AI solutions help you save time, work smarter and grow with ease.'
  },
  'service-custom-software': {
    path: '/services/custom-software',
    nav: 'services',
    title: 'Custom Software & Apps — Portals, Systems & Mobile | Xylora Digital',
    desc: 'We design and build custom software, client portals, internal systems and mobile applications tailored to how your business actually works.'
  },
  'dental-seo': {
    path: '/dental-seo',
    nav: null,
    title: 'SEO for Dentists in Sydney | Xylora Digital',
    desc: 'Xylora Digital helps Sydney dental practices improve online visibility, attract relevant local searches and generate more patient enquiries with tailored dental SEO strategies.'
  },
  'spa-seo': {
    path: '/spa-seo',
    nav: null,
    title: 'SEO for Spas in Sydney | Xylora Digital',
    desc: 'Xylora Digital helps Sydney spas strengthen search visibility, attract relevant local customers and generate more booking opportunities with tailored SEO for spas strategies.'
  },
  'real-estate-seo': {
    path: '/real-estate-seo',
    nav: null,
    title: 'SEO for Real Estate in Sydney | Xylora Digital',
    desc: 'Xylora Digital helps Sydney real estate businesses improve search visibility, attract relevant property searches and generate more qualified enquiries with tailored real estate SEO strategies.'
  },
  'lawyer-seo': {
    path: '/lawyer-seo',
    nav: null,
    title: 'Law Firm SEO Services in Sydney | Xylora Digital',
    desc: 'Xylora Digital provides tailored SEO services for Sydney law firms to improve search visibility, attract relevant visitors and turn more searches into genuine client enquiries.'
  },
  'digital-marketing-blue-mountains': {
    path: '/digital-marketing-blue-mountains',
    nav: null,
    title: 'Digital Marketing Agency in Blue Mountains | Xylora Digital',
    desc: 'Xylora Digital helps Blue Mountains businesses grow with SEO, websites, AI, automation and digital marketing built to increase visibility, capture leads and reduce manual admin work.'
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

const SEO_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can you guarantee I'll rank number one on Google?", "acceptedAnswer": { "@type": "Answer", "text": "No, and you should be cautious of anyone who does. Nobody controls Google's rankings. What we can do is the work that genuinely improves your visibility, and report honestly on how it's tracking." } },
    { "@type": "Question", "name": "How long does SEO take to produce results?", "acceptedAnswer": { "@type": "Answer", "text": "SEO typically requires consistent work over time. Some technical and local improvements may produce changes sooner, while competitive searches can take considerably longer. We assess your market before explaining what timeframe may be realistic." } },
    { "@type": "Question", "name": "What does SEO cost?", "acceptedAnswer": { "@type": "Answer", "text": "We publish three starting packages — SEO Starter from $599/month, Customise Visibility from $899/month, and Visibility from $1,199/month — scaled to how many keywords and locations you're targeting. Your market and competition still shape the final scope, so we'll confirm the exact figure together on your Discovery Call before any work begins." } },
    { "@type": "Question", "name": "Is SEO suitable for a small business with a limited budget?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. SEO can be scaled around your priorities and resources. We identify areas with the greatest potential value first, helping small businesses focus on their investment instead of paying for unnecessary activities." } },
    { "@type": "Question", "name": "Do I need a new website to do SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Usually not. We'll assess what you have first. If the existing site has fundamental problems that would cap results, we'll tell you honestly rather than charging you for SEO on a foundation that can't support it." } },
    { "@type": "Question", "name": "Why is Google Business Profile important for local SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Google Business Profile helps customers discover essential business information through Google Search and Maps. Accurate details, relevant information, and ongoing management can strengthen your local presence and make it easier for nearby customers to contact you." } },
    { "@type": "Question", "name": "Do you use AI as part of SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. AI Search Optimisation is part of our SEO capabilities. We consider how your business information is structured and represented as customers increasingly use AI-powered tools to discover information and recommendations." } },
    { "@type": "Question", "name": "Do you only work with businesses in Sydney?", "acceptedAnswer": { "@type": "Answer", "text": "As a trusted search engine marketing agency in Sydney, we focus strongly on businesses and their local search requirements. The team can also support suitable businesses beyond Sydney where the services and working arrangements are appropriate for their objectives." } },
    { "@type": "Question", "name": "Is there a long-term SEO contract?", "acceptedAnswer": { "@type": "Answer", "text": "We do not use lock-in contracts. However, SEO requires consistency to deliver meaningful long-term progress. We explain this clearly while keeping the relationship flexible as your business requirements change." } },
    { "@type": "Question", "name": "Will you provide regular SEO reports?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Reporting focuses on useful information such as relevant visibility, traffic, completed work, and areas being prioritised next. We avoid overwhelming clients with unnecessary metrics that do not help explain business progress." } }
  ]
};

const DENTAL_SEO_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do you approach SEO for dentists?", "acceptedAnswer": { "@type": "Answer", "text": "We build each SEO strategy around the practice, its treatments, target patients, service areas, and competitors. We combine local, technical, content, and website optimisation instead of applying the same SEO checklist to every dental practice." } },
    { "@type": "Question", "name": "Can you improve an existing dental website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You do not necessarily need a completely new website to improve your search presence. Our search engine optimisation for dentist strategies can address existing content, technical issues, website structure, local signals, and other areas that may limit organic visibility." } },
    { "@type": "Question", "name": "Do you only target general dentist searches?", "acceptedAnswer": { "@type": "Answer", "text": "No. Effective SEO for dentists can cover different treatment categories, patient needs and location-based searches. We research relevant search intent and help structure your website around the services and topics that matter to your particular practice." } },
    { "@type": "Question", "name": "How do you choose keywords for dental SEO?", "acceptedAnswer": { "@type": "Answer", "text": "We consider treatment types, patient search behaviour, location, competition, and search intent when researching keywords, focusing on terms that have genuine relevance to your services rather than simply targeting high-volume phrases." } },
    { "@type": "Question", "name": "Can you help a newly established dental practice?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. A new practice can establish stronger search foundations from the beginning through structured website content, local optimisation, technical SEO, and relevant keyword targeting." } },
    { "@type": "Question", "name": "Can SEO for dentists help with AI-powered search?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We incorporate AI Search Optimisation into our wider SEO for dentists' approach, helping organise your practice information so it can be understood more clearly across emerging search experiences." } },
    { "@type": "Question", "name": "How do you measure the progress of SEO marketing for dentists?", "acceptedAnswer": { "@type": "Answer", "text": "We assess relevant indicators such as organic visibility, website performance, search traffic, and other meaningful SEO signals. The objective is not simply to generate traffic, but to build a stronger online presence aligned with your practice goals." } }
  ]
};

const SPA_SEO_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do you help spas target different customer needs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Customers search for spas based on different motivations, from relaxation and wellness to beauty treatments and special occasions. We can structure content around distinct search intents relevant to your services." } },
    { "@type": "Question", "name": "How do you improve treatment page visibility?", "acceptedAnswer": { "@type": "Answer", "text": "We assess page structure, search intent, content relevance, internal linking and technical elements surrounding individual treatments to create stronger foundations for organic visibility." } },
    { "@type": "Question", "name": "Is SEO useful for spas that rely heavily on repeat customers?", "acceptedAnswer": { "@type": "Answer", "text": "SEO complements your existing customer base by helping new people discover your services. It can also support searches for additional treatments when existing customers return online to research their next experience." } },
    { "@type": "Question", "name": "What role does content play in SEO for spas?", "acceptedAnswer": { "@type": "Answer", "text": "Content helps communicate your treatments, expertise and customer experience to both search engines and visitors. We focus on useful, relevant information rather than creating content simply to increase the number of pages." } },
    { "@type": "Question", "name": "Can SEO help promote premium spa experiences?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. High-value treatments and packages can receive dedicated optimisation based on their specific audience and search intent." } },
    { "@type": "Question", "name": "How do you approach competitors in the spa industry?", "acceptedAnswer": { "@type": "Answer", "text": "Rather than copying competitor strategies, we assess their search presence to identify gaps and opportunities." } },
    { "@type": "Question", "name": "How can you improve my spa's online authority?", "acceptedAnswer": { "@type": "Answer", "text": "Useful service information, strong website structure, and consistent business signals can contribute to a more credible online presence." } }
  ]
};

const REAL_ESTATE_SEO_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do you provide SEO for mortgage brokers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. SEO for mortgage brokers target searches related to home loans, refinancing, borrowing requirements, investment finance, and other lending topics. We develop the strategy around your services, audience and Sydney market." } },
    { "@type": "Question", "name": "Is SEO useful for smaller real estate agencies?", "acceptedAnswer": { "@type": "Answer", "text": "Smaller agencies can benefit from targeting specific suburbs, services and customer needs instead of competing only for broad, highly competitive property terms." } },
    { "@type": "Question", "name": "Can you work with an existing real estate website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We optimise an established website without automatically requiring a complete rebuild. Our team assesses the current structure, content, and technical foundations before recommending practical improvements." } },
    { "@type": "Question", "name": "How can SEO help real estate businesses compete in Sydney?", "acceptedAnswer": { "@type": "Answer", "text": "SEO for real estate can strengthen visibility around relevant suburbs, property services and customer searches. We focus on opportunities that align with your market rather than chasing every broad property keyword." } },
    { "@type": "Question", "name": "How do you identify SEO opportunities?", "acceptedAnswer": { "@type": "Answer", "text": "We review search behaviour, competitors, website performance, existing content, local visibility, and customer intent to prioritise opportunities that have practical relevance to your business." } },
    { "@type": "Question", "name": "How does SEO for real estate address changing property markets?", "acceptedAnswer": { "@type": "Answer", "text": "Search behaviour can shift as market conditions, buyer priorities and property demand change. Ongoing optimisation allows your website content and targeting to respond to emerging searches and business opportunities." } },
    { "@type": "Question", "name": "How do you measure SEO progress?", "acceptedAnswer": { "@type": "Answer", "text": "We assess relevant indicators such as organic visibility, search performance, website engagement, and opportunities generated through targeted optimisation." } }
  ]
};

const LAWYER_SEO_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long does legal SEO take?", "acceptedAnswer": { "@type": "Answer", "text": "SEO is an ongoing process rather than a one-off project. Some technical or local improvements may produce changes sooner, while competitive legal searches can require sustained work." } },
    { "@type": "Question", "name": "Can you optimise a law firm's existing website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You do not necessarily need a complete website rebuild to improve search performance. We assess your existing site's technical foundations, content, navigation, mobile usability, conversion paths, and SEO opportunities first." } },
    { "@type": "Question", "name": "How does SEO help a law firm attract clients in Sydney?", "acceptedAnswer": { "@type": "Answer", "text": "SEO helps your firm appear when prospective clients search for relevant legal services, practice areas, and local providers." } },
    { "@type": "Question", "name": "How important is Google Business Profile for a Sydney law firm?", "acceptedAnswer": { "@type": "Answer", "text": "A well-maintained Google Business Profile can strengthen your local search presence and help prospective clients find essential information about your practice." } },
    { "@type": "Question", "name": "How do you measure SEO progress?", "acceptedAnswer": { "@type": "Answer", "text": "We focus on meaningful indicators such as organic visibility, relevant search traffic, website performance and enquiry opportunities." } },
    { "@type": "Question", "name": "Can you help if my law firm serves multiple Sydney areas?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We can assess the locations your firm genuinely serves and develop appropriate local SEO opportunities around them. Our approach focuses on useful, location-relevant content rather than producing repetitive pages simply to target different suburbs." } },
    { "@type": "Question", "name": "Do you focus on long-term SEO for lawyers in Sydney?", "acceptedAnswer": { "@type": "Answer", "text": "Our approach to SEO for lawyers focuses on building sustainable improvements across your website and online presence. Ongoing optimisation allows the strategy to adapt as your firm's services, competition and search behaviour change." } }
  ]
};

const BLUE_MOUNTAINS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can you help if my business receives enquiries outside normal working hours?", "acceptedAnswer": { "@type": "Answer", "text": "AI-powered lead handling can help maintain responsiveness when your team is unavailable. Depending on the setup, automated systems can respond to enquiries, answer routine questions, collect contact details, and identify opportunities that require follow-up." } },
    { "@type": "Question", "name": "What can automation do for a service-based business?", "acceptedAnswer": { "@type": "Answer", "text": "Automation can simplify recurring activities such as appointment confirmations, customer reminders, follow-up messages, enquiry management, and lead tracking. We assess your existing workflows first, so the recommended automation addresses genuine administrative bottlenecks." } },
    { "@type": "Question", "name": "Can you create a website specifically around my business goals?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We develop websites around your customers, services, search requirements, and conversion objectives. The build prioritises mobile usability, performance, clear navigation, search readiness, and straightforward pathways that encourage visitors to enquire or book." } },
    { "@type": "Question", "name": "How is your approach to digital marketing different from a traditional agency package?", "acceptedAnswer": { "@type": "Answer", "text": "Our approach focuses on practical solutions rather than adding services simply because they are included in a package. We consider your specific challenges before recommending marketing, technology, automation, or website improvements." } },
    { "@type": "Question", "name": "Can you combine Blue Mountains SEO with other digital marketing services?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Combining SEO with website improvements, AI lead capture, automation, and other digital activities can create a more connected customer journey." } },
    { "@type": "Question", "name": "How long does it take to see results from digital marketing?", "acceptedAnswer": { "@type": "Answer", "text": "The timeframe depends on the services involved, your website's current condition, competition, search demand, and starting visibility. Some improvements can produce immediate practical benefits, while organic search growth generally requires consistent optimisation and time." } },
    { "@type": "Question", "name": "What should a local business include on its website?", "acceptedAnswer": { "@type": "Answer", "text": "A strong business website should clearly explain its services, location, value proposition, contact options, and reasons customers should choose the business. Depending on the industry, useful additions may include service areas, FAQs, testimonials, booking functionality, and project information." } }
  ]
};

const FAQ_SCHEMA_BY_PAGE = {
  'service-seo': SEO_FAQ_SCHEMA,
  'dental-seo': DENTAL_SEO_FAQ_SCHEMA,
  'spa-seo': SPA_SEO_FAQ_SCHEMA,
  'real-estate-seo': REAL_ESTATE_SEO_FAQ_SCHEMA,
  'lawyer-seo': LAWYER_SEO_FAQ_SCHEMA,
  'digital-marketing-blue-mountains': BLUE_MOUNTAINS_FAQ_SCHEMA
};

function setFaqSchema(page) {
  const existing = document.getElementById('faq-schema');
  if (existing) existing.remove();

  const schema = FAQ_SCHEMA_BY_PAGE[page];
  if (!schema) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'faq-schema';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
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
  setFaqSchema(page);
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
function submitContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('button[type="submit"]');
  const errorEl = form.querySelector('#contactFormError');
  const originalLabel = btn.textContent;

  errorEl.hidden = true;
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    business: form.business.value.trim(),
    enquiry: form.enquiry.value,
    message: form.message.value.trim(),
    website: form.website.value // honeypot
  };

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Request failed');
      btn.textContent = '✓ Sent!';
      showNotification();
      form.reset();
      setTimeout(() => { btn.disabled = false; btn.textContent = originalLabel; }, 3000);
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = originalLabel;
      errorEl.textContent = 'Something went wrong — please try again, or email us directly at hello@xyloradigital.com.';
      errorEl.hidden = false;
    });

  return false;
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
