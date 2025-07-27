// background.js
const API_URL = "https://pusher-3vdj.onrender.com/next-link";
const API_KEY = "phobia-canine-compare";
const POLL_INTERVAL_MS = 5000; // poll every 5 seconds

async function pollLink() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });
    const data = await res.json();
    if (data.url) {
      const timestamp = new Date().toISOString();
      chrome.storage.local.get({ history: [] }, result => {
        const history = result.history;
        history.push({ url: data.url, timestamp });
        chrome.storage.local.set({ history });
        chrome.tabs.create({ url: data.url });
      });
    }
  } catch (err) {
    console.error("Polling failed:", err);
  }
}

setInterval(pollLink, 5000);

// popup.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Link History</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <input type="text" id="filter" placeholder="Filter by keyword or date...">
  <table>
    <thead>
      <tr><th>Link</th><th>Time</th></tr>
    </thead>
    <tbody id="linkTable"></tbody>
  </table>
  <div class="buttons">
    <button id="refresh">Refresh</button>
    <button id="clear">Clear All</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>

// popup.js
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

// style.css
body {
  font-family: sans-serif;
  padding: 10px;
  width: 400px;
}
input {
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  word-break: break-word;
}
th {
  background-color: #f4f4f4;
}
.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
button {
  padding: 6px 12px;
  cursor: pointer;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}
