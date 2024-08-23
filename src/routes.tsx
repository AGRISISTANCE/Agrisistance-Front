import React from 'react';
import { Icon } from '@chakra-ui/react';

import {
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineYard,
  MdOutlineCalendarMonth,
  MdGroups,
  MdLogout 
} from 'react-icons/md';

import {
  PiVirtualReality
} from 'react-icons/pi';


//
import Home from './views/admin/home'
import Profile from './views/admin/profile'
import Yourland from './views/admin/yourland'
import Calendar from './views/admin/calendar'
import Virtualland from './views/admin/virtualland'
import Yournetwork from './views/admin/yournetwork'


// Auth Imports
import SignUpCentered from './views/auth/signUp';
import LogInCentered from './views/auth/logIn'

// Landing Page Import
import LandingPage from './views/Landing/landingPage'; // <== Import the Landing Page Component


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
    path: '/login',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <LogInCentered />,
  },
  {
    name: 'Home',
    layout: '/dashboard',
    path: '/home',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Home />,
  },
  {
    name: 'Profile',
    layout: '/dashboard',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
    secondary: true,
  },
  {
    name: 'Your Land',
    layout: '/dashboard',
    icon: <Icon as={MdOutlineYard} width="20px" height="20px" color="inherit" />,
    path: '/yourland',
    component: <Yourland />,
  },
  {
    name: 'Virtual Land',
    layout: '/dashboard',
    path: '/virtualland',
    icon: <Icon as={PiVirtualReality} width="20px" height="20px" color="inherit" />,
    component: <Virtualland />,
  },
  {
    name: 'Disconnect',
    layout: '/auth',
    path: '/landing',
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: <LandingPage />,
  }
];


export default routes;
{/*{
    name: 'Calendar',
    layout: '/dashboard',
    path: '/calendar',
    icon: <Icon as={MdOutlineCalendarMonth} width="20px" height="20px" color="inherit" />,
    component: <Calendar />,
  },
  {
    name: 'Your Network',
    layout: '/dashboard',
    path: '/network',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: <Yournetwork />,
  }*/}