const API_URL = "https://pusher-3vdj.onrender.com/next-link";
const API_KEY = "phobia-canine-compare";
const POLL_INTERVAL_MS = 5000; // poll every 5 seconds

async function fetchNextLink() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      console.error("Error fetching link:", response.statusText);
      return;
    }

    const data = await response.json();

    if (data.url) {
      console.log("Opening link:", data.url);
      chrome.tabs.create({ url: data.url });
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

chrome.alarms.create("pollLinks", { periodInMinutes: POLL_INTERVAL_MS / 60000 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pollLinks") {
    fetchNextLink();
  }
});

// Also poll once immediately on startup
fetchNextLink();
