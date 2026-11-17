// Shared page behaviour: colour-mode toggle and small helpers.
(function () {
  const root = document.documentElement;

  function store(value) {
    try { localStorage.setItem("theme", value); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      store(next);
      window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
    });
  });

  // Profile photo: falls back to initials until assets/img/profile.jpg exists.
  document.querySelectorAll(".avatar img").forEach((img) => {
    const fail = () => { img.remove(); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
