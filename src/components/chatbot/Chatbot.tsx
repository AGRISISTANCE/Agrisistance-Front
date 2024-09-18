import React, { useState, useEffect, KeyboardEvent } from 'react';
import './Chatbot.css';
import farmerEmoji from '../../assets/img/icons/farmeremoji.png';
import headerIcon from '../../assets/img/icons/farmeremoji.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { LOGOUT } from '../../redux/actionTypes';
import { apiCall } from '../../services/api';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; fromUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector((state: RootState) => state.token.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const storageKey = token ? `chatbotMessages_${token}` : 'chatbotMessagesGuest';
    const savedMessages = token ? localStorage.getItem(storageKey) : sessionStorage.getItem(storageKey);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [token]);

  useEffect(() => {
    const storageKey = token ? `chatbotMessages_${token}` : 'chatbotMessagesGuest';
    if (token) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } else {
      sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, token]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial message when the chatbot is opened and there are no messages
      const initialMessage = { text: 'Hello farmer, how can I help you today?', fromUser: false };
      setMessages([initialMessage]);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Update messages with user's input
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, fromUser: true },
      ]);
      setInput("");
      setLoading(true);
  
      try {
        const response = await apiCall('/model/chat-bot', {
          method: 'POST',
          data: { message: input },
        });
  
        console.log("user asked: ", input);
        console.log("chatbot responded: ", response);
  
        // Directly use the response string as the bot's message
        const botMessage = response; // The response is already a string
        
        // Update messages state with the chatbot's response
        setMessages((prevMessages) => {
          const updatedMessages = [
            ...prevMessages,
            { text: botMessage, fromUser: false },
          ];
          console.log("Updated messages: ", updatedMessages); // Log here to see the new state
          return updatedMessages;
        });
  
      } catch (error) {
        console.error("Error occurred: ", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'An error occurred. Please try again.', fromUser: false },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    if (token) {
      localStorage.removeItem(`chatbotMessages_${token}`);
    } else {
      sessionStorage.removeItem('chatbotMessagesGuest');
    }
    window.location.href = '/';
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button
        className="chatbot-toggle"
        onClick={handleToggle}
        aria-label="Chat"
      >
        <img src={farmerEmoji} alt="Chat" className="chatbot-icon" />
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <img
              src={headerIcon}
              alt="Header Icon"
              className="chatbot-header-icon"
            />
            <span className="chatbot-header-title">AgriHelper</span>
            <button className="chatbot-close" onClick={handleClose}>
              ✕
            </button>
          </div>
          {/* <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.fromUser ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot loading">
                <div className="loading-spinner"></div>
                <span>...</span>
              </div>
            )}
          </div> */}
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.fromUser ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot loading">
                <div className="loading-spinner"></div>
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
