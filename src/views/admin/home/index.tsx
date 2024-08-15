// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';
import Profile from './components/Profile';
import avatars from 'assets/img/avatars/avatars';
import Land from './components/Land';
import { Text } from '@chakra-ui/react';
export default function Home() {
	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Flex direction='column'>
			<Flex align='center' justify='center' width='100%' height='100%' justifyContent='space-around'>
				<Profile avatar={avatars.avatar1} days='20' name='James belfort' suggestions='1' />
				<Flex direction='column' gap='10px'>
					<Text color='#218225' textAlign='center' fontWeight='bold' fontSize='30px'>Selected Lands</Text>
					<Land name="Land1" coordinates={['41.40338', '2.17403']} select={false} />
				</Flex>
			</Flex>
			<Text color='#218225' fontWeight='bold' fontSize='30px' ml='20px'>Other</Text>
			<Flex wrap='wrap' gap='40px' padding='40px'>
				<Land isNew={true} />
				<Land name="Land1" coordinates={['41.40338', '2.17403']} select={true} />
				<Land name="Land1" coordinates={['41.40338', '2.17403']} select={true} />
			</Flex>
		</Flex>
	);
}
