import React from 'react';
import {
    Box,
    Button,
    CloseButton,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdPlusOne } from 'react-icons/all';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AnswerType = {
    title: string;
};

type QuestionType = {
    title: string;
    maxScore: number;
    answers: Array<AnswerType>;
};

const CreateQuiz: React.FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { register, handleSubmit, control } = useForm();
    const { fields: questionFields, append: appendQuestion } = useFieldArray({
        control,
        name: 'questions',
    });

    const onSubmit = handleSubmit(async (data: any) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/quiz`,
                data,
                { withCredentials: true },
            );

            toast({
                title: 'Quiz créé',
                description: 'Le quiz a été créé avec succès.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/accueil');
        } catch {
            console.error('something went wrong');
        }
    });

    const Question = ({
        questionField,
        questionIndex,
    }: {
        questionField: any;
        questionIndex: number;
    }) => {
        const {
            fields: answerFields,
            append: appendAnswer,
            remove: removeAnswer,
        } = useFieldArray({
            control,
            name: `questions[${questionIndex}].answers`,
        });

        return (
            <Box
                key={questionField.id}
                display='flex'
                flexDirection='column'
                alignItems='start'
                rowGap='1rem'
                w='100%'
                paddingY='1rem'
                borderRadius='1rem'
                borderColor='gray.200'
            >
                <FormControl>
                    <FormLabel>Intitulé de la question</FormLabel>
                    <Input
                        type='text'
                        {...register(`questions.${questionIndex}.title`, {
                            required: true,
                        })}
                    />
                    <FormControl>
                        <FormLabel>Points de la question</FormLabel>
                        <NumberInput
                            min={1}
                            defaultValue={1}
                        >
                            <NumberInputField
                                type='number'
                                {...register(
                                    `questions.${questionIndex}.maxScore`,
                                    { required: true, valueAsNumber: true },
                                )}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </FormControl>
                {answerFields.length > 0 && (
                    <VStack
                        paddingLeft='1rem'
                        borderLeft='1px solid'
                        borderColor='gray.200'
                        rowGap='1rem'
                    >
                        {answerFields.map((answerField, answerIndex) => (
                            <FormControl key={answerField.id}>
                                <FormLabel>Choix {answerIndex + 1}</FormLabel>
                                <HStack alignItems='center'>
                                    <Input
                                        type='text'
                                        {...register(
                                            `questions.${questionIndex}.answers.${answerIndex}.title`,
                                            { required: true },
                                        )}
                                    />
                                    <CloseButton
                                        onClick={() =>
                                            removeAnswer(answerIndex)
                                        }
                                    />
                                </HStack>
                            </FormControl>
                        ))}
                    </VStack>
                )}
                <Button
                    size='sm'
                    onClick={() => appendAnswer({ title: '' })}
                >
                    Ajouter un choix
                </Button>
            </Box>
        );
    };

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
                <FormControl>
                    <FormLabel>Titre du quiz</FormLabel>
                    <Input
                        type='text'
                        {...register('title', { required: true })}
                    />
                </FormControl>
                {questionFields.map((questionField, index) => (
                    <Question
                        key={index}
                        questionField={questionField}
                        questionIndex={index}
                    />
                ))}
                <Button
                    size='sm'
                    leftIcon={<MdPlusOne />}
                    onClick={() =>
                        appendQuestion({ title: '', maxScore: 0, answers: [] })
                    }
                >
                    Ajouter une question
                </Button>
            </Box>
            <Button onClick={onSubmit}>Créer le quiz</Button>
        </Flex>
    );
};

export default CreateQuiz;
