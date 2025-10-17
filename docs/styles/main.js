// docs/styles/main.js

// Run after HTML is parsed
document.addEventListener('DOMContentLoaded', function () {
  // Sanity ping (check DevTools Console to confirm)
  try { console.log('[portfolio] main.js loaded'); } catch(e){}

  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function (tile) {
    var inner = tile.querySelector('.tile__inner');
    if (!inner) return;

    function toggle(e) {
      // Don't flip when clicking links/buttons on the back
      if (e && e.target && e.target.closest && e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    }

    // Click / tap
    tile.addEventListener('click', toggle);

    // Keyboard (accessibility)
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      }
    });
  });
});
