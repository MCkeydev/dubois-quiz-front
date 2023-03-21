import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

interface IRoleView {
    role: string;
    view: React.ReactElement;
}

interface IRoleSpecificRoute {
    views: Array<IRoleView>;
}

/**
 * Defines wich component is displayed depending on the user roles.
 * Really helpful when displaying different components on the same route depending on roles.
 *
 */
const RoleViewSwitch: React.FC<IRoleSpecificRoute> = (props) => {
    const user = useAppSelector((state) => state.user.user);

    if (null === user) {
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    } else {
        const correspondingView = props.views.find((view) =>
            user.roles.includes(view.role),
        );

        return <>{correspondingView !== undefined && correspondingView.view}</>;
    }
};

export default RoleViewSwitch;
