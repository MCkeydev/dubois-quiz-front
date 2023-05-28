import React from 'react';
import {
    Divider,
    Flex,
    Heading,
    HStack,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { BsChevronRight } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';

const Teacher: React.FC = () => {
    const navigate = useNavigate();
    const [evaluationsToGrade, setEvaluationsToGrade] =
        React.useState<Array<any> | null>(null);

    React.useEffect(() => {
        const fetchEvaluationsToGrade = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/home`,
                    {
                        withCredentials: true,
                    },
                );
                setEvaluationsToGrade(response.data);
            } catch (exception) {
                setEvaluationsToGrade([]);
            }
        };

        fetchEvaluationsToGrade();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            <Heading>Accueil formateur</Heading>
            {null === evaluationsToGrade ? (
                <Spinner />
            ) : evaluationsToGrade.length === 0 ? (
                <Text> Vous n&apos;avez aucune évaluation à noter.</Text>
            ) : (
                <VStack>
                    {evaluationsToGrade.map((evaluation, index) => (
                        <HStack
                            key={index}
                            border='1px solid'
                            borderColor='gray.200'
                            paddingX='3'
                            paddingY='4'
                            borderRadius='lg'
                            cursor='pointer'
                            transition='all .15s ease_in_out'
                            columnGap='2rem'
                            _hover={{
                                backgroundColor: 'gray.50',
                            }}
                            onClick={() =>
                                navigate(`/evaluation/${evaluation.id}/copies`)
                            }
                        >
                            <VStack
                                whiteSpace='nowrap'
                                color='gray.400'
                                lineHeight='1'
                            >
                                <Text>
                                    {`Du ${dayjs(evaluation.startsAt).format(
                                        'DD MMM YYYY',
                                    )}`}
                                </Text>
                                <Text>
                                    {`au ${dayjs(evaluation.endsAt).format(
                                        'DD MMM YYYY',
                                    )}`}
                                </Text>
                            </VStack>
                            <Text noOfLines={1}>{evaluation.quiz.title}</Text>
                            <Divider
                                orientation='vertical'
                                h='30px'
                            />
                            <Text
                                fontWeight='medium'
                                color='gray.600'
                            >
                                Formation
                            </Text>
                            <VStack>
                                <Text noOfLines={1}>
                                    {evaluation?.formation?.name ?? ''}
                                </Text>
                            </VStack>
                            <BsChevronRight />
                        </HStack>
                    ))}
                </VStack>
            )}
        </Flex>
    );
};

export default Teacher;
