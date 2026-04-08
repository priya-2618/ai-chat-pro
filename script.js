const chatBox = document.getElementById("chatBox");

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = "message " + className;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  addMessage("Typing...", "bot");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  chatBox.lastChild.innerText = data.reply;
}

document.getElementById("userInput")
  .addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });
