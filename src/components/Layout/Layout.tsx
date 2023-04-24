import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';
import { useAppSelector } from '../../store/hooks';

const Layout: React.FC = () => {
    // Fetches user from redux
    const user = useAppSelector((state) => state.user.user);

    return (
        <HStack w='100%'>
            <SideMenu user={user} />
            <Box
                h='100vh'
                maxH='100vh'
                overflow='auto'
                w='100%'
                background='#FBFBFB'
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
