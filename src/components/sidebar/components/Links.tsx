import React from 'react';
/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

interface RouteType {
	name: string;
	layout: string;
	path: string;
	icon?: React.ReactNode;
}

export function SidebarLinks(props: { routes: RouteType[] }) {
	// Chakra color mode
	const location = useLocation();
	const activeColor = useColorModeValue('gray.700', 'white');
	const inactiveColor = useColorModeValue('secondaryGray.600', 'secondaryGray.600');
	const activeIcon = useColorModeValue('brand.500', 'white');
	const textColor = useColorModeValue('secondaryGray.500', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');

	const { routes } = props;

	// Checks if the current route matches the location pathname
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// Creates the links for each route
		const createLinks = (routes: RouteType[]) => {
			return routes.map((route: RouteType, index: number) => {
			const isExcludedRoute =
				route.path === '/signup' ||
				route.path === '/login' ||
				route.path === '/profile/email-updated-successfully' ||
				route.path === '/email-verified-successfully' ||
				route.path === '/profile/email-verified' ||
				route.path.startsWith('/reset-password') ||
				route.path === '/forgot-password';
		
			if (
				(route.layout === '/dashboard' || route.layout === '/auth' || route.layout === '/rtl') &&
				!isExcludedRoute
			) {
				return (
				<NavLink key={index} to={route.layout + route.path}>
					{route.icon ? (
					<Box>
						<HStack
						spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
						py="5px"
						ps="10px"
						>
						<Flex w="100%" alignItems="center" justifyContent="center">
							<Box color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor} me="18px">
							{route.icon}
							</Box>
							<Text
							me="auto"
							color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
							fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
							>
							{route.name}
							</Text>
						</Flex>
						<Box
							h="36px"
							w="4px"
							bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
							borderRadius="5px"
						/>
						</HStack>
					</Box>
					) : (
					<Box>
						<HStack
						spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
						py="5px"
						ps="10px"
						>
						<Text
							me="auto"
							color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
							fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}
						>
							{route.name}
						</Text>
						<Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
						</HStack>
					</Box>
					)}
				</NavLink>
				);
			}
			return null; // Ensure a valid return for routes that do not match the criteria
			});
		};


	// Render the created links
	return <>{createLinks(routes)}</>;
}

export default SidebarLinks;
