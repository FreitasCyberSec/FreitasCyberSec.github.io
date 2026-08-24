/* ============================================================
   Portfolio — minimal vanilla JS. No dependencies.
   1) Footer year   2) Scroll reveal   3) Discreet name glitch
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1) current year in footer */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* 2) reveal sections on scroll */
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 3) glitch on the name — subtle: once on load, then on hover, never looping */
  var name = document.querySelector(".glitch");
  if (name && !reduce) {
    var fire = function () {
      name.classList.add("is-glitching");
      setTimeout(function () { name.classList.remove("is-glitching"); }, 420);
    };
    setTimeout(fire, 700);              // one flicker shortly after load
    name.addEventListener("mouseenter", fire);
    name.addEventListener("focus", fire);
  }
})();
