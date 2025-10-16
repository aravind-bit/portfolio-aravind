// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Robust flip: use a class on the inner poster, sync aria-expanded
function toggleFlip(tile) {
  const inner = tile.querySelector('.tile__inner');
  const expanded = tile.getAttribute('aria-expanded') === 'true';
  tile.setAttribute('aria-expanded', String(!expanded));
  inner.classList.toggle('flipped', !expanded);
}

// Click / keyboard
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', (e) => {
    // Don’t flip when a link inside the back is clicked
    if (e.target.closest('.tile__link')) return;
    toggleFlip(tile);
  });
  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(tile);
    }
  });
});

// Micro-parallax on light layers (tiny, performant)
(function(){
  const vol = document.querySelector('.volumetric--airy');
  const vig = document.querySelector('.vignette');
  let ticking = false;
  function onScroll(){
    if(ticking) return;
    requestAnimationFrame(()=>{
      const s = window.scrollY || 0;
      if(vol) vol.style.transform = `translate3d(0, ${s * 0.06}px, 0)`;
      if(vig) vig.style.transform = `translate3d(0, ${s * 0.03}px, 0)`;
      ticking = false;
    });
    ticking = true;
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
