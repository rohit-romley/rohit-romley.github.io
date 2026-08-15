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

  var form = document.getElementById("note-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var body = (document.getElementById("note").value || "").trim();
    if (!body) {
      document.getElementById("note").focus();
      return;
    }
    var url =
      "mailto:tom.sammer@gmail.com?subject=" +
      encodeURIComponent("CTO board note") +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = url;
  });
})();
