import React from 'react';
import { Box, Flex, Text, Image, Switch, useColorMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import avatar from "./avatar.png"
import { RootState } from '../../../redux/store'; // Adjust the path as necessary

const Navbar: React.FC = () => {
const user = useSelector((state: RootState) => state.user);
const { colorMode, toggleColorMode } = useColorMode(); // Using Chakra UI's color mode for the toggle

return (
    <Box
    position="fixed"
    top="0"
    right="0"
    width="80%"
    height="84px"
    backgroundColor="white"
    zIndex="1000"
    >
    <Flex
        align="center"
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
        <Text mr="10px" fontSize="md">
            {user.currentPlan === 'Basic' ? 'Free Mode' : 'Premium'}
        </Text>
        <Switch
            isChecked={user.currentPlan === 'premium'}
            onChange={toggleColorMode} // You can replace this with an actual function to toggle plans
            colorScheme="teal"
        />
        </Flex>
    </Flex>
    </Box>
);
};

export default Navbar;
