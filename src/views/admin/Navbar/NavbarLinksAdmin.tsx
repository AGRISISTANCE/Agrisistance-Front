
// Chakra Imports
import {
	Avatar,
//	Button,
	Flex,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SearchBar } from './SearchBar/SearchBar';
//import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
// Assets
import { MdNotificationsNone } from 'react-icons/md';
//import routes from 'routes';
export default function HeaderLinks(props: { secondary: boolean }) {
	const { secondary } = props;
	// Chakra Color Mode
//	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const [selected, setSelect] = useState(1);
	const toggleSelect = () => {
		if (selected === 1) {
			setSelect(2);
		} else {
			setSelect(1);
		}
	};

	return (
		<Flex
			w={{ sm: 'fit-content', md: 'fit-content' }}
			alignItems='center'
			alignSelf={'end'}
			flexDirection='row'
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			borderRadius='30px'
			boxShadow={shadow}>
			<SearchBar
				mb={() => {
					if (secondary) {
						return { base: '10px', md: 'unset' };
					}
					return 'unset';
				}}
				me='10px'
				borderRadius='30px'
			/>
			{/* <SidebarResponsive routes={routes} /> */}
			<Flex
				borderRadius="40px"
				fontWeight="normal"
				onClick={toggleSelect}
				bg="#f5f5f5"
				// padding="10px"
				border={'2px solid #f5f5f5'}
				cursor={'pointer'}
				width={'fit-content'}
			>
				<Text
					style={{
						borderRadius: '40px',
						background: selected === 2 ? '#fff' : '#f5f5f5',
						color: selected === 2 ? '#218225' : '#858585',
						padding: '10px'
					}}
					fontSize={'md'}
				>
					Premium
				</Text>
				<Text
					style={{
						borderRadius: '40px',
						background: selected === 1 ? '#fff' : '#f5f5f5',
						color: selected === 1 ? '#218225' : '#858585',
						padding: '10px'
					}}
					fontSize={'md'}

				>
					Free mode
				</Text>
			</Flex>

			<Menu>
				<MenuButton p='0px'>
					<Icon mt='6px' as={MdNotificationsNone} color={'navbarIcon'} w='18px' h='18px' me='10px' />
				</MenuButton>
				<MenuList
					boxShadow={shadow}
					p='20px'
					borderRadius='20px'
					bg={menuBg}
					border='none'
					mt='22px'
					me={{ base: '30px', md: 'unset' }}
					minW={{ base: 'unset', md: '400px', xl: '450px' }}
					maxW={{ base: '360px', md: 'unset' }}>
					<Flex w='100%' mb='20px'>
						<Text fontSize='md' fontWeight='600' color={textColor}>
							Notifications
						</Text>
						<Text fontSize='sm' fontWeight='500' color={textColorBrand} ms='auto' cursor='pointer'>
							Mark all read
						</Text>
					</Flex>
					<Flex flexDirection='column'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='New update in agrisistance PRO' />
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px='0' borderRadius='8px' mb='10px'>
							<ItemContent info='Agrisistance System Free' />
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>

			<Menu>
				<MenuButton p='0px'>
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color='white'
						name='Adela Parkson'
						bg='#2acc32'
						size='sm'
						w='40px'
						h='40px'
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
					<Flex w='100%' mb='0px'>
						<Text
							ps='20px'
							pt='16px'
							pb='10px'
							w='100%'
							borderBottom='1px solid'
							borderColor={borderColor}
							fontSize='sm'
							fontWeight='700'
							color={textColor}>
							👋&nbsp; Hey, Adela
						</Text>
					</Flex>
					<Flex flexDirection='column' p='10px'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
							<Text fontSize='sm'>Profile Settings</Text>
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius='8px' px='14px'>
							<Text fontSize='sm'>Newsletter Settings</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color='red.400'
							borderRadius='8px'
							px='14px'>
							<Text fontSize='sm'>Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};