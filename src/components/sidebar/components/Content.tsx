import React from 'react';
// chakra imports
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react';
//   Custom components
import Brand from './Brand';
import Links from './Links';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../../redux/actionTypes';

// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
  const { routes } = props;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    window.location.href = '/'; // Redirect to homepage
  };  

  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mt='8px' mb='auto'>
        <Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
          <Links routes={routes} />
          <Flex
            color={'#8f9bba'}
            align={'center'}
            padding='5px 10px'
            gap={'20px'}
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            <Icon as={MdLogout} width="20px" height="20px" color="inherit" />
            <Text color={'#8f9bba'}>Disconnect</Text>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
