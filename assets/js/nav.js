(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.checked = false;
    });
  });
})();
