// components/Network.tsx
import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AllPosts from './components/AllPosts';
import MyPosts from './components/MyPosts';

const Network: React.FC = () => {
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
