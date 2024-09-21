// components/Network.tsx
import React, { useEffect, useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Button } from '@chakra-ui/react';
import AllPosts from './components/AllPosts';
import MyPosts from './components/MyPosts';
import { apiCall } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { persistor } from '../../../redux/store';
import Navbar from '../navbar/navbar';
import { setPosts } from '../../../redux/postsSlice';
import images from '../../../layouts/admin/onboarding/images'; //import images for onboarding
import { useLocation, useNavigate } from 'react-router-dom';
import Tour from 'reactour';


const Network: React.FC = () => {

  const token = useSelector((state: RootState) => state.token.token); // Assuming you store the token in Redux
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('All Posts');

  // ! DONT TOUCH! Added just to solve some problem
  // useEffect(() => {
  //   // Purge persisted state on component mount
  //   persistor.purge();
  // }, []);

  const [loading, setLoading] = useState(true);

  //Get all posts from backend
  //! COMMENT when using dummy data
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true); // Start loading
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
      }finally {
        setLoading(false); // End loading
      }
    };

    if (token) { // Ensure the token is available before making the request
      fetchAllPosts();
    }
  }, [dispatch, token]);



  const [showOnboarding, setShowOnboarding] = useState(false);

		const location = useLocation();
		const navigate = useNavigate();
		const steps = [
      {
        selector: '',
        content: (
          <div>
            <p>Explore opportunities in the network section.</p>
          </div>
        ),
      },
      {
        selector: '.navbar',
        content: (
          <div>
            <p>Navigate through specific categories or view your own posts.</p>
          </div>
        ),
      },
      {
        selector: '',
        content: (
          <div>
            <p>View all posts in the network.</p>
            <img src={images.yourNetworkAllPosts} alt="All Posts" style={{ width: '600px', height: 'auto' }} />
          </div>
        ),
      },
      {
        selector: '',
        content: (
          <div>
            <p>Check out your own posts here.</p>
            <img src={images.yourNetworkMyPosts} alt="My Posts" style={{ width: '600px', height: 'auto' }} />
          </div>
        ),
      },
      {
        selector: '',
        content: (
          <div className='flex justify-center items-center'>
            <h5>You are ready to go farmer! Best of luck in your journey.🚜🌾</h5>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <Button p={4} m={4} bg={'#2BCC33'} color={'white'} onClick={() => navigate('/dashboard/home/*')}>
						Go to Home page
            </Button>
          </div>
        ),
      }
    ];
    
	
		useEffect(() => {
		if (location.pathname === '/dashboard/network/onboarding') {
			setTimeout(() => {
			setShowOnboarding(true);
			}, 500); // Adjust the delay as needed
		} else {
			setShowOnboarding(false);
		}
		}, [location.pathname]);
	



  const renderContent = () => {
    switch (activeSection) {
      case 'All Posts':
        return <AllPosts loading={loading}/>;
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
      <Flex className='navbar' gap='40px' mb={4}>
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
    {showOnboarding && (
			<Tour
			steps={steps}
			isOpen={showOnboarding}
			onRequestClose={() => setShowOnboarding(false)}
			rounded={5} // Customize tooltip style
			accentColor="#5cb85c" // Customize accent color
			/>
		)}
    </>
  );
}
export default Network;

