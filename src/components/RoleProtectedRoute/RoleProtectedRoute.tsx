import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

interface IRoleProtectedRoute {
    allowedRoles: Array<string>;
    component: React.ReactElement;
}
const RoleProtectedRoute: React.FC<IRoleProtectedRoute> = ({
    allowedRoles,
    ...props
}) => {
    const user = useAppSelector((state) => state.user.user);

    if (null === user) {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    } else {
        return user.roles.some((role) => allowedRoles.includes(role)) ? (
            props.component
        ) : (
            <Navigate
                to='/404'
                replace
            />
        );
    }
};

export default RoleProtectedRoute;
