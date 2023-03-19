import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Layout from './components/Layout/Layout';
import Accueil from './pages/Accueil';
import theme from './styles/theme';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import '@fontsource/montserrat/';
import { useAppSelector } from './store/hooks';
import NotFound from './pages/NotFound/NotFound';
import React from 'react';
import Student from './pages/Student/Student';
import RoleProtectedRoute from './components/RoleProtectedRoute/RoleProtectedRoute';
import PublicOnlyRoute from './components/PrivateRoute/PublicOnlyRoute';

function App() {
    // False when the app has done all necessary processing before painting a route to the user.
    const isInitialising = useAppSelector((state) => state.init.init);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                {isInitialising ? (
                    <Flex
                        w='100vw'
                        h='100vh'
                    >
                        <Spinner />
                    </Flex>
                ) : (
                    <Routes>
                        <Route
                            path='/'
                            element={<Layout />}
                        >
                            <Route
                                path='accueil'
                                element={<Accueil />}
                            />
                            <Route
                                path='/accueil/student'
                                element={
                                    <RoleProtectedRoute
                                        allowedRoles={['ROLE_FORMATEUR']}
                                        component={<Student />}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            path='/login'
                            element={<PublicOnlyRoute component={<Login />} />}
                        />
                        <Route
                            path='*'
                            element={<NotFound />}
                        />
                    </Routes>
                )}
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
