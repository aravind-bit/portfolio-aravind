{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // footer year\
document.getElementById('year').textContent = new Date().getFullYear();\
\
// flip cards\
document.querySelectorAll('.card').forEach(btn=>\{\
  btn.addEventListener('click', (e)=>\{\
    if(e.target.matches('.card__more')) return; // allow modal link\
    const isOpen = btn.getAttribute('aria-expanded') === 'true';\
    btn.setAttribute('aria-expanded', String(!isOpen));\
  \});\
\});\
\
// modal basics\
const modal = document.getElementById('modal');\
const modalClose = document.getElementById('modalClose');\
let lastFocused = null;\
\
function openModal(\{ title, tags='', summary='', live='#', repo='#' \})\{\
  lastFocused = document.activeElement;\
  document.getElementById('mTitle').textContent = title;\
  document.getElementById('mTags').textContent = tags;\
  document.getElementById('mSummary').textContent = summary;\
  document.getElementById('mLive').href = live;\
  document.getElementById('mRepo').href = repo;\
  modal.classList.add('open');\
  modal.setAttribute('aria-hidden','false');\
  modalClose.focus();\
\}\
function closeModal()\{\
  modal.classList.remove('open');\
  modal.setAttribute('aria-hidden','true');\
  if(lastFocused) lastFocused.focus();\
\}\
document.querySelectorAll('.card__more').forEach(link=>\{\
  link.addEventListener('click', (e)=>\{\
    e.preventDefault();\
    const id = link.dataset.modal;\
    // temporary demo data\
    const data = \{\
      midcap: \{ title:'Mid-Cap Tech KPI Tracker', summary:'Revenue growth, margins, EPS & R&D intensity across 20 mid-caps.', tags:'Python \'95 Tableau \'95 yfinance \'95 AWS', live:'#', repo:'#' \},\
      cpi:    \{ title:'Virginia CPI Explorer', summary:'Category-level YoY with rolling averages; shelter dominance.', tags:'Tableau \'95 BLS API \'95 Time Series', live:'#', repo:'#' \},\
      earnings:\{ title:'Earnings Call Summarizer', summary:'LLM-assisted KPI & guidance extraction with evidence links.', tags:'Python \'95 OpenAI \'95 RAG', live:'#', repo:'#' \}\
    \}[id] || \{\};\
    openModal(data);\
  \});\
\});\
modalClose.addEventListener('click', closeModal);\
modal.addEventListener('click', (e)=>\{ if(e.target.classList.contains('modal__backdrop')) closeModal(); \});\
document.addEventListener('keydown', (e)=>\{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); \});\
}