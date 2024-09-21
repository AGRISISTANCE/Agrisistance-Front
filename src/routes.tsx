import React, { Component } from 'react';
import { Icon } from '@chakra-ui/react';

import {
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineYard,
  MdGroups,
  MdUpgrade
} from 'react-icons/md';


//
import Home from './views/admin/home'
import Profile from './views/admin/profile/index'
import Yourland from './views/admin/yourland'
//import Yournetwork from './views/admin/yournetwork'


// Auth Imports
import SignUpCentered from './views/auth/signUp';
import LogInCentered from './views/auth/logIn'


import LandingPage from './views/Landing/landingPage';
// import Yournetwork from 'views/admin/yournetwork';

import Error from './views/404';
import Plan from './views/admin/plan';
import Yournetwork from './views/admin/yournetwork';
import ForgetPassword from './views/auth/ForgotPassword';
import ResetPassword from './views/auth/reset-password';

const routes = [
  {
    name: 'Landing Page',
    layout: '',
    path: '',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <LandingPage />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: '/signup',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignUpCentered />,
  },
  {
    name: 'Log In',
    layout: '/auth',
    path: '/login/*',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <LogInCentered />,
  },
  {
    name: 'Home',
    layout: '/dashboard',
    path: '/home/*',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Home />,
  },
  {
    name: 'Profile',
    layout: '/dashboard',
    path: '/profile/*',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
    secondary: true,
  },
  {
    name: 'Your Land',
    layout: '/dashboard',
    icon: <Icon as={MdOutlineYard} width="20px" height="20px" color="inherit" />,
    path: '/yourland/*',
    component: <Yourland />,
  },
  {
    name: 'Upgrade plan',
    layout: '/dashboard',
    icon: <Icon as={MdUpgrade} width="20px" height="20px" color="inherit" />,
    path: '/plans/*',
    component: <Plan />,
  },

  {
    name: 'forgot password',
    layout: '/auth',
    icon: <Icon as={MdUpgrade} width="20px" height="20px" color="inherit" />,
    path: '/forgot-password',
    component: <ForgetPassword />,
  },
  {
    name: 'reset password',
    layout: '/auth',
    icon: <Icon as={MdUpgrade} width="20px" height="20px" color="inherit" />,
    path: '/reset-password/:token',
    component: <ResetPassword />,
  },
  {
    name: 'Your Network',
    layout: '/dashboard',
    path: '/network/*',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: <Yournetwork />,
  }
];


export default routes;