import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { z } from 'zod';
import { Evaluation } from '../../model/api';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

// Define Zod validation schema
const evaluationSchema = z
    .object({
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

const UpcomingEvaluations: React.FC = () => {
    const [evaluations, setEvaluations] = useState<Array<Evaluation> | null>(
        null,
    );
    const [selectedEvaluation, setSelectedEvaluation] =
        useState<Evaluation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(evaluationSchema),
    });

    const handleOpenModal = (evaluation: Evaluation) => {
        setSelectedEvaluation(evaluation);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEvaluation(null);
        setIsModalOpen(false);
    };

    const onSubmit = async (data: any) => {
        const id = selectedEvaluation?.id;

        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/evaluation/${id}`,
                data,
                { withCredentials: true },
            );

            // Affichage du Toast après la modification de l'évaluation
            toast({
                title: 'Evaluation reprogrammée.',
                description:
                    'Les dates de début et de fin ont bien été modifiées',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/accueil');
        } catch (exception) {
            console.error('Something went wrong');
        }

        // Réinitialiser les champs et fermer la modal
        handleCloseModal();
    };

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const response = await axios.get<Array<Evaluation>>(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/evaluations/no-copies`,
                    {
                        withCredentials: true,
                    },
                );
                setEvaluations(response.data);
            } catch (error) {
                console.log('Error fetching student copies:', error);
                setEvaluations(null);
            }
        };

        fetchEvaluations();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
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
                    Evaluations reprogrammables
                </Text>
                {null === evaluations ? (
                    <Spinner
                        alignSelf='center'
                        size='xl'
                        justifySelf='center'
                    />
                ) : evaluations.length === 0 ? (
                    <Text>Aucune de vos évaluations n'est reprogrammable.</Text>
                ) : (
                    <Flex
                        direction='column'
                        rowGap='1rem'
                        maxHeight='500px'
                        overflowY='scroll'
                        w='100%'
                    >
                        {evaluations.map((evaluation, index) => {
                            return (
                                <HStack
                                    key={index}
                                    paddingX='3'
                                    paddingY='4'
                                    borderRadius='lg'
                                    cursor='pointer'
                                    transition='all .15s ease_in_out'
                                    columnGap='2rem'
                                    w='100%'
                                    border='1px solid '
                                    borderColor='gray.200'
                                >
                                    <Button
                                        onClick={() =>
                                            handleOpenModal(evaluation)
                                        }
                                    >
                                        Modifier
                                    </Button>
                                    <VStack
                                        whiteSpace='nowrap'
                                        color='gray.400'
                                        lineHeight='1'
                                    >
                                        <Text>
                                            {`Du ${dayjs(
                                                evaluation.startsAt,
                                            ).format('DD MMM YYYY HH:mm')}`}
                                        </Text>
                                        <Text>
                                            {`au ${dayjs(
                                                evaluation.endsAt,
                                            ).format('DD MMM YYYY HH:mm')}`}
                                        </Text>
                                    </VStack>
                                    <Text
                                        noOfLines={1}
                                        fontWeight='bold'
                                    >
                                        {evaluation.quiz.title}
                                    </Text>
                                </HStack>
                            );
                        })}
                    </Flex>
                )}
            </Flex>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifier l'évaluation</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <VStack spacing='2rem'>
                                <FormControl
                                    isInvalid={Boolean(errors.startsAt)}
                                >
                                    <FormLabel>
                                        Date et heure de début:
                                    </FormLabel>
                                    <Input
                                        {...register('startsAt', {
                                            valueAsDate: true,
                                        })}
                                        type='datetime-local'
                                    />
                                    <FormErrorMessage>
                                        {errors.startsAt &&
                                            (errors.startsAt.message as string)}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={Boolean(errors.endsAt)}>
                                    <FormLabel>Date et heure de fin:</FormLabel>
                                    <Input
                                        {...register('endsAt', {
                                            valueAsDate: true,
                                        })}
                                        type='datetime-local'
                                    />
                                    <FormErrorMessage>
                                        {errors.endsAt &&
                                            (errors.endsAt.message as string)}
                                    </FormErrorMessage>
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme='blue'
                                mr={3}
                                type='submit'
                            >
                                Enregistrer
                            </Button>
                            <Button onClick={handleCloseModal}>Annuler</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default UpcomingEvaluations;
