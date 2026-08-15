(function () {
  var time = document.getElementById("updated");
  if (time) {
    var when = new Date(time.getAttribute("datetime"));
    time.textContent = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Edmonton",
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    }).format(when);
  }

  var tabs = ["all", "eduable", "mockaccino"];

  function currentTab() {
    var raw = (location.hash || "").replace(/^#/, "").toLowerCase();
    return tabs.indexOf(raw) >= 0 ? raw : "all";
  }

  function applyTab(name) {
    var tab = tabs.indexOf(name) >= 0 ? name : "all";
    document.body.setAttribute("data-tab", tab);
    document.querySelectorAll(".tab").forEach(function (el) {
      var on = el.getAttribute("data-tab") === tab;
      el.classList.toggle("is-on", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function setTab(name, replace) {
    var tab = tabs.indexOf(name) >= 0 ? name : "all";
    var next = "#" + tab;
    if (location.hash !== next) {
      if (replace) history.replaceState(null, "", next);
      else history.pushState(null, "", next);
    }
    applyTab(tab);
  }

  applyTab(currentTab());
  if (!location.hash) history.replaceState(null, "", "#all");

  document.querySelectorAll(".tab").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      setTab(el.getAttribute("data-tab"), false);
      var summary = document.getElementById("summary");
      if (summary) summary.scrollIntoView({ block: "nearest" });
    });
  });

  window.addEventListener("hashchange", function () {
    applyTab(currentTab());
  });

  var note = document.getElementById("note");
  var subject = document.getElementById("note-subject");
  var form = document.getElementById("note-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var body = (note && note.value || "").trim();
    if (!body) {
      if (note) note.focus();
      return;
    }
    var subj = (subject && subject.value) || "CTO board note";
    window.location.href =
      "mailto:tom.sammer@gmail.com?subject=" +
      encodeURIComponent(subj) +
      "&body=" +
      encodeURIComponent(body);
  });
})();
