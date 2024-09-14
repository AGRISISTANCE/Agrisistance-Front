import React from 'react';
import { Box, Flex, Text, Image, Switch, useColorMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import avatar from "./avatar.png"
import { RootState } from '../../../redux/store'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {
const user = useSelector((state: RootState) => state.user);
const { colorMode, toggleColorMode } = useColorMode(); // Using Chakra UI's color mode for the toggle
const navigate = useNavigate(); // Initialize useNavigate

const handleSwitchClick = () => {
    navigate('/dashboard/plans');
  };

return (
    <Box
    position="fixed"
    top="0"
    right="0"
    width="82%"
    height="82px"
    backgroundColor="white"
    zIndex="1000"
    px={16}
    >
    <Flex
        align="right"
        justify="space-between"
        height="100%"
        padding="0 20px"
        boxSizing="border-box"
    >
        <Flex align="center">
        <Image
            src={user.profilePicture || avatar} // Adjust the path to the default avatar image
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
        <Flex align="center">
        <Text mr="10px" fontSize="md" fontWeight="bold" color="#2ACC32">
            {user.currentPlan === 'Basic' ? 'Free Mode' : 'Premium'}
        </Text>
        <Switch
            isChecked={user.currentPlan === 'premium'}
            onChange={handleSwitchClick} // You can replace this with an actual function to toggle plans
            colorScheme="teal"
        />
        </Flex>
    </Flex>
    </Box>
);
};

export default Navbar;
