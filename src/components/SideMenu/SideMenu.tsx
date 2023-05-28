import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { UserType } from '../../types/interfaces';
import MenuLink from '../MenuLink/MenuLink';
import {
    BiLogOut,
    HiViewGridAdd,
    MdHome,
    MdOutlineDocumentScanner,
} from 'react-icons/all';

interface ISideMenuProps {
    user: UserType | null;
}

const SideMenu: React.FC<ISideMenuProps> = (props) => {
    return props.user ? (
        <Flex
            direction='column'
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
            />
            <MenuLink
                icon={MdOutlineDocumentScanner}
                allowedRoles={['ROLE_ELEVE']}
                userRoles={props.user.roles}
                destination='copies'
            />
            <MenuLink
                icon={HiViewGridAdd}
                allowedRoles={['ROLE_FORMATEUR']}
                userRoles={props.user.roles}
                destination='/quiz/create'
                label='Créer un quiz'
            />
            <MenuLink
                icon={HiViewGridAdd}
                allowedRoles={['ROLE_FORMATEUR']}
                userRoles={props.user.roles}
                destination='/evaluation/create'
                label='Créer une évaluation'
            />
            <MenuLink
                icon={HiViewGridAdd}
                allowedRoles={['ROLE_FORMATEUR']}
                userRoles={props.user.roles}
                destination='/evaluations/incoming'
                label='Modifier evaluations'
            />
            <Box marginTop='auto'>
                <MenuLink
                    allowedRoles={['ROLE_ELEVE', 'ROLE_FORMATEUR']}
                    userRoles={props.user.roles}
                    destination='logout'
                    icon={BiLogOut}
                />
            </Box>
        </Flex>
    ) : null;
};

export default SideMenu;
