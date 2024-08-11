import { Icon } from '@chakra-ui/react';

import {
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineYard,
  MdOutlineCalendarMonth,
  MdGroups
} from 'react-icons/md';

import {
  PiVirtualReality
} from 'react-icons/pi';



// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signUp';
import LogInCentered from 'views/auth/logIn'

// Landing Page Import
import LandingPage from 'views/Landing/landingPage'; // <== Import the Landing Page Component


const routes = [
  {
    name: 'Landing Page',
    layout: '/',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <LandingPage />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: '/sign-up',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Log In',
    layout: '/auth',
    path: '/log-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <LogInCentered />,
  },
  {
    name: 'Home',
    layout: '/dashboard',
    path: '/home',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
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
    component: <DataTables />,
  },
  {
    name: 'Calendar',
    layout: '/dasboard',
    path: '/calendar',
    icon: <Icon as={MdOutlineCalendarMonth} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
  },
  {
    name: 'Your Network',
    layout: '/dashboard',
    path: '/network',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
  },
  {
    name: 'Virtual Land',
    layout: '/dashboard',
    path: '/virtualland',
    icon: <Icon as={PiVirtualReality} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  }
];


export default routes;
