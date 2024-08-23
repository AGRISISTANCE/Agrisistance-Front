import React from 'react';
import './assets/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import Chatbot from './components/chatbot/Chatbot'

// Import Landing Page
import LandingPage from './views/Landing/landingPage';

export default function Main() {
  const location = useLocation();
  const showChatbot = !location.pathname.startsWith('/auth');

  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Layout */}
        <Route path="auth/*" element={<AuthLayout />} />

        {/* Admin Layout */}
        <Route
          path="dashboard/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
      </Routes>
      {showChatbot && <Chatbot />}
    </ChakraProvider>
  );
}
