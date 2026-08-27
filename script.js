(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1) Footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* 2) Live System Clock (HUD) */
  var clock = document.getElementById('live-clock');
  function updateClock() {
    if (!clock) return;
    var now = new Date();
    var timeStr = now.toTimeString().split(' ')[0];
    clock.textContent = 'SYS_TIME: ' + timeStr;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* 3) Typewriter effect for Hero line */
  var typeTarget = document.getElementById('typewriter');
  if (typeTarget && !reduce) {
    var text = 'Building software. Learning security. Engineering resilient systems.';
    var index = 0;
    typeTarget.textContent = '';
    
    function type() {
      if (index < text.length) {
        typeTarget.textContent += text.charAt(index);
        index++;
        setTimeout(type, 45);
      } else {
        // Efeito de cursor piscando ao terminar
        typeTarget.innerHTML += '<span style="color:var(--green); animation: blink 1s steps(1) infinite;">_</span>';
      }
    }
    setTimeout(type, 800);
  } else if (typeTarget) {
    typeTarget.textContent = 'Building software. Learning security. Engineering resilient systems.';
  }

  /* 4) Reveal sections on scroll */
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

  /* 5) Glitch effect */
  var name = document.querySelector(".glitch");
  if (name && !reduce) {
    var fire = function () {
      name.classList.add("is-glitching");
      setTimeout(function () { name.classList.remove("is-glitching"); }, 420);
    };
    setTimeout(fire, 700);
    name.addEventListener("mouseenter", fire);
    name.addEventListener("focus", fire);
  }
})();
