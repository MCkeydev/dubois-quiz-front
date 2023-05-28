import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Spinner,
    Text,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Evaluation } from '../../model/api';
import { useForm } from 'react-hook-form';

const MakeEvaluation: React.FC = () => {
    // Use of react-router hook
    const { id: evaluationId } = useParams();

    const navigate = useNavigate();

    // Use of react-hook-form hook
    const { register, handleSubmit } = useForm();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const sendCopy = async (data: any) => {
        const response = await axios.post(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/evaluation/${evaluationId}/studentCopy/submit`,
            data,
            { withCredentials: true },
        );

        return response;
    };

    /**
     * Here we want to parse the submitted data, and format it to API expected format,
     */
    const onSubmit = handleSubmit(async (data: any) => {
        setIsSubmitting(true);

        const postData = Object.entries(data).map(([key, value]) => {
            const splatKey = key.split('-');

            return {
                question: Number(splatKey[1]),
                [splatKey[0]]: splatKey[0] === 'choice' ? Number(value) : value,
            };
        });

        try {
            const response = await sendCopy(postData);
            navigate(-1);
        } catch (exception) {
            console.log('error');
        }
    });

    // Stores the evaluation fetched from API
    const [evaluation, setEvaluation] = React.useState<Evaluation | null>(null);

    // UseEffect to fetch data on first render
    React.useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await axios.get<Evaluation>(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/evaluation/${evaluationId}`,
                    {
                        withCredentials: true,
                    },
                );

                setEvaluation(response.data);
            } catch (e) {
                console.error(
                    "Une erreur est survenue pendant la récupération de l'évaluation",
                    e,
                );
                navigate('/accueil');
            }
        };

        fetchEvaluation();
    }, []);

    return (
        <Flex
            w='100%'
            h='100vh'
            p='2rem'
            direction='column'
            gap='1rem'
        >
            <Box
                p='2rem'
                borderRadius='1rem'
                bg='white'
                boxShadow='md'
            >
                {null === evaluation ? (
                    <Spinner />
                ) : (
                    <>
                        <Heading
                            size='sm'
                            pb='2rem'
                        >
                            {evaluation.quiz.title}
                        </Heading>
                        <form>
                            {evaluation.quiz.questions.map(
                                (question, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            pb='1rem'
                                        >
                                            <Text pb='0.5rem'>
                                                {question.title}
                                            </Text>
                                            <Box
                                                marginLeft='0.5rem'
                                                paddingLeft='1rem'
                                                py='1rem'
                                                borderLeft='1px solid'
                                                borderColor='gray.200'
                                            >
                                                {question.answers.length ===
                                                0 ? (
                                                    <Textarea
                                                        variant='filled'
                                                        placeholder='Saisissez votre réponse'
                                                        {...register(
                                                            'answer-' +
                                                                question.id,
                                                        )}
                                                    />
                                                ) : (
                                                    <RadioGroup>
                                                        <VStack
                                                            alignItems='start'
                                                            gap='1rem'
                                                        >
                                                            {question.answers.map(
                                                                (
                                                                    answer,
                                                                    index,
                                                                ) => (
                                                                    <Radio
                                                                        {...register(
                                                                            'choice-' +
                                                                                question.id,
                                                                        )}
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={String(
                                                                            answer.id,
                                                                        )}
                                                                    >
                                                                        {
                                                                            answer.title
                                                                        }
                                                                    </Radio>
                                                                ),
                                                            )}
                                                        </VStack>
                                                    </RadioGroup>
                                                )}
                                            </Box>
                                        </Box>
                                    );
                                },
                            )}

                            <Modal
                                blockScrollOnMount={false}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>
                                        Soumettre votre copie
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Text
                                            fontWeight='bold'
                                            mb='1rem'
                                        >
                                            Êtes vous sûr de vouloir envoyer
                                            votre copie ? Cette action est
                                            irréversible, et vous ne pourrez
                                            plus la modifier.
                                        </Text>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            colorScheme='blue'
                                            mr={3}
                                            isDisabled={isSubmitting}
                                            onClick={onClose}
                                        >
                                            Je me relis
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant='ghost'
                                            isLoading={isSubmitting}
                                            onClick={onSubmit}
                                        >
                                            Envoyer
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                            <Button
                                mt='2rem'
                                // type='submit'
                                onClick={onOpen}
                            >
                                Terminer l&apos;évaluation
                            </Button>
                        </form>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default MakeEvaluation;
