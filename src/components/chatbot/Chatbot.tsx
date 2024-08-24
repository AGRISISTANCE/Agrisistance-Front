import React, { useState, useEffect, KeyboardEvent } from 'react';
import './Chatbot.css';
import farmerEmoji from '../../assets/img/icons/farmeremoji.png'; // Import the chatbot icon
import headerIcon from '../../assets/img/icons/farmeremoji.png'; // Import the header icon

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>(() => {
      const savedMessages = localStorage.getItem('chatbotMessages');
      return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
      if (!isOpen) return;

      // Only add the initial message if there are no saved messages
      if (messages.length === 0) {
          const initialMessage = { text: 'Hello farmer, how can I help you today?', fromUser: false };
          setMessages([initialMessage]);
      }
  }, [isOpen]);

  useEffect(() => {
      localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  const handleToggle = () => {
      setIsOpen(!isOpen);
  };

  const handleClose = () => {
      setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
  };

  const handleSendMessage = () => {
      if (input.trim()) {
          setMessages([...messages, { text: input, fromUser: true }]);
          setInput('');
          setLoading(true); // Start loading indicator
          // Simulate a response from the chatbot
          setTimeout(() => {
              setMessages(prevMessages => [
                  ...prevMessages,
                  { text: 'Thank you for your message!', fromUser: false }
              ]);
              setLoading(false); // Stop loading indicator
          }, 1000);
      }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSendMessage();
      }
  };

  return (
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
          <button className="chatbot-toggle" onClick={handleToggle}>
              <img src={farmerEmoji} alt="Chat" className="chatbot-icon" />
          </button>
          {isOpen && (
              <div className="chatbot-box">
                  <div className="chatbot-header">
                      <img src={headerIcon} alt="Header Icon" className="chatbot-header-icon" />
                      <span className="chatbot-header-title">AgriHelper</span>
                      <button className="chatbot-close" onClick={handleClose}>✕</button>
                  </div>
                  <div className="chatbot-messages">
                      {messages.map((msg, index) => (
                          <div
                              key={index}
                              className={`chatbot-message ${msg.fromUser ? 'user' : 'bot'}`}
                          >
                              {msg.text}
                          </div>
                      ))}
                      {loading && (
                          <div className="chatbot-message bot loading">
                              <div className="loading-spinner"></div> {/* Loading spinner */}
                              <span>...</span>
                          </div>
                      )}
                  </div>
                  <div className="chatbot-input">
                      <input
                          type="text"
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
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
