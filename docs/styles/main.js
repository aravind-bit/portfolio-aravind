// Year
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
})();
