const apiKey = "AIzaSyAloC5dLQG5wLrm1xO0BRLb-5O1zIX7pQc"; // Masukkan API key Gemini
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addMessage("Mengetik...", "ai");

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await res.json();
    document.querySelector(".ai:last-child").remove();

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, AI tidak merespons.";
    addMessage(reply, "ai");
  } catch (err) {
    document.querySelector(".ai:last-child").remove();
    addMessage("Terjadi kesalahan.", "ai");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});