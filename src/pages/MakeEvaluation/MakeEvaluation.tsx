import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Evaluation } from '../../model/api';

const MakeEvaluation: React.FC = () => {
    // Use of react-router hook
    const { id: evaluationId } = useParams();

    const [evaluaton, setEvaluation] = React.useState<Evaluation | null>(null);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            hello
        </Flex>
    );
};

export default MakeEvaluation;

lty=)àertyùmc b