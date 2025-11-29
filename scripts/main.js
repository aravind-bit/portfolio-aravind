// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("themeToggle");

  // ----- Theme handling -----

  const storedTheme = window.localStorage.getItem("aa-theme");
  if (storedTheme === "dark") {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    if (toggle) toggle.textContent = "Light";
  } else {
    // default: light
    body.classList.add("theme-light");
    if (toggle) toggle.textContent = "Dark";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = body.classList.contains("theme-dark");
      if (isDark) {
        body.classList.remove("theme-dark");
        body.classList.add("theme-light");
        toggle.textContent = "Dark";
        window.localStorage.setItem("aa-theme", "light");
      } else {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        toggle.textContent = "Light";
        window.localStorage.setItem("aa-theme", "dark");
      }
    });
  }

  // ----- Smooth scroll for internal nav links -----

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ----- CTA click tracking (Google Analytics) -----
  // Uses data-cta attributes in index.html

  const trackClick = (label) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "click", {
        event_category: "cta",
        event_label: label,
      });
    }
  };

  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.getAttribute("data-cta");
      if (label) {
        trackClick(label);
      }
    });
  });
});
