import React, { useEffect, useState } from 'react';
import Tour from 'reactour';
import { Box } from '@chakra-ui/react';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarContext } from '../../contexts/SidebarContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from '../../routes';
import images from './onboarding/images'; //import images for onboarding

const steps = [
  {
    selector: '.profile-section', // Target element class
    content: (
      <div>
        <p>This is your profile section where you can view and manage your profile details.</p>
      </div>
    ),
  },
  {
    selector: '.selected-land', // Target element class
    content: (
      <div>
        <p>Here you can see the selected land details.</p>
        <img src={images.selectedLand} alt="Selected Land" style={{ width: '100%' }} />
      </div>
    ),
  },
  {
    selector: '.add-new-land', // Target element class
    content: (
      <div>
        <p>Click here to add a new land to your profile.</p>
      </div>
    ),
  },
  {
    selector: '.other-lands', // Target element class
    content: (
      <div>
        <p>These are the other lands you have.</p>
        <img src={images.otherLands} alt="Other Lands" style={{ width: '100%' }} />
      </div>
    ),
  },
];

export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowOnboarding(true);
    }, 500); // Adjust the delay as needed
  }, []);



  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      if (route.layout === '/dashboard') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar routes={routes} display="none" {...rest} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: '20px', md: '30px' }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard/home" replace />}
                />
              </Routes>
            </Box>
          ) : null}

          
        </Box>
        {showOnboarding && (
        <Tour
          steps={steps}
          isOpen={showOnboarding}
          onRequestClose={() => setShowOnboarding(false)}
          rounded={5} // Customize tooltip style
          accentColor="#5cb85c" // Customize accent color
        />
      )}
      </SidebarContext.Provider>
    </Box>
  );
}