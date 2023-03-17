import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthManager from './Components/AuthManager/AuthManager';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Login from './pages/Login/Login';
import Layout from './Components/Layout/Layout';
import Accueil from './pages/Accueil';
import theme from './styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/montserrat/';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthManager />
                    <Routes>
                        <Route
                            path='/'
                            element={<Layout />}
                        >
                            <Route
                                path={'accueil'}
                                element={<Accueil />}
                            />
                        </Route>
                        <Route
                            path='/login'
                            element={<Login />}
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </ChakraProvider>
    );
}

export default App;
