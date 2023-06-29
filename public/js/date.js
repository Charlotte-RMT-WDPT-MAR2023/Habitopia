const today = new Date();
const options = { weekday: "short",  year: "numeric", month: "long", day: "numeric" };
document.getElementById("new-entry-date").textContent =
  today.toLocaleDateString("en-US", options);


