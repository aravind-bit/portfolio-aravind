// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Toggle helper
function setFlipped(tile, on) {
  const inner = tile.querySelector('.tile__inner');
  tile.setAttribute('aria-expanded', String(on));
  inner.classList.toggle('flipped', on);
}

document.querySelectorAll('.tile').forEach(tile => {
  // Per-tile suppression flag to avoid click-through after flip
  let suppressNextBackLinkClick = false;
  const backLinks = tile.querySelectorAll('.tile__back .tile__link');

  // Any click on a back link is ignored during the suppression window
  backLinks.forEach(a => {
    a.addEventListener('click', ev => {
      if (suppressNextBackLinkClick) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }, true); // capture so we stop it early
  });

  // Main click handler for the card
  tile.addEventListener('click', e => {
    // If you actually clicked a link, let it behave normally
    if (e.target.closest('.tile__link')) return;

    e.preventDefault(); // don't let this click bubble into new state
    e.stopPropagation();

    const expanded = tile.getAttribute('aria-expanded') === 'true';
    setFlipped(tile, !expanded);

    // Suppress link clicks for a short window after the flip
    suppressNextBackLinkClick = true;
    setTimeout(() => { suppressNextBackLinkClick = false; }, 250);
  });

  // Keyboard accessibility
  tile.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const expanded = tile.getAttribute('aria-expanded') === 'true';
      setFlipped(tile, !expanded);

      suppressNextBackLinkClick = true;
      setTimeout(() => { suppressNextBackLinkClick = false; }, 250);
    }
  });
});

// Gentle parallax (unchanged)
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
