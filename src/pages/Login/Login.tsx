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
import { UserType } from '../../types/interfaces';

const Login: React.FC = () => {
    // Redux
    const dispatch = useAppDispatch();

    // ChakraUI
    const toast = useToast();

    // TODO: Implement clean form errors

    // React-hook-forms
    const { register, handleSubmit } = useForm();

    const onSubmit = (values: Record<string, string | number>) => {
        const login = async () => {
            try {
                // fetching user data from API
                const { data }: { data: { data: UserType } } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/login`,
                    values,
                    {
                        withCredentials: true,
                    },
                );

                // If no error, storing session into redux slice
                dispatch(
                    setUser({
                        ...data.data,
                    }),
                );
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        toast({
                            title: 'Identifiants incorrects',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: 'Une erreur réseau est survenue. Nous nous excusons pour la gêne occasionnée.',
                            description: e.message,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                }
            }
        };

        login();
    };

    return (
        <Flex w='100%'>
            <HStack
                position='relative'
                w='50%'
                h='100vh'
                alignItems='center'
                justifyContent='center'
                bgImg={loginGradient}
                backgroundPosition='center'
                backgroundSize='cover'
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
                        gap='1rem'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <FormControl>
                            <FormLabel>Adresse email</FormLabel>
                            <Input
                                type='email'
                                {...register('username')}
                            />
                            <FormHelperText>
                                We&apos;ll never share your email. (j&apos;ai
                                menti)
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Mot de passe</FormLabel>
                            <Input
                                type='password'
                                {...register('password')}
                            />
                            <FormHelperText>
                                Promis nous n&apos;allons pas faire
                                n&apos;importe quoi avec
                            </FormHelperText>
                        </FormControl>
                        <Button
                            w='100%'
                            type='submit'
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
