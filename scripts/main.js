// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Flip cards
document.querySelectorAll('.card').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.matches('.card__more')) return;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Modal
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
let lastFocused = null;

const projectData = {
  midcap: {
    title:'Mid-Cap Tech KPI Tracker',
    summary:'Revenue growth, margins, EPS & R&D intensity across 20 mid-caps; surfaces efficiency leaders and volatility pockets.',
    tags:'Python • Tableau • yfinance • AWS',
    live:'https://public.tableau.com/views/<YOUR_WORKBOOK_1>',
    repo:'https://github.com/aravind-bit/tech-equity-dashboard'
  },
  cpi: {
    title:'Virginia CPI Explorer',
    summary:'Category-level YoY with rolling averages; shows shelter dominance and energy whipsaws.',
    tags:'Tableau • BLS API • Time Series',
    live:'https://public.tableau.com/views/<YOUR_WORKBOOK_2>',
    repo:'https://github.com/aravind-bit/inflation-analysis-virginia'
  },
  earnings: {
    title:'Earnings Call Summarizer',
    summary:'LLM-assisted extraction of KPIs and guidance from earnings transcripts with evidence links.',
    tags:'Python • OpenAI • RAG',
    live:'https://example.com',
    repo:'https://github.com/aravind-bit/earnings-call-summarizer'
  }
};

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

document.querySelectorAll('.card__more').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = link.dataset.modal;
    openModal(projectData[id] || {});
  });
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal__backdrop')) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
