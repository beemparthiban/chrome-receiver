# 📲 Mobile Link Receiver – Chrome Extension

Send links from your mobile device to your Chrome browser effortlessly. This tool allows you to push a URL from an iOS Shortcut directly into Chrome — where it opens instantly and gets saved in your browsing history view.

---

## 🔧 What It Does

- ✅ Push links from iOS to Chrome via a secure API.
- ✅ Automatically opens received links in a new tab.
- ✅ Stores a local history of all opened links with timestamps.
- ✅ Displays the history in a full-tab table with filtering options.

---

## 🧩 How It Works

1. **Backend (Render.com or similar)**  
   A simple server accepts POST requests and stores the most recent link temporarily.

2. **iOS Shortcut**  
   A shortcut sends the current URL from your mobile device to the backend.

3. **Chrome Extension**  
   Polls the server every few seconds:
   - If a new link is found, it opens it in a new tab.
   - Stores it locally with the time received.
   - Opens a nice table UI when you click the extension icon.

---

## 📁 File Overview

| File         | Purpose                                         |
|--------------|-------------------------------------------------|
| `manifest.json` | Chrome extension config (v3)               |
| `background.js` | Polls for new links and opens them          |
| `history.html`  | Displays previously received links          |
| `history.js`    | Table rendering, filtering, and buttons     |
| `style.css`     | UI styling for the history page             |

---

## 🧪 Example API Usage

### Push a Link (from iOS Shortcut or curl)


curl -X POST https://your-render-url.com/push-link \
  -H "Authorization: Bearer your-super-secret-token" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

## Poll for Next Link

curl -X GET https://your-render-url.com/next-link \
  -H "Authorization: Bearer your-super-secret-token" 

## 🔐 Configuration

Update the following in background.js:
const API_URL = "https://your-render-url.com/next-link";
const API_KEY = "your-super-secret-token";

## 🧩 How to Load the Extension in Chrome
- Visit chrome://extensions/
- Enable Developer mode (top-right)
- Click Load unpacked
- Select the project directory

Once loaded, clicking the extension icon will open the full history page in a new tab.
