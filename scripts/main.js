// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// flip cards
document.querySelectorAll('.card').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.matches('.card__more')) return; // allow modal link
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// modal basics
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
let lastFocused = null;

function openModal({ title, tags='', summary='', live='#', repo='#' }){
  lastFocused = document.activeElement;
  document.getElementById('mTitle').textContent = title;
  document.getElementById('mTags').textContent = tags;
  document.getElementById('mSummary').textContent = summary;
  document.getElementById('mLive').href = live;
  document.getElementById('mRepo').href = repo;
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
    const data = {
      midcap:  { title:'Mid-Cap Tech KPI Tracker', summary:'Revenue growth, margins, EPS & R&D intensity across 20 mid-caps.', tags:'Python • Tableau • yfinance • AWS', live:'#', repo:'#' },
      cpi:     { title:'Virginia CPI Explorer',     summary:'Category-level YoY with rolling averages; shelter dominance.',     tags:'Tableau • BLS API • Time Series',     live:'#', repo:'#' },
      earnings:{ title:'Earnings Call Summarizer',  summary:'LLM-assisted KPI & guidance extraction with evidence links.',       tags:'Python • OpenAI • RAG',              live:'#', repo:'#' }
    }[id] || {};
    openModal(data);
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal__backdrop')) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
