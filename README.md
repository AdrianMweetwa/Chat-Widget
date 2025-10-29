# 💬 Adrian Chat Widget

**Adrian Chat Widget** is a lightweight, embeddable web interface for the **Adrian Banking Assistant**
It provides customers with a seamless and secure way to chat directly from the web — using the same conversational backend as the main IZB chatbot.

## Overview

This project is purely the **frontend chat widget** — built to be embedded on any website.  
It uses the official **Rasa Webchat 1.0.1** library, loaded dynamically for performance.

When the page loads:

1. The `main.js` script injects the Rasa webchat library.
2. The widget initializes with your brand settings (`Adrian`, colors, subtitle, etc.).
3. The chat connects to your local or remote Rasa server (`socketUrl`).
4. The webchat remembers messages during the session (`sessionStorage`).

## File Structure

chat-widget/
│
├── assets/
│ ├── favicon/ # Favicon for branding
│ ├── img/ # Backgrounds for desktop & mobile
│ └── svg/ # Bot avatar + icons
│
├── css/
│ └── style.css # Widget styling and theme overrides
│
├── js/
│ └── main.js # Script that loads and initializes the Rasa Webchat
│
├── index.html # Entry point that hosts the widget
└── README.md # You're reading it

## How It Works

The widget’s core logic lives in **`js/main.js`**:

```js
(function () {
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/rasa-webchat@1.0.1/lib/index.js";
  s.async = true;
  s.onload = () => {
    window.WebChat.default(
      {
        selector: "#webchat",
        initPayload: "/greet",
        customData: { language: "en" },
        socketUrl: "http://localhost:5005",
        socketPath: "/socket.io/",
        title: "Adrian",
        subtitle: "Seamless Banking at Your Fingertips",
        params: { storage: "session" },
        profileAvatar: "./assets/svg/robot.svg",
        closeImage: "./assets/svg/angle-down.svg",
        inputTextFieldHint: "Type a message...",
        showMessageDate: true,
      },
      null
    );
  };
  (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
})();
```

Here’s what’s happening:

- **Dynamic loading:** Rasa Webchat is fetched from CDN after the page loads — this keeps the site fast.
- **Session handling:** Uses `sessionStorage` so messages persist during browsing.
- **Brand identity:** The header title, subtitle, and avatar are all customized for Adrian.
- **Socket connection:** Connects to your Rasa server on `http://localhost:5005` (update for production).

## index.html

The HTML file is intentionally simple — it just hosts the widget and background styling:

```html
<div id="webchat"></div>
<script src="/js/main.js"></script>
```

Everything else (UI logic, chat handling, socket connection) is handled by Rasa Webchat dynamically.

---

## Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/<your-username>/chat-widget.git
   cd chat-widget
   ```

2. **Start a local web server**

   ```bash
   python -m http.server 8080
   ```

   > Or use VS Code Live Server, Node’s `serve`, etc.

3. **Run your Rasa backend**

   ```bash
   rasa run --enable-api --cors "*" --port 5005
   ```
