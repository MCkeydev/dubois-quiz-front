import React from 'react';
import { Box, Collapse, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { NavLink, useMatch } from 'react-router-dom';
import Tools from '../../Utils';
import styles from './MenuLink.css';
import { BsArrow90DegUp } from 'react-icons/all';

interface ISideMenuProps {
    allowedRoles: Array<string>;
    userRoles: Array<string>;
    destination: string;
    icon: React.ElementType;
    childRoutes?: Array<ISideMenuProps>;
}

const MenuLink: React.FC<ISideMenuProps> = ({
    allowedRoles,
    userRoles,
    ...props
}) => {
    const isLocationMatching = useMatch(props.destination);

    return allowedRoles.some((item) => userRoles.includes(item)) ? (
        <>
            {/*// Display link : always selected when clicking (the real links are*/}
            {/*in the collapse)*/}
            <Flex
                to={props.destination}
                as={NavLink}
                w='100%'
                py='1rem'
                px='2rem'
                alignItems='center'
                gap='1rem'
                color='gray.600'
                position='relative'
                fontWeight='medium'
                _hover={styles.displayLinkHover}
                sx={styles.displayLink}
            >
                <Icon
                    as={props.icon}
                    w='1.4rem'
                    h='1.4rem'
                />
                <Text>{Tools.capitalize(props.destination)}</Text>
            </Flex>
            <Box
                in={null !== isLocationMatching}
                as={Collapse}
            >
                <Flex
                    direction='column'
                    gap='0.5rem'
                >
                    <HStack>
                        <Icon
                            as={BsArrow90DegUp}
                            transform='rotate(90deg) scale(-1, 1)'
                        />
                        <Box
                            as={NavLink}
                            to='/accueil'
                            sx={styles.nestedLinkActive}
                        >
                            Tableau de bord
                        </Box>
                    </HStack>
                    <HStack>
                        <Icon
                            as={BsArrow90DegUp}
                            transform='rotate(90deg) scale(-1, 1)'
                        />
                        <Box
                            as={NavLink}
                            to='/accueil'
                            sx={styles.nestedLinkActive}
                        >
                            Tableau de bord
                        </Box>
                    </HStack>
                </Flex>
            </Box>
        </>
    ) : null;
};

export default MenuLink;
