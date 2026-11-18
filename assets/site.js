// Belgique × GRECO — interactions légères, le site reste lisible sans JavaScript.
(function () {
  // Compte à rebours jusqu'à l'échéance du 30 novembre 2026
  var bar = document.querySelector(".countdown");
  if (bar) {
    var deadline = new Date(bar.getAttribute("data-deadline"));
    var txt = bar.querySelector(".countdown__txt");
    var now = new Date();
    var days = Math.ceil((deadline - now) / 86400000);
    if (txt) {
      if (days > 1) txt.innerHTML = "<strong>J-" + days + "</strong> avant l’échéance du 30 novembre 2026 : rapport belge attendu sur 14 recommandations du GRECO en suspens";
      else if (days === 1) txt.innerHTML = "<strong>Dernier jour</strong> : le rapport belge au GRECO est attendu pour le 30 novembre 2026";
      else txt.innerHTML = "Échéance du 30 novembre 2026 <strong>dépassée</strong> — les rapports de situation sont confidentiels ; l’évaluation du GRECO sera publiée après son adoption en plénière";
    }
  }

  // Menu mobile
  var toggle = document.querySelector(".navtoggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Filtres des recommandations (statut, volet, faisabilité)
  var list = document.querySelector("[data-recos]");
  if (list) {
    var items = Array.prototype.slice.call(list.querySelectorAll(".reco"));
    var state = {};
    var countEl = document.querySelector("[data-recos-count]");
    function apply() {
      var shown = 0;
      items.forEach(function (el) {
        var ok = Object.keys(state).every(function (k) { return !state[k] || el.dataset[k] === state[k]; });
        el.hidden = !ok;
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown + " recommandation" + (shown > 1 ? "s" : "") + " affichée" + (shown > 1 ? "s" : "");
    }
    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.dataset.filter, val = btn.dataset.value;
        state[key] = val || null;
        document.querySelectorAll('[data-filter="' + key + '"]').forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        apply();
      });
    });
    var expand = document.querySelector("[data-expand]");
    if (expand) expand.addEventListener("click", function () {
      var anyClosed = items.some(function (el) { return !el.open && !el.hidden; });
      items.forEach(function (el) { if (!el.hidden) el.open = anyClosed; });
      expand.textContent = anyClosed ? "Tout replier" : "Tout déplier";
    });
    apply();
  }
})();
