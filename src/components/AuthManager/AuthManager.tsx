import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { setUser } from '../../store/slices/authSlice';
import { setInitEnd } from '../../store/slices/initSlice';

/**
 * Component acting as a firewall.
 * It manages the user's authentication state, and the routes he is able to access.
 *
 */
const AuthManager: React.FC = () => {
    // Use of redux toolkit hooks
    const dispatch = useAppDispatch();

    // Current user stored in a Redux store
    const user = useAppSelector((state) => state.user.user);

    // Initialisation state of the app
    const isInitialising = useAppSelector((state) => state.init.init);

    // State defining whether the AuthManager's processing is done or not.
    const [isProcessingOver, setIsProcessingOver] = React.useState(false);

    /**
     * Triggers only on first render.
     * Checks with the API if the user is logged in (cookies are set).
     * If the user is authenticated, dispatches to the redux store the user object.
     */
    React.useEffect(() => {
        if (isInitialising) {
            /**
             * Function that fetches the current user.
             * If the api sends us back the user object meaning that the user is already authenticated (cookies are already set)
             * we redirect the user to its homepage.
             * If the api sends us an error, that means that we are not authenticated, thus we are redirected to the login page.
             */
            const checkUserInstance = async () => {
                try {
                    const { data } = await axios.get(
                        import.meta.env.VITE_API_BASE_URL + '/user',
                        {
                            withCredentials: true,
                        },
                    );

                    dispatch(setUser(data));
                    setIsProcessingOver(true);
                } catch ({ message }) {
                    setIsProcessingOver(true);
                    console.log(message);
                }
            };

            if (null === user) {
                checkUserInstance();
            }
        }
    }, []);

    /**
     * When AuthManager's processing is all done,
     * notifies the application that initialisation is over.
     * TODO: Might want to make this more complex, with multiple initialisation criteria (authInit, fetchInit...)
     */
    React.useEffect(() => {
        if (isProcessingOver) {
            dispatch(setInitEnd());
        }
    }, [isProcessingOver]);

    return null;
};

export default AuthManager;
