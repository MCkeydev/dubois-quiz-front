import React, { useEffect, useState } from 'react';
import { StudentAnswer, StudentCopy } from '../../model/api';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Code,
    Flex,
    Heading,
    Spacer,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';

const DetailedGradedCopy: React.FC = () => {
    // Utilisation de hooks react
    const [copy, setCopy] = useState<StudentCopy | null>(null);

    // Utilisation de hooks react-router-dom
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentCopies = async () => {
            try {
                const response = await axios.get<StudentCopy>(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/studentCopy/${id}/graded`,
                    {
                        withCredentials: true,
                    },
                );
                setCopy(response.data);
            } catch (error) {
                console.log('Error fetching student copies:', error);
                navigate('/accueil');
            }
        };

        fetchStudentCopies();
    }, []);

    console.log(copy);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            {null === copy ? (
                <Spinner />
            ) : (
                <Box
                    p='2rem'
                    borderRadius='1rem'
                    bg='white'
                    boxShadow='md'
                >
                    <Flex>
                        <VStack
                            alignItems='start'
                            pb='2rem'
                            gap='1rem'
                        >
                            <Heading size='sm'>
                                Quiz : {copy.evaluation.quiz.title}
                            </Heading>
                            <VStack
                                alignItems='start'
                                border='1px solid'
                                p='1rem'
                                borderRadius='8px'
                                borderColor='gray.200'
                            >
                                <Text
                                    color='gray.900'
                                    fontWeight='medium'
                                >
                                    Note : {copy.score} /{' '}
                                    {copy.evaluation.quiz.maxScore}
                                </Text>
                                <Text fontWeight='medium'>Appréciation:</Text>
                                <Text pb='1rem'>{copy.commentary}</Text>

                                <Text color='gray.600'>
                                    Position : {copy.position} /{' '}
                                    {copy.evaluation?.copyCount}
                                </Text>
                                <Text color='gray.600'>
                                    Note moyenne :{' '}
                                    {copy.evaluation.averageScore} /{' '}
                                    {copy.evaluation.quiz.maxScore}
                                </Text>
                            </VStack>
                        </VStack>

                        <Spacer />
                        <VStack
                            alignItems='flex-end'
                            maxW='25%'
                        >
                            <Heading
                                fontSize='sm'
                                color='gray.600'
                            >
                                Formation
                            </Heading>
                            <Text size='sm'>
                                {copy.evaluation.formation &&
                                    copy.evaluation.formation.name}
                            </Text>
                        </VStack>
                    </Flex>
                    {copy.studentAnswers.map((answer: StudentAnswer, index) => (
                        <Box
                            key={index}
                            paddingLeft='1rem'
                            py='1rem'
                            mb='2rem'
                            borderLeft='1px solid'
                            borderColor='gray.200'
                        >
                            <VStack alignItems='start'>
                                <Text fontWeight='medium'>Question :</Text>
                                <Text
                                    pb='1rem'
                                    pl='0.5rem'
                                >
                                    {answer.question.title}
                                </Text>
                            </VStack>
                            <VStack alignItems='start'>
                                <Text fontWeight='medium'>Réponse : </Text>
                                <Code>
                                    {answer.answer || answer.choice?.title}
                                </Code>
                            </VStack>
                            <Text mt='1rem'>
                                <strong>Note :</strong> {answer.score} /{' '}
                                {answer.question.maxScore}
                            </Text>
                            <Text>
                                <strong>Annotation :</strong>{' '}
                                {answer.annotation}
                            </Text>
                        </Box>
                    ))}
                </Box>
            )}
        </Flex>
    );
};

export default DetailedGradedCopy;
