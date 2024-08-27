import './assets/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import Chatbot from './components/chatbot/Chatbot';
import LandingPage from './views/Landing/landingPage';
<<<<<<< Updated upstream
import React from 'react';
=======
import Error from 'views/404';
import Plan from 'views/admin/plan';
>>>>>>> Stashed changes

export default function Main() {
  const location = useLocation();
  const showChatbot = !location.pathname.startsWith('/auth');

  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
<<<<<<< Updated upstream
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="auth/*" element={<AuthLayout />} />
=======
      {/* <Provider store={store} > */}
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Layout */}
        <Route path="auth/*" element={<AuthLayout />} />

        {/* Admin Layout */}
>>>>>>> Stashed changes
        <Route
          path="dashboard/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
<<<<<<< Updated upstream
      </Routes>
=======
        <Route path='*' element={<Error />} />
        <Route path='/plan' element={<Plan />} />
      </Routes>
      {/* </Provider> */}
>>>>>>> Stashed changes
      {showChatbot && <Chatbot />}
    </ChakraProvider>
  );
}
