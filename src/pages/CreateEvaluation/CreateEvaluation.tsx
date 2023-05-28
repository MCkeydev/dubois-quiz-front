import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Text,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Formation, Quiz } from '../../model/api';

// Define Zod validation schema
const evaluationSchema = z
    .object({
        quiz: z.number().positive(),
        formation: z.number().positive(),
        startsAt: z
            .date()
            .refine((date) => date >= new Date(), {
                message:
                    'La date de début doit être ultérieure à la date actuelle.',
            })
            .transform((date) => date.toISOString()),
        endsAt: z
            .date()
            .refine((date) => date >= new Date(), {
                message:
                    'La date de fin doit être ultérieure à la date actuelle.',
            })
            .transform((date) => date.toISOString()),
    })
    .refine((data) => data.endsAt >= data.startsAt, {
        message: 'La date de fin doit être ultérieure à la date de début.',
        path: ['endsAt'],
    });

const CreateEvaluation: React.FC = () => {
    const [quizzes, setQuizzes] = React.useState<Array<Quiz> | null>(null);
    const [formations, setFormations] = React.useState<Array<Formation> | null>(
        null,
    );
    const navigate = useNavigate();

    // Use useForm with zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(evaluationSchema),
    });

    React.useEffect(() => {
        const fetchSelectData = async () => {
            try {
                const quizResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/quizzes`,
                    { withCredentials: true },
                );
                setQuizzes(quizResponse.data);

                const formationsResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/formations`,
                    { withCredentials: true },
                );
                setFormations(formationsResponse.data);
            } catch (exception) {
                setQuizzes([]);
                setFormations([]);
            }
        };
        fetchSelectData();
    }, []);

    // Utilisation de hooks chakra-ui
    const toast = useToast();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/evaluation/create`,
                data,
                { withCredentials: true },
            );

            // Affichage du Toast après la création de l'évaluation
            toast({
                title: 'Evaluation créée',
                description: 'Votre évaluation a été créée avec succès.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/accueil');
        } catch (exception) {
            console.error('something went wrong');
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
            <Box
                display='flex'
                flexDirection='column'
                alignItems='start'
                rowGap='1rem'
                p='2rem'
                borderRadius='1rem'
                bg='white'
                boxShadow='md'
            >
                {null === quizzes || null === formations ? (
                    <Spinner />
                ) : quizzes.length === 0 || formations.length === 0 ? (
                    <Text>
                        {' '}
                        Vous n&apos;avez pas de quiz/formation, revenez plus
                        tard.
                    </Text>
                ) : (
                    <>
                        <Heading>Créer une évaluation</Heading>
                        <FormControl>
                            <FormLabel>Quiz</FormLabel>
                            <Select
                                {...register('quiz', { valueAsNumber: true })}
                            >
                                {quizzes.map((quiz, index) => (
                                    <option
                                        key={index}
                                        value={quiz.id}
                                    >
                                        {quiz.title}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Formation</FormLabel>
                            <Select
                                {...register('formation', {
                                    valueAsNumber: true,
                                })}
                            >
                                {formations.map((formation, index) => (
                                    <option
                                        key={index}
                                        value={formation.id}
                                    >
                                        {formation.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors.startsAt)}>
                            <FormLabel>Date de début</FormLabel>
                            <Input
                                placeholder='Date de début'
                                size='md'
                                type='datetime-local'
                                {...register('startsAt', { valueAsDate: true })}
                            />
                            <FormErrorMessage>
                                {errors.startsAt &&
                                    (errors.startsAt.message as string)}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors.endsAt)}>
                            <FormLabel>Date de fin</FormLabel>
                            <Input
                                placeholder='Date de fin'
                                size='md'
                                type='datetime-local'
                                {...register('endsAt', { valueAsDate: true })}
                            />
                            <FormErrorMessage>
                                {errors.endsAt &&
                                    (errors.endsAt.message as string)}
                            </FormErrorMessage>
                        </FormControl>
                        <Button onClick={onSubmit}>
                            Créer l&apos;évaluation
                        </Button>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default CreateEvaluation;
