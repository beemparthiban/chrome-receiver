function renderLinks(filter = "") {
  chrome.storage.local.get({ history: [] }, result => {
    const tbody = document.getElementById("linkTable");
    tbody.innerHTML = "";
    result.history
      .filter(entry => entry.url.includes(filter) || entry.timestamp.includes(filter))
      .reverse()
      .forEach(entry => {
        const tr = document.createElement("tr");
        const linkCell = document.createElement("td");
        const timeCell = document.createElement("td");

        const a = document.createElement("a");
        a.href = entry.url;
        a.textContent = entry.url;
        a.target = "_blank";

        linkCell.appendChild(a);
        timeCell.textContent = new Date(entry.timestamp).toLocaleString();

        tr.appendChild(linkCell);
        tr.appendChild(timeCell);
        tbody.appendChild(tr);
      });
  });
}

document.getElementById("filter").addEventListener("input", e => {
  renderLinks(e.target.value);
});

document.getElementById("refresh").addEventListener("click", () => renderLinks());
document.getElementById("clear").addEventListener("click", () => {
  chrome.storage.local.set({ history: [] }, () => renderLinks());
});

document.addEventListener("DOMContentLoaded", () => renderLinks());

