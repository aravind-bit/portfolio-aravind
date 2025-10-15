// ===== Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Flip cards (text-only)
document.querySelectorAll('.card').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.matches('.card__more')) return;           // allow modal link
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// ===== Modal
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
let lastFocused = null;

function openModal({ title, tags='', summary='', live='#', repo='#' }){
  lastFocused = document.activeElement;
  document.getElementById('mTitle').textContent = title || '';
  document.getElementById('mTags').textContent = tags || '';
  document.getElementById('mSummary').textContent = summary || '';
  document.getElementById('mLive').href = live || '#';
  document.getElementById('mRepo').href = repo || '#';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  modalClose.focus();
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  if(lastFocused) lastFocused.focus();
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal__backdrop')) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

// Focus trap (a11y)
const focusableSel = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
(function trapFocus(panel){
  const nodes = panel.querySelectorAll(focusableSel);
  if(!nodes.length) return;
  const first = nodes[0], last = nodes[nodes.length - 1];
  panel.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
})(document.querySelector('.modal__panel'));

// ===== Project data (edit links here)
const projectData = {
  midcap: {
    title: 'Mid-Cap Tech KPI Tracker',
    summary: 'Revenue growth, margins, EPS & R&D intensity across 20 mid-caps; surfaces efficiency leaders and volatility pockets.',
    tags: 'Python • Tableau • yfinance • AWS',
    live: 'https://public.tableau.com/views/<YOUR_WORKBOOK_1>',
    repo: 'https://github.com/aravind-bit/tech-equity-dashboard'
  },
  cpi: {
    title: 'Virginia CPI Explorer',
    summary: 'Category-level YoY with rolling averages; shows shelter dominance and energy whipsaws.',
    tags: 'Tableau • BLS API • Time Series',
    live: 'https://public.tableau.com/views/<YOUR_WORKBOOK_2>',
    repo: 'https://github.com/aravind-bit/inflation-analysis-virginia'
  },
  earnings: {
    title: 'Earnings Call Summarizer',
    summary: 'LLM-assisted extraction of KPIs and guidance from earnings transcripts with evidence links.',
    tags: 'Python • OpenAI • RAG',
    live: 'https://example.com',
    repo: 'https://github.com/aravind-bit/earnings-call-summarizer'
  }
};
document.querySelectorAll('.card__more').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = link.dataset.modal;
    openModal(projectData[id] || {});
  });
});

// ===== Active nav link on scroll
const sections = document.querySelectorAll('section[data-section]');
const navLinks = [...document.querySelectorAll('.nav__links a')];
const linkById = Object.fromEntries(navLinks.map(a => [a.getAttribute('href').replace('#',''), a]));

const obs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.classList.toggle('is-active', a === linkById[id]));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });
sections.forEach(s => obs.observe(s));

// ===== Lazy-load background (swap to higher-res when visible)
function upgradeBg(section, urls){
  if(section.dataset.upgraded) return;
  section.style.backgroundImage = urls; // css image-set string
  section.dataset.upgraded = '1';
}
const bgMap = {
  tatooine: `image-set(url('/portfolio-aravind/assets/bg/tatooine-2560.webp') type('image/webp') 2x,
                     url('/portfolio-aravind/assets/bg/tatooine-1536.webp') type('image/webp') 1x)`,
  falcon:   `image-set(url('/portfolio-aravind/assets/bg/falcon-2560.webp') type('image/webp') 2x,
                     url('/portfolio-aravind/assets/bg/falcon-1536.webp') type('image/webp') 1x)`,
  yoda:     `image-set(url('/portfolio-aravind/assets/bg/yoda-2560.webp') type('image/webp') 2x,
                     url('/portfolio-aravind/assets/bg/yoda-1536.webp') type('image/webp') 1x)`
};
const bgObserver = new IntersectionObserver((ents)=>{
  ents.forEach(ent=>{
    if(ent.isIntersecting){
      const id = ent.target.id;
      upgradeBg(ent.target, bgMap[id]);
      bgObserver.unobserve(ent.target);
    }
  });
}, { rootMargin: '200px 0px' });
sections.forEach(s => bgObserver.observe(s));
