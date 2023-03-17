import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Input,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import loginGradient from '../../assets/loginGradient.png';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/authSlice';

const Login: React.FC = () => {
    // Redux
    const dispatch = useAppDispatch();

    // ChakraUI
    const toast = useToast();

    // TODO: Implement clean form errors

    // React-hook-forms
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (values: any) => {
        const login = async () => {
            try {
                // fetching user data from API
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/login`,
                    values,
                );

                // If no error, storing session into redux slice
                dispatch(
                    setUser({
                        token: data.token,
                        ...data.data,
                    }),
                );
            } catch (e) {
                if (e instanceof AxiosError) {
                    toast({
                        title: 'Une erreur réseau est survenue.',
                        description: e.message,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }
        };

        login();
    };

    return (
        <Flex w={'100%'}>
            <HStack
                position='relative'
                w='50%'
                h='100vh'
                alignItems='center'
                justifyContent='center'
                bgImg={loginGradient}
                backgroundPosition={'center'}
                backgroundSize={'cover'}
                zIndex='0'
            >
                <Box
                    position='absolute'
                    top='0'
                    bottom='0'
                    left='0'
                    right='0'
                    backdropBlur='40px'
                    backdropFilter='blur(40px)'
                    zIndex='1'
                />
                <VStack zIndex={2}>
                    <Heading as='h2'>
                        Votre solution de quizzing sur mesure !
                    </Heading>
                    <Text>Gérez vos demandes et incidents avec facilité.</Text>
                </VStack>
            </HStack>
            <HStack
                w='50%'
                h='100vh'
                alignItems='center'
                justifyContent='center'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack
                        gap={'1rem'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <FormControl>
                            <FormLabel>Adresse email</FormLabel>
                            <Input
                                type='email'
                                {...register('username')}
                            />
                            <FormHelperText>
                                We'll never share your email. (j'ai menti)
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type='password'
                                {...register('password')}
                            />
                            <FormHelperText>
                                Promis nous n'allons pas faire n'importe quoi
                                avec
                            </FormHelperText>
                        </FormControl>
                        <Button
                            w={'100%'}
                            type={'submit'}
                        >
                            Se Connecter
                        </Button>
                    </VStack>
                </form>
            </HStack>
        </Flex>
    );
};

export default Login;
