// components/Network.tsx
import React, { useEffect } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AllPosts from './components/AllPosts';
import MyPosts from './components/MyPosts';
import { apiCall } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Network: React.FC = () => {

  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();

  //Get all posts from backend
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await apiCall('/profile/get-profile', {
          method: 'GET',
        });

        // dispatch(); Set all posts here
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchAllPosts();
  }, [dispatch, token]);


  return (
    <Box p={5}>
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>All Posts</Tab>
          <Tab>Business Promotion</Tab>
          <Tab>Opportunities and Partnerships</Tab>
          <Tab>Products and Resources</Tab>
          <Tab>My Posts</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllPosts />
          </TabPanel>
          <TabPanel>
            <AllPosts category='businessPromotion' />
          </TabPanel>
          <TabPanel>
            <AllPosts category='opportunitiesAndPartnership' />
          </TabPanel>
          <TabPanel>
            <AllPosts category='resourcesAndProducts' />
          </TabPanel>
          <TabPanel>
            <MyPosts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Network;

