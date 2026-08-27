(function () {
  "use strict";

  // 1) Update Footer Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // 2) Reveal on Scroll (Smooth Fade Up)
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { 
          e.target.classList.add("is-visible"); 
          io.unobserve(e.target); 
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }
})();
