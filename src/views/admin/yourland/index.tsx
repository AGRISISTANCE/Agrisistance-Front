// Chakra imports
import {  Flex, useColorModeValue } from '@chakra-ui/react';
import Profile from './Components/Profile';
import avatars from 'assets/img/avatars/avatars';
export default function Yourland() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Flex align='center' justify='center' width='100%' height='100%' mt='20rem'>
			<Profile avatar={avatars.avatar1} days='20' name='James belfort' suggestions='1' key={1} />
		</Flex>
	);
}
