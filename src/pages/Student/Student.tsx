import React from 'react';
import {
    Box,
    Divider,
    Flex,
    Stat,
    StatLabel,
    StatNumber,
    Text,
} from '@chakra-ui/react';

const Student: React.FC = () => {
    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            bg='white'
        >
            <Flex
                direction='column'
                borderRadius='1rem'
                border='1px solid'
                borderColor='gray.100'
                w='100%'
                padding='2rem'
                gap='1rem'
            >
                <Text
                    fontWeight='medium'
                    fontSize='xl'
                >
                    Dernier quiz
                </Text>
                <Flex
                    borderRadius='1rem'
                    border='1px solid'
                    borderColor='gray.100'
                    padding='2rem'
                    alignItems='center'
                >
                    <Stat>
                        <StatLabel>Placement</StatLabel>
                        <StatNumber fontSize='4xl'>6</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Note</StatLabel>
                        <StatNumber fontSize='4xl'>14/20</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Moyenne de la classe</StatLabel>
                        <StatNumber fontSize='4xl'>7.87/20</StatNumber>
                    </Stat>
                    <Box>
                        <Text fontWeight='medium'>Quiz</Text>
                        <Text>Nom du quiz</Text>
                    </Box>
                    <Divider orientation='vertical' />
                    <Box>
                        <Text fontWeight='medium'>Formation</Text>
                        <Text>Intitulé de la formation</Text>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Student;
