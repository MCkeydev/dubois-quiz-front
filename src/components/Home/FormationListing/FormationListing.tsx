import React from 'react';
import { Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { Formation } from '../../../model/api';
import { BsChevronRight } from 'react-icons/all';

interface IFormationListingProps {
    role: 'student' | 'teacher';
    formations: Array<Formation> | null;
}

const FormationListing: React.FC<IFormationListingProps> = (props) => {
    return (
        <Flex
            direction='column'
            borderRadius='1rem'
            w='100%'
            paddingX='2rem'
            paddingY='3rem'
            gap='1rem'
            bg='white'
            boxShadow='md'
        >
            <Text
                fontWeight='medium'
                fontSize='xl'
            >
                Vos formations
            </Text>
            {null !== props.formations ? (
                <Flex
                    direction='column'
                    rowGap='1rem'
                >
                    {props.formations.map((formation) => (
                        <HStack
                            key={formation.name}
                            border='1px solid'
                            borderColor='gray.200'
                            paddingX='3'
                            paddingY='4'
                            borderRadius='lg'
                            cursor='pointer'
                            transition='all .15s ease_in_out'
                            _hover={{
                                backgroundColor: 'gray.50',
                            }}
                        >
                            <Text noOfLines={1}>{formation.name}</Text>
                            <BsChevronRight />
                        </HStack>
                    ))}
                </Flex>
            ) : (
                <Spinner
                    alignSelf='center'
                    size='xl'
                    justifySelf='center'
                />
            )}
        </Flex>
    );
};

export default FormationListing;
