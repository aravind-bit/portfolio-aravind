// Footer year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Flip tiles
document.querySelectorAll('.tile').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.closest('.tile__actions')) return; // allow Details button
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Micro-parallax on light layers
(function(){
  const vol = document.querySelector('.volumetric--airy');
  const vig = document.querySelector('.vignette');
  let ticking = false;
  function onScroll(){
    if(ticking) return;
    window.requestAnimationFrame(()=>{
      const y = window.scrollY || 0;
      if(vol) vol.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      if(vig) vig.style.transform = `translate3d(0, ${y * 0.03}px, 0)`;
      ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

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
    title:'CPI Explorer',
    summary:'Category-level YoY with rolling averages; shows shelter dominance and energy whipsaws.',
    tags:'Tableau • BLS API • Time Series',
    live:'https://public.tableau.com/views/<YOUR_WORKBOOK_2>',
    repo:'https://github.com/aravind-bit/inflation-analysis-virginia'
  },
  earnings: {
    title:'Earnings Call Summarizer',
    summary:'Agentic LLM extracts KPIs and guidance from earnings transcripts with citations.',
    tags:'Python • OpenAI • RAG',
    live:'https://example.com',
    repo:'https://github.com/aravind-bit/earnings-call-summarizer'
  },
  media: {
    title:'Multimodal Media Analyst',
    summary:'Auto-ingests video/audio → diarization + ASR → topic segmentation → an agent finds notable clips.',
    tags:'Whisper/ASR • NLP • Topic modeling • Sentiment • Agent tools',
    live:'https://example.com',
    repo:'https://github.com/aravind-bit/multimodal-media-analyst'
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

// Wire "Details" buttons on flip backs
document.querySelectorAll('[data-modal]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const id = link.dataset.modal;
    openModal(projectData[id] || {});
  });
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target.classList.contains('modal__backdrop')) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
