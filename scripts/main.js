// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Flip: toggle "flipped" on inner; avoid click-through race to back links
function setFlipped(tile, on) {
  const inner = tile.querySelector('.tile__inner');
  tile.setAttribute('aria-expanded', String(on));
  inner.classList.toggle('flipped', on);
}

document.querySelectorAll('.tile').forEach(tile => {
  let suppressNextBackLinkClick = false;
  const backLinks = tile.querySelectorAll('.tile__back .tile__link');

  // Block clicks on back links during the suppression window
  backLinks.forEach(a => {
    a.addEventListener('click', (ev) => {
      if (suppressNextBackLinkClick) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, true);
  });

  tile.addEventListener('click', (e) => {
    if (e.target.closest('.tile__link')) return; // allow direct link clicks when visible
    e.preventDefault();
    e.stopPropagation();
    const expanded = tile.getAttribute('aria-expanded') === 'true';
    setFlipped(tile, !expanded);
    suppressNextBackLinkClick = true;
    setTimeout(() => { suppressNextBackLinkClick = false; }, 250);
  });

  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = tile.getAttribute('aria-expanded') === 'true';
      setFlipped(tile, !expanded);
      suppressNextBackLinkClick = true;
      setTimeout(() => { suppressNextBackLinkClick = false; }, 250);
    }
  });
});

// Gentle parallax
(function(){
  const vol = document.querySelector('.volumetric--airy');
  const vig = document.querySelector('.vignette');
  let ticking = false;
  function onScroll(){
    if (ticking) return;
    requestAnimationFrame(()=>{
      const s = window.scrollY || 0;
      if (vol) vol.style.transform = `translate3d(0, ${s*0.06}px, 0)`;
      if (vig) vig.style.transform = `translate3d(0, ${s*0.03}px, 0)`;
      ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
