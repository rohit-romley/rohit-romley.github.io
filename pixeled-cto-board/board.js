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

  var note = document.getElementById("note");
  var subject = document.getElementById("note-subject");
  var form = document.getElementById("note-form");

  document.querySelectorAll("[data-decision]").forEach(function (el) {
    el.addEventListener("click", function () {
      var text = el.getAttribute("data-decision");
      if (subject) subject.value = text;
      if (note && !note.value.trim()) note.value = text + ".";
    });
  });

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
