// background.js
const API_URL = "https://pusher-3vdj.onrender.com/next-link";
const API_KEY = "phobia-canine-compare";
const POLL_INTERVAL_MS = 2000; // poll every 2 seconds

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

setInterval(pollLink, 2000);

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("history.html") });
});
