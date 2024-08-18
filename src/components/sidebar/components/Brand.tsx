// Chakra imports
import { Flex } from '@chakra-ui/react';

// Custom components
import { AgrisistanceLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	// let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column' >
			<AgrisistanceLogo/>
			<HSeparator mb='20px' mt="20px" />
		</Flex>
	);
}

export default SidebarBrand;
