import React from 'react';
import { Flex } from '@chakra-ui/react';

const IncomingQuizzes: React.FC = () => {
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
        ></Flex>
    );
};

export default IncomingQuizzes;
