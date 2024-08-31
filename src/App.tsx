import React from 'react';
import './assets/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import Chatbot from './components/chatbot/Chatbot';
import LandingPage from './views/Landing/landingPage';
import Error from './views/404';
import Plan from './views/admin/plan';
import Profile from './views/admin/profile';
import ResetPassword from 'views/auth/reset-password';
import ForgetPassword from 'views/admin/ForgetPassword';
import Emailverified from 'views/admin/emailverified';
import EmailUpdatedSuccessfully from 'views/admin/emailUpdatedSuccessfully';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store'; // Adjust the import path as needed

export default function Main() {
  const location = useLocation();
  const showChatbot = !location.pathname.startsWith("/auth");

  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  // Get the token from Redux state
  const token = useSelector((state: RootState) => state.token.token);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth/*" element={<AuthLayout />} />
        {/* Conditionally render Admin Layout based on token */}
        {token ? (
          <Route
            path="dashboard/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
        ) : (
          <Route path="dashboard/*" element={<Error />} />
        )}
        <Route path='*' element={<Error />} />
        <Route path='/plan' element={<Plan />} />
      </Routes>
      {showChatbot && <Chatbot />}
    </ChakraProvider>
  );
}