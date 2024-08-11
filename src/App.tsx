import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; 
import { useState } from 'react';

// Import Landing Page
import LandingPage from './views/Landing/landingPage';

export default function Main() {
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

        {/* RTL Layout */}
        
        {/* 
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        */}


        {/* Fallback to Admin Dashboard */}

        {/*<Route path="*" element={<Navigate to="/admin" replace />} />*/}
        
      </Routes>
    </ChakraProvider>
  );
}
