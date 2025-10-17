// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Flip on click/tap. Ignore clicks on links inside the back face.
function setFlipHandlers() {
  document.querySelectorAll('.tile').forEach(tile => {
    const inner = tile.querySelector('.tile__inner');

    const toggle = (e) => {
      // Don't toggle if a link/button inside the card was clicked
      if (e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    };

    // click/tap
    tile.addEventListener('click', toggle);

    // keyboard accessibility
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      }
    });
  });
}
setFlipHandlers();

// Optional: close a flipped card when clicking outside
document.addEventListener('click', (e) => {
  const clickedTile = e.target.closest('.tile');
  document.querySelectorAll('.tile .tile__inner.flipped').forEach(inner => {
    if (!clickedTile || !clickedTile.contains(inner)) {
      inner.classList.remove('flipped');
      inner.closest('.tile').setAttribute('aria-expanded', 'false');
    }
  });
}, true);
