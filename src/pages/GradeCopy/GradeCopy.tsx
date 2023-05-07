import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Code,
    Flex,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spinner,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const GradeCopy: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [copy, setCopy] = React.useState<any | null>(null);

    React.useEffect(() => {
        const getCopy = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/studentCopy/${id}`,
                    {
                        withCredentials: true,
                    },
                );
                setCopy(response.data);
            } catch (exception) {
                navigate('/accueil');
            }
        };

        getCopy();
    }, []);

    const { register, control, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        const dataEntries = Object.entries(data).filter(
            (item) => item[0] !== 'commentary',
        );
        console.log(dataEntries);

        const apiData = {
            commentary: data.commentary,
            answers: dataEntries.map((key) => ({
                answerId: Number(key[0].split('-')[1]),
                annotation: key[1].annotation,
                score: Number(key[1].score),
            })),
        };

        try {
            const response = await axios.put(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/evaluation/studentCopy/${id}/grade`,
                apiData,
                { withCredentials: true },
            );

            navigate('/accueil');
        } catch (e) {
            console.error('une erreur est survenue');
        }
    });

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
                    <Heading
                        size='sm'
                        pb='2rem'
                    >
                        Copie de :{' '}
                        {copy.student.name + ' ' + copy.student.surname}
                    </Heading>
                    {copy.studentAnswers.map((answer: any, index: number) => (
                        <>
                            <Box
                                paddingLeft='1rem'
                                py='1rem'
                                mb='2rem'
                                borderLeft='1px solid'
                                borderColor='gray.200'
                            >
                                <Text pb='1rem'>{answer.question.title}</Text>
                                <Code>
                                    {answer.answer ?? answer.choice.title}
                                </Code>
                                <Text mt='1rem'>
                                    {`Points (sur ${answer.question.maxScore}) :`}
                                </Text>
                                <NumberInput
                                    mt='1rem'
                                    min={0}
                                    max={answer.question.maxScore}
                                    size='md'
                                    maxW={24}
                                    {...register(`answer-${answer.id}.score`, {
                                        required: true,
                                    })}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Textarea
                                    mt='1rem'
                                    placeholder='Commentez la réponse'
                                    {...register(
                                        `answer-${answer.id}.annotation`,
                                        { required: true },
                                    )}
                                />
                            </Box>
                        </>
                    ))}
                    <Text pb='0.5rem'>Commentaire de la copie :</Text>
                    <Textarea {...register('commentary', { required: true })} />
                    <Button
                        onClick={onSubmit}
                        mt='2rem'
                    >
                        Valider la correction
                    </Button>
                </Box>
            )}
        </Flex>
    );
};

export default GradeCopy;
