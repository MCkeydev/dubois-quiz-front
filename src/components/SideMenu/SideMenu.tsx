import React from 'react';
import { VStack } from '@chakra-ui/react';
import { UserType } from '../../types/interfaces';
import MenuLink from '../MenuLink/MenuLink';
import { HiViewGridAdd, Md2K, MdHome } from 'react-icons/all';

interface ISideMenuProps {
    user: UserType | null;
}

const SideMenu: React.FC<ISideMenuProps> = (props) => {
    return props.user ? (
        <VStack
            h='100vh'
            w='350px'
            bg='white'
            py='2rem'
            cursor='pointer'
            borderRight='1px solid'
            borderColor='gray.200'
        >
            <MenuLink
                icon={MdHome}
                allowedRoles={['ROLE_ELEVE', 'ROLE_FORMATEUR']}
                userRoles={props.user.roles}
                destination='accueil'
                childRoutes={[
                    {
                        icon: Md2K,
                        allowedRoles: ['ROLE_ELEVE'],
                        userRoles: props.user.roles,
                        destination: 'accueil/eleve',
                    },
                ]}
            />
            <MenuLink
                icon={HiViewGridAdd}
                allowedRoles={['ROLE_ELEVE']}
                userRoles={props.user.roles}
                destination='quizz'
            />
        </VStack>
    ) : null;
};

export default SideMenu;
