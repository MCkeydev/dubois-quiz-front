import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Divider, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BsChevronRight } from 'react-icons/all';

const EvaluationCopies: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [evaluationCopies, setEvaluationCopies] =
        React.useState<Array<any> | null>(null);

    React.useEffect(() => {
        const getEvaluationCopies = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/evaluation/${id}/copies`,
                    {
                        withCredentials: true,
                    },
                );
                setEvaluationCopies(response.data);
            } catch (exception) {
                navigate('/accueil');
            }
        };
        getEvaluationCopies();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            {null == evaluationCopies ? (
                <Spinner />
            ) : (
                <VStack>
                    {evaluationCopies.map((copy, index) => (
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
                                navigate(`/studentCopy/${copy.id}/grade`)
                            }
                        >
                            <VStack
                                whiteSpace='nowrap'
                                color='gray.400'
                                lineHeight='1'
                            >
                                <Text>
                                    {`${dayjs(copy.createdAt).format(
                                        'DD MMM YYYY',
                                    )}`}
                                </Text>
                            </VStack>
                            <Text noOfLines={1}>
                                {copy.student.name + ' ' + copy.student.surname}
                            </Text>
                            <Divider
                                orientation='vertical'
                                h='30px'
                            />
                            <BsChevronRight />
                        </HStack>
                    ))}
                </VStack>
            )}
        </Flex>
    );
};

export default EvaluationCopies;
