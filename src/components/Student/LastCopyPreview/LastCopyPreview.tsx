import React from 'react';
import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Text,
} from '@chakra-ui/react';
import { BsArrowRightShort } from 'react-icons/all';
import { EvaluationObject } from '../../../model/api';

interface ILastCopyPreviewProps {
    studentPreviewData: EvaluationObject | null;
}

const LastCopyPreview: React.FC<ILastCopyPreviewProps> = ({
    studentPreviewData,
}) => {
    return (
        <Flex
            direction='column'
            borderRadius='1rem'
            w='100%'
            padding='2rem'
            gap='1rem'
            bg='white'
            boxShadow='md'
            maxHeight='300px'
        >
            {null === studentPreviewData ? (
                <Spinner
                    alignSelf='center'
                    marginY='auto'
                    size='xl'
                />
            ) : (
                <>
                    <HStack columnGap={2}>
                        <Text
                            fontWeight='medium'
                            fontSize='xl'
                        >
                            Dernier quiz
                        </Text>
                        {/* Add link to copy page*/}
                        <Button
                            size='xs'
                            rightIcon={<BsArrowRightShort />}
                        >
                            Voir la copie
                        </Button>
                    </HStack>
                    <Flex
                        maxHeight='100%'
                        borderRadius='1rem'
                        border='1px solid'
                        borderColor='gray.100'
                        paddingX='2rem'
                        paddingY='1rem'
                        alignItems='center'
                    >
                        <Stat flex='1 1 0px'>
                            <StatLabel color='gray.600'>Placement</StatLabel>
                            <StatNumber fontSize='4xl'>
                                {studentPreviewData.studentCopy?.position} /{' '}
                                {studentPreviewData.evaluation?.copyCount}
                            </StatNumber>
                        </Stat>
                        <Stat
                            flex='1 1 0px'
                            color='gray.600'
                        >
                            <StatLabel>Note</StatLabel>
                            <StatNumber fontSize='4xl'>
                                {studentPreviewData.studentCopy?.score} /{' '}
                                {studentPreviewData.evaluation?.maxScore}
                            </StatNumber>
                        </Stat>
                        <Stat
                            flex='1 1 0px'
                            color='gray.600'
                        >
                            <StatLabel>Moyenne de la classe</StatLabel>
                            <StatNumber fontSize='4xl'>
                                {studentPreviewData.evaluation?.averageScore}/
                                {studentPreviewData.evaluation?.maxScore}
                            </StatNumber>
                        </Stat>
                        <Flex
                            direction='column'
                            flex='1 1 0px'
                            rowGap='1rem'
                        >
                            <Box>
                                <Text
                                    fontWeight='medium'
                                    color='gray.600'
                                >
                                    Evaluation
                                </Text>
                                <Text noOfLines={1}>
                                    {studentPreviewData.evaluation?.quiz.title}
                                </Text>
                            </Box>
                            <Divider orientation='horizontal' />
                            <Box>
                                <Text
                                    fontWeight='medium'
                                    color='gray.600'
                                >
                                    Formation
                                </Text>
                                <Text noOfLines={1}>
                                    {studentPreviewData.formation?.name}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default LastCopyPreview;
