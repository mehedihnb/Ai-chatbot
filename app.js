// Initial message
document.getElementById('messages').innerHTML = `
    <div class="message bot">
        <div class="message-content">Hello! 👋 I'm your AI assistant. How can I help you today?</div>
    </div>
`;

let isMinimized = false;

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSend();
    }
}

async function handleSend() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessage('user', message);
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        const response = await fetch('http://localhost:5000/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: message }),
        });

        const data = await response.json();
        hideTypingIndicator();
        addMessage('bot', data.reply);
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        addMessage('bot', "I'm sorry, I encountered an error. Please try again later.");
    }
}

function addMessage(type, content) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('messages').appendChild(indicator);
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function toggleEmailForm() {
    const emailForm = document.getElementById('emailForm');
    emailForm.style.display = emailForm.style.display === 'none' ? 'flex' : 'none';
}

function toggleMinimize() {
    isMinimized = !isMinimized;
    document.querySelector('.chatbot-container').style.height = isMinimized ? '60px' : '500px';
    document.querySelector('.minimize-button').textContent = isMinimized ? '🔽' : '🔼';
}

function handleEmailSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    addMessage('bot', `Thank you! We'll send the chat transcript to ${email}`);
    toggleEmailForm();
}
