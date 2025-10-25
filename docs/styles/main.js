// main.js
// 1. set year
// 2. enable tile flip (click / keyboard)

(function(){
  var y=document.getElementById('year');
  if(y){ y.textContent=new Date().getFullYear(); }

  var tiles=document.querySelectorAll('.tile');
  tiles.forEach(function(tile){
    var inner=tile.querySelector('.tile__inner');
    if(!inner) return;

    function toggle(e){
      // don't flip if user clicked a link / button inside
      if(e && e.target && e.target.closest && e.target.closest('a,button')) return;
      inner.classList.toggle('flipped');
      tile.setAttribute('aria-expanded', inner.classList.contains('flipped'));
    }

    tile.addEventListener('click',toggle);

    tile.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        toggle(e);
      }
    });
  });
})();
