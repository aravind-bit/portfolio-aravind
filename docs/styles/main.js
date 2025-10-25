// main.js
// 1. set year in footer
// 2. enable tile flip on click / keyboard

(function(){
  var y=document.getElementById('year');
  if(y){
    y.textContent=new Date().getFullYear();
  }

  var tiles=document.querySelectorAll('.tile');
  tiles.forEach(function(tile){
    var inner=tile.querySelector('.tile__inner');
    if(!inner) return;

    function toggle(e){
      // don't flip when clicking inside buttons/links
      if(e && e.target && e.target.closest && e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    }

    tile.addEventListener('click',toggle);

    // keyboard access
    tile.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        toggle(e);
      }
    });
  });
})();
