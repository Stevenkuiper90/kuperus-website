(function () {
  "use strict";

  var grid = document.getElementById("werk-grid");
  var filters = document.querySelectorAll(".werk-filter");
  var lightbox = document.getElementById("werk-lightbox");
  if (!grid || !lightbox) return;

  var tiles = grid.querySelectorAll(".werk-tile");
  var imgEl = document.getElementById("werk-lightbox-img");
  var titelEl = document.getElementById("werk-lightbox-titel");
  var tekstEl = document.getElementById("werk-lightbox-tekst");
  var tellerEl = document.getElementById("werk-lightbox-teller");
  var prevBtn = lightbox.querySelector(".werk-lightbox-prev");
  var nextBtn = lightbox.querySelector(".werk-lightbox-next");

  var huidigeFotos = [];
  var huidigeIndex = 0;

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-actief"); });
      btn.classList.add("is-actief");
      var keuze = btn.dataset.filter;
      tiles.forEach(function (tile) {
        var toon = keuze === "alle" || tile.dataset.doelgroep === keuze;
        tile.classList.toggle("is-verborgen", !toon);
      });
    });
  });

  function toonFoto() {
    imgEl.src = huidigeFotos[huidigeIndex];
    tellerEl.textContent = (huidigeIndex + 1) + " / " + huidigeFotos.length;
  }

  function openLightbox(tile) {
    huidigeFotos = JSON.parse(tile.dataset.fotos);
    huidigeIndex = 0;
    titelEl.textContent = tile.dataset.titel;
    tekstEl.textContent = tile.dataset.tekst;
    toonFoto();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function sluitLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () { openLightbox(tile); });
    tile.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(tile);
      }
    });
  });

  lightbox.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", sluitLightbox);
  });

  prevBtn.addEventListener("click", function () {
    huidigeIndex = (huidigeIndex - 1 + huidigeFotos.length) % huidigeFotos.length;
    toonFoto();
  });

  nextBtn.addEventListener("click", function () {
    huidigeIndex = (huidigeIndex + 1) % huidigeFotos.length;
    toonFoto();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") sluitLightbox();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
})();
