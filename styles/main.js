// Year in footer
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Flip cards on click/tap; ignore clicks on links/buttons
(function(){
  var tiles = document.querySelectorAll('.tile');
  tiles.forEach(function(tile){
    var inner = tile.querySelector('.tile__inner');

    function toggle(e){
      if (e && e.target && e.target.closest && e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    }

    tile.addEventListener('click', toggle);
    tile.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
    });
  });

  // Close any flipped card when clicking outside
  document.addEventListener('click', function(e){
    var clickedTile = e.target.closest ? e.target.closest('.tile') : null;
    document.querySelectorAll('.tile .tile__inner.flipped').forEach(function(inner){
      if (!clickedTile || !clickedTile.contains(inner)){
        inner.classList.remove('flipped');
        if (inner.closest) {
          var t = inner.closest('.tile');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }, true);
})();
