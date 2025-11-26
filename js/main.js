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
        // socketUrl: "http://localhost:5005",
        socketUrl: "https://izbchatbot.onrender.com",
        socketPath: "/socket.io/",
        title: "Adrian",
        subtitle: "Seamless Banking at Your Fingertips",
        params: { storage: "session" },
        profileAvatar: "assets/svg/robot.svg",
        closeImage: "assets/svg/angle-down.svg",
        inputTextFieldHint: "Type a message...",
        // showFullScreenButton: true,
        showMessageDate: true
      },
      null
    );
  };
  (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
})();
