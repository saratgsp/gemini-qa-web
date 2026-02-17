import { GoogleGenerativeAI } from "@google/generative-ai";

const chatHistory = document.getElementById('chat-history');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.getElementById('close-modal');
const saveKeyBtn = document.getElementById('save-key-btn');
const apiKeyInput = document.getElementById('api-key-input');

let genAI;
let model;

// --- State Management ---
// Check for file protocol (ES Modules won't work)
if (window.location.protocol === 'file:') {
    alert("Warning: This app uses ES Modules which may not work when opened directly as a file. Please use a local server (e.g., Live Server or python -m http.server).");
}

// Check for API Key on load
const savedKey = localStorage.getItem('gemini_api_key');
if (savedKey) {
    initializeGenAI(savedKey);
    apiKeyInput.value = savedKey;
} else {
    toggleModal(true);
}

// --- Event Listeners ---
settingsBtn.addEventListener('click', () => toggleModal(true));
closeModalBtn.addEventListener('click', () => toggleModal(false));

saveKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('gemini_api_key', key);
        initializeGenAI(key);
        toggleModal(false);
        addSystemMessage("API Key saved! Ready to chat.");
    } else {
        alert("Please enter a valid API key.");
    }
});

sendBtn.addEventListener('click', sendMessage);

promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// --- Functions ---

function initializeGenAI(key) {
    try {
        genAI = new GoogleGenerativeAI(key);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a free/efficient model
    } catch (error) {
        console.error("Error initializing Gemini:", error);
        addSystemMessage("Error initializing Gemini API. Please check your key.");
    }
}

function toggleModal(show) {
    if (show) {
        settingsModal.classList.remove('hidden');
    } else {
        settingsModal.classList.add('hidden');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.textContent = sender === 'user' ? '👤' : '✨';

    const content = document.createElement('div');
    content.classList.add('message-content');

    // Parse Markdown for AI messages
    if (sender === 'ai') {
        content.innerHTML = marked.parse(text);
    } else {
        content.textContent = text;
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatHistory.appendChild(messageDiv);

    // Auto scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Remove welcome message if it exists
    const welcome = document.querySelector('.welcome-message');
    if (welcome) welcome.remove();

    return content;
}

function addSystemMessage(text) {
    const msg = document.createElement('div');
    msg.style.textAlign = 'center';
    msg.style.color = 'var(--text-muted)';
    msg.style.margin = '1rem 0';
    msg.style.fontSize = '0.85rem';
    msg.textContent = text;
    chatHistory.appendChild(msg);
}

async function sendMessage() {
    const text = promptInput.value.trim();
    if (!text) return;

    if (!model) {
        toggleModal(true);
        return;
    }

    // User Message
    addMessage(text, 'user');
    promptInput.value = '';
    promptInput.style.height = 'auto'; // Reset height

    // Loading State
    const loadingDiv = addMessage("Thinking...", 'ai');
    loadingDiv.classList.add('loading');

    try {
        const result = await model.generateContent(text);
        const response = await result.response;
        const textResponse = response.text();

        // Remove loading and add actual response (replace content)
        loadingDiv.classList.remove('loading');
        loadingDiv.innerHTML = marked.parse(textResponse);

        // Re-scroll to bottom after rendering markdown
        chatHistory.scrollTop = chatHistory.scrollHeight;

    } catch (error) {
        console.error("Gemini Error:", error);
        loadingDiv.textContent = "Error: " + (error.message || "Failed to get response. Check console for details.");
        addSystemMessage("Tip: Make sure your API key is correct and you have an active internet connection.");
    }
}

// Auto-resize textarea
promptInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});
