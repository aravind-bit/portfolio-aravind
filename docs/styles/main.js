// docs/styles/main.js
// Flip cards + auto-height so long blurbs aren't cut off.

document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".tile");

  const measure = (inner) => {
    const front = inner.querySelector(".tile__front");
    const back  = inner.querySelector(".tile__back");
    // Decide which side is showing and size the container to that face
    const active = inner.classList.contains("flipped") ? back : front;
    // Use scrollHeight so long text is fully visible
    inner.style.height = active.scrollHeight + "px";
  };

  // Initialize each tile and wire events
  tiles.forEach((tile) => {
    const inner = tile.querySelector(".tile__inner");
    if (!inner) return;

    // First measurement (front side)
    requestAnimationFrame(() => measure(inner));

    // Click to flip (ignore clicks on links)
    tile.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      inner.classList.toggle("flipped");
      tile.setAttribute("aria-pressed", inner.classList.contains("flipped"));
      measure(inner);
    });

    // Keyboard flip (Enter/Space)
    tile.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tile.click();
      }
    });
  });

  // Recalculate on resize/orientation changes
  const onResize = () => {
    document.querySelectorAll(".tile__inner").forEach(measure);
  };
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
});
