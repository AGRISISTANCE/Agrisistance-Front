import { useSelector } from 'react-redux';
import { Flex, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserInfo}  from '../../../redux/userSlice';
import React from 'react';

export default function HeaderLinks(props: { secondary: boolean }) {
	const user = useSelector((state: any) => state.user) as UserInfo;
	let menuBg = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const navigate = useNavigate();

	const toggleSelect = () => {
		if (user.currentPlan === 'free') {
			// Dispatch action to update plan to 'premium'
			// dispatch(updateUserPlan('premium'));
		} else {
			// Dispatch action to update plan to 'free'
			// dispatch(updateUserPlan('free'));
		}
	};

	return (
		<Flex
			w={{ sm: 'fit-content', md: 'fit-content' }}
			alignItems='center'
			alignSelf={'end'}
			flexDirection='row'
			bg={menuBg}
			flexWrap={props.secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p='10px'
			borderRadius='30px'
			boxShadow={shadow}>
			<Flex
				borderRadius="40px"
				fontWeight="normal"
				onClick={toggleSelect}
				bg="#f5f5f5"
				border={'2px solid #f5f5f5'}
				cursor={'pointer'}
				width={'fit-content'}>
				<Text
					style={{
						borderRadius: '40px',
						background: user.currentPlan === 'premium' ? '#fff' : '#f5f5f5',
						color: user.currentPlan === 'premium' ? '#218225' : '#858585',
						padding: '10px'
					}}
					fontSize={'md'}
					onClick={() => navigate('/dashboard/plans')}>
					Premium
				</Text>
				<Text
					style={{
						borderRadius: '40px',
						background: user.currentPlan === 'free' ? '#fff' : '#f5f5f5',
						color: user.currentPlan === 'free' ? '#218225' : '#858585',
						padding: '10px'
					}}
					fontSize={'md'}
					onClick={() => navigate('/dashboard/plans')}>
					Free mode
				</Text>
			</Flex>
			<Menu>
				<MenuButton p='0px'>
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color='white'
						name={`${user.firstName} ${user.lastName}`}
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
							fontSize='sm'
							fontWeight='700'
							color='gray.700'>
							👋&nbsp; Hi, {user.firstName}
						</Text>
					</Flex>
					<Flex flexDirection='column' p='10px'>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} onClick={() => navigate('/dashboard/profile')} borderRadius='8px' px='14px'>
							<Text fontSize='sm'>Profile Settings</Text>
						</MenuItem>
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color='red.400'
							borderRadius='8px'
							px='14px'
							onClick={() => navigate('/')}>
							<Text fontSize='sm'>Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}
