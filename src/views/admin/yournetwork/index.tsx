// components/Network.tsx
import React, { useEffect, useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text } from '@chakra-ui/react';
import AllPosts from './components/AllPosts';
import MyPosts from './components/MyPosts';
import { apiCall } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { persistor } from '../../../redux/store';


const Network: React.FC = () => {

  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('All Posts');

  //! DONT TOUCH! Added just to solve some problem
  // useEffect(() => {
  //   // Purge persisted state on component mount
  //   persistor.purge();
  // }, []);


  //Get all posts from backend
  //! Commented to get dummy posted (remove when using real backend)
  // useEffect(() => {
  //   const fetchAllPosts = async () => {
  //     try {
  //       const posts = await apiCall('/profile/get-profile', {
  //         method: 'GET',
  //       });

  //       // dispatch(); Set all posts here
  //     } catch (error) {
  //       console.error('Failed to fetch user profile:', error);
  //     }
  //   };
  //   fetchAllPosts();
  // }, [dispatch, token]);


  const renderContent = () => {
    switch (activeSection) {
      case 'All Posts':
        return <AllPosts />;
      case 'Business Promotion':
        return <AllPosts category='businessPromotion' />;
      case 'Opportunities and Partnerships':
        return <AllPosts category='opportunitiesAndPartnership' />;
      case 'Products and Resources':
        return <AllPosts category='resourcesAndProducts' />;
      case 'My Posts':
        return <MyPosts />;
      default:
        return null;
    }
  };

  return (
    <Box p={5}>
      <Flex gap='40px' mb={4}>
        {['All Posts', 'Business Promotion', 'Opportunities and Partnerships', 'Products and Resources', 'My Posts'].map(section => (
          <Text
            key={section}
            onClick={() => setActiveSection(section)}
            cursor="pointer"
            color={activeSection === section ? 'black' : 'gray.500'}
            textDecoration={activeSection === section ? 'underline' : 'none'}
            mb={2}
          >
            {section}
          </Text>
        ))}
      </Flex>
      <Box>
        {renderContent()}
      </Box>
    </Box>
  );
}
export default Network;
