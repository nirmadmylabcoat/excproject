//Gemini API

const chatOutput = document.getElementById("chat-output");
const userInput = document.getElementById("userInput");
const API_KEY = "AIzaSyDl8ZcDP6O236zxXzj1uyR0YodOIK5fCmI";

// Function to create a chat message element
const createChatMessage = (message, className) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${className}`;
    messageDiv.innerText = message;
    return messageDiv;
};

document.getElementById('sendMsg').addEventListener('click', ()=>{
    sendMessage();
})

// Function to handle sending a message
const sendMessage = async () => {
    const userMessage = "Me: " + userInput.value.trim();

    if (!userMessage) return;

    // Display user's message
    const userMessageElement = createChatMessage(userMessage, "outgoing");
    chatOutput.appendChild(userMessageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Clear input field
    userInput.value = "";

    // Display thinking message
    const thinkingMessage = createChatMessage("Thinking...", "incoming");
    chatOutput.appendChild(thinkingMessage);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }],
            })
        });

        const data = await response.json();
        console.log(data);
        const botMessage = "Gemini: " + data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";

        thinkingMessage.remove();

        const botMessageElement = createChatMessage(botMessage, "incoming");
        chatOutput.appendChild(botMessageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        thinkingMessage.remove();

        const errorMessage = createChatMessage("Oops! Something went wrong. Please try again.", "incoming");
        chatOutput.appendChild(errorMessage);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
};

// Event listener for Enter key
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

