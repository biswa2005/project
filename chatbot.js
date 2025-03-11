document.addEventListener("DOMContentLoaded", function() {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("send");

    const API_KEY = "AIzaSyDauljU1FA5FFrZljuBu_vdxJxKz5jCsM8";  // Replace with your Gemini API key

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let userText = userInput.value.trim();
        if (!userText) return;

        appendMessage("User", userText);
        userInput.value = "";

        fetchAIResponse(userText);
    }

    function fetchAIResponse(message) {
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]  // ✅ Correct payload format
            })
        })
        .then(response => response.json())
        .then(data => {
            let botReply = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't process that.";
            appendMessage("Bot", botReply);
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("Bot", "Oops! Something went wrong.");
        });
    }

    function appendMessage(sender, text) {
        let msgDiv = document.createElement("div");
        msgDiv.textContent = `${sender}: ${text}`;
        chatbox.appendChild(msgDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
