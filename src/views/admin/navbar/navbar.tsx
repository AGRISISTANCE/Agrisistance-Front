import React from 'react';
import { Box, Flex, Text, Image, Switch, useColorMode, Icon, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import avatar from "./avatar.png"
import { RootState } from '../../../redux/store'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { SidebarResponsive } from '../../../components/sidebar/Sidebar';
import routes from '../../../routes';


const Navbar: React.FC = () => {
const user = useSelector((state: RootState) => state.user);
const navigate = useNavigate(); // Initialize useNavigate

const handleSwitchClick = () => {
    navigate('/dashboard/plans');
  };


return (
    <Box
  position="fixed"
  top="0"
  right="0"
  width={{ base: '100%', md: '100%', xl: '83%' }}
  height="82px"
  backgroundColor="white"
  zIndex="5"
  px={16}
>
  <Flex
    align={{base:"right", md:"center"}}
    justify={{ base: 'space-between', md: 'space-between' }} // Space between on small screens, align right on medium/large
    height="100%"
    padding="0 20px"
    boxSizing="border-box"
  >
    <SidebarResponsive routes={routes} />
    
    <Flex align="center" ml='0'> {/* Add margin to push elements */}
      <Image
        src={user.profilePicture || avatar} 
        alt={`${user.firstName} ${user.lastName}`}
        borderRadius="full"
        boxSize="50px"
        objectFit="cover"
        mr="10px"
      />
      <Text fontWeight="bold" fontSize="lg">
        {user.firstName} {user.lastName}
      </Text>
    </Flex>
    
    <Flex align="center" ml={{ base: '0', md: '20px' }}> {/* Adjust margin for spacing */}
      <Text mr="10px" fontSize="md" fontWeight="bold" color="#2ACC32">
        {user.currentPlan === 'Basic' ? 'Free Mode' : 'Premium'}
      </Text>
      <Switch
        isChecked={user.currentPlan === 'premium'}
        onChange={handleSwitchClick}
        colorScheme="teal"
      />
    </Flex>
  </Flex>
</Box>

);
};

export default Navbar;
