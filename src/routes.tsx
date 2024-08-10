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
import SignInCentered from 'views/auth/signIn';

// Landing Page Import
import LandingPage from 'views/Landing/landingPage'; // <== Import the Landing Page Component


const routes = [
  {
    name: 'Landing Page',  // <== Add a name for the landing page route
    layout: '/',
    path: '/',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <LandingPage />,  // <== Use the Landing Page component
  },
  {
    name: 'Home',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: (
      <Icon
        as={MdPerson}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Profile />,
    secondary: true,
  },
  {
    name: 'Your land',
    layout: '/admin',
    icon: <Icon as={MdOutlineYard} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Calendar',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={MdOutlineCalendarMonth} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
  },
  {
    name: 'Your network',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={MdGroups} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
  },
  {
    name: 'Virtual land',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: <Icon as={PiVirtualReality} width="20px" height="20px" color="inherit" />,
    component: <NFTMarketplace />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];


export default routes;
