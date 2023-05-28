import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Spinner } from '@chakra-ui/react';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/authSlice';

const Logout: React.FC = () => {
    // Use of react-router-dom hooks
    const navigate = useNavigate();
    // Use of redux toolkit hooks
    const dispatch = useAppDispatch();
    // Use of react-cookie hook
    const [_, __, removeCookie] = useCookies(['jwt_hp']);

    React.useEffect(() => {
        // Removes the jwt from cookies
        removeCookie('jwt_hp');

        // Retires l'utilisateur du stockage redux
        dispatch(setUser(null));

        // Redirige l'utilisateur vers la page de login
        navigate('/login');
    }, []);

    return (
        <>
            <Spinner />
        </>
    );
};

export default Logout;
