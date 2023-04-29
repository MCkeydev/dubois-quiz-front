import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import theme from './styles/theme';
import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/900.css';
import Layout from './components/Layout/Layout';
import RoleProtectedRoute from './components/RoleProtectedRoute/RoleProtectedRoute';
import Teacher from './pages/Teacher/Teacher';
import PublicOnlyRoute from './components/PrivateRoute/PublicOnlyRoute';
import Login from './pages/Login/Login';
import Student from './pages/Student/Student';
import RoleViewSwitch from './components/RoleSpecificRoute/RoleViewSwitch';
import NotFound from './pages/NotFound/NotFound';
import { useAppSelector } from './store/hooks';

import dayjs from 'dayjs'; // load on demand
import 'dayjs/locale/fr';

dayjs.locale('fr');

function App() {
    // False when the app has done all necessary processing before painting a route to the user.
    const isInitialising = useAppSelector((state) => state.init.init);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                {isInitialising ? (
                    <Flex
                        position='relative'
                        w='100vw'
                        h='100vh'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Spinner />
                    </Flex>
                ) : (
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/accueil' />}
                        />
                        <Route
                            path=''
                            element={<Layout />}
                        >
                            <Route
                                path='accueil'
                                element={
                                    <RoleViewSwitch
                                        views={[
                                            {
                                                role: 'ROLE_ELEVE',
                                                view: <Student />,
                                            },
                                            {
                                                role: 'ROLE_FORMATEUR',
                                                view: <Teacher />,
                                            },
                                        ]}
                                    />
                                }
                            />
                            {/* STUDENT ROUTES */}
                            <Route
                                path='/accueil/student'
                                element={
                                    <RoleProtectedRoute
                                        allowedRoles={['ROLE_FORMATEUR']}
                                        component={<Student />}
                                    />
                                }
                            />
                            <Route
                                path='/evaluation/:id/participate'
                                element={
                                    <RoleProtectedRoute
                                        allowedRoles={['ROLE_ELEVE']}
                                        component={<div>make evaluation</div>}
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
