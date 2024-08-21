// ChatBot.tsx
import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import farmerEmoji from '../../assets/img/icons/farmeremoji.png'; // Import the chatbot icon

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (!isOpen) return;
        // Add the initial message when the chatbot opens
        setMessages(['Hello farmer, how can I help you today?']);
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            <button className="chatbot-toggle" onClick={handleToggle}>
                <img src={farmerEmoji} alt="Chat" className="chatbot-icon" />
            </button>
            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="chatbot-message">
                                {msg}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
