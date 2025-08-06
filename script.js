const apiKey = "sk-9673ed4d355d4ca9bf0204d4ea5efca4";
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
    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat", // model utama DeepSeek
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await res.json();
    console.log(data);
    document.querySelector(".ai:last-child").remove();

    const reply = data.choices?.[0]?.message?.content || "Maaf, AI tidak merespons.";
    addMessage(reply, "ai");
  } catch (err) {
    console.error(err);
    document.querySelector(".ai:last-child").remove();
    addMessage("Terjadi kesalahan.", "ai");
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
