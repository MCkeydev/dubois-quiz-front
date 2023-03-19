import React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
	return (
		<HStack w="100%">
			<VStack
				h="100vh"
				w="350px"
				bg="white"
				borderRight="2px solid"
				borderColor="lightgrey"
			/>
			<Box
				h="100vh"
				maxH="100vh"
				overflow="auto"
				w="100%"
				bg="whitesmoke"
				style={{
					marginLeft: 0,
				}}
			>
				<Outlet />
			</Box>
		</HStack>
	);
};

export default Layout;
