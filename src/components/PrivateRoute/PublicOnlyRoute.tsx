import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

interface IPublicOnlyRoute {
    component: React.ReactElement;
}

const PublicOnlyRoute: React.FC<IPublicOnlyRoute> = (props) => {
    const user = useAppSelector((state) => state.user.user);

    return user ? (
        <Navigate
            to='/accueil'
            replace
        />
    ) : (
        props.component
    );
};

export default PublicOnlyRoute;
