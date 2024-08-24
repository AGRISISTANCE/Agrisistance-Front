import React from 'react';
// chakra imports
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react';
//   Custom components
import Brand from './Brand';
import Links from './Links';
import { MdLogout } from 'react-icons/md';
//import { redirect } from 'react-router-dom';

// FUNCTIONS

function SidebarContent(props: { routes: RoutesType[] }) {
	const { routes } = props;
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<Links routes={routes} />
					<a href='/'><Flex color={'#8f9bba'} align={'center'} padding='5px 10px' gap={'20px'}><Icon as={MdLogout} width="20px" height="20px" color="inherit" /><Text color={'#8f9bba'}> Disconnect</Text></Flex></a>
				</Box>
			</Stack>
		</Flex>
	);
}

export default SidebarContent;
