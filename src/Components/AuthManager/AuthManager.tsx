import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

interface IAuthResponse {
    object_type: string;
    expires_in: string;
    access_token: string;
    refresh_token: string;
}

const AuthManager: React.FC = () => {
    // Use of React-Router hooks
    const navigate = useNavigate();
    // Current router location
    const location = useLocation();

    // Current user stored in a Redux store
    const user = useAppSelector((state) => state.user.user);

    React.useEffect(() => {
        // If user is not logged in
        if (user === null) {
            navigate(import.meta.env.VITE_LOGIN_PATH);
            // If logged in user tries to acces login page
        } else if (location.pathname === import.meta.env.VITE_LOGIN_PATH) {
            navigate('/accueil');
        }
    }, [user]);

    return null;
};

export default AuthManager;
