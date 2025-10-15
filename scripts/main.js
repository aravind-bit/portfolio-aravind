// Footer year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// Flip tiles (click anywhere EXCEPT links)
document.querySelectorAll('.tile').forEach(tile=>{
  tile.addEventListener('click', (e)=>{
    if(e.target.closest('.tile__link')) return; // don't flip when pressing links
    const open = tile.getAttribute('aria-expanded') === 'true';
    tile.setAttribute('aria-expanded', String(!open));
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
