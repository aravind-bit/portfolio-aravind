// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Toggle "flipped" on the inner panel; ignore clicks on links inside the back
function toggleFlip(tile) {
  const inner = tile.querySelector('.tile__inner');
  const expanded = tile.getAttribute('aria-expanded') === 'true';
  tile.setAttribute('aria-expanded', String(!expanded));
  inner.classList.toggle('flipped', !expanded);
}

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', (e) => {
    if (e.target.closest('.tile__link')) return; // don't flip when clicking a link
    toggleFlip(tile);
  });
  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(tile);
    }
  });
});

// Gentle parallax on light layers
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
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
