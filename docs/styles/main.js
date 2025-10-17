// docs/styles/main.js

document.addEventListener('DOMContentLoaded', function () {
  // sanity ping (optional)
  try { console.log('[portfolio] main.js loaded'); } catch(e){}

  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function (tile) {
    var inner = tile.querySelector('.tile__inner');
    if (!inner) return;

    function toggle(e) {
      // Ignore clicks on links/buttons
      if (e && e.target && e.target.closest && e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    }

    // Click/tap
    tile.addEventListener('click', toggle);

    // Keyboard support
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      }
    });
  });
});
