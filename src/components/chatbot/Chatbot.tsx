// src/components/Chatbot.tsx
import React from 'react';
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css'; // Import default styles
import './Chatbot.css'; // Import your custom styles


const Chatbot: React.FC = () => {
  const handleNewUserMessage = (newMessage: string) => {
    // Handle new message from user
    console.log(`New message incoming! ${newMessage}`);
    // For example, you can send the message to your backend here
  };

  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chatbot"
        subtitle="How can I assist you?"
        showCloseButton
      />
    </div>
  );
};

export default Chatbot;
