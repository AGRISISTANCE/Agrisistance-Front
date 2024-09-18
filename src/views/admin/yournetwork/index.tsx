// components/Network.tsx
import React, { useEffect, useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text } from '@chakra-ui/react';
import AllPosts from './components/AllPosts';
import MyPosts from './components/MyPosts';
import { apiCall } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { persistor } from '../../../redux/store';
import Navbar from '../navbar/navbar';
import { setPosts } from '../../../redux/postsSlice';


const Network: React.FC = () => {

  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('All Posts');

  // ! DONT TOUCH! Added just to solve some problem
  // useEffect(() => {
  //   // Purge persisted state on component mount
  //   persistor.purge();
  // }, []);


  //Get all posts from backend
  //! COMMENT when using dummy data
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const posts = await apiCall('/network/get-all-posts', {
          method: 'GET',
          requireAuth: true,
        }, token);

        // Map the response to the Post interface
        const mappedPosts = posts.map((post: any) => ({
          postID: post.post_id,
          title: post.post_title,
          type: post.post_type,
          description: post.post_content,
          image: post.post_image || 'defaultImage', // Fallback image
          authorId: post.user.user_id,
          authorName: `${post.user.first_name} ${post.user.last_name}`,
          authorPhoneNumber: post.user.phone_number,
          authorCountry: post.user.country,
          authorPicture: post.user.profile_picture || 'defaultProfilePicture', // Fallback profile picture
          postDate: post.post_date,
          active: post.is_active,
        }));

        // Dispatch the posts to Redux store
        dispatch(setPosts(mappedPosts));
      } catch (error) {
        console.error('Failed to fetch all posts:', error);
      }
    };

    if (token) { // Ensure the token is available before making the request
      fetchAllPosts();
    }
  }, [dispatch, token]);


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
    <>
    <Navbar/>
    <Box mt={16} p={5}>
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
    </>
  );
}
export default Network;

