import React from 'react';

import { Navigate, useLocation } from 'react-router';
import Forbidden from '../components/Forbidden';
import useRole from '../hooks/useRole';

const SuspendedActionGuard = ({ children, roleRequired }) => {
    const { status, role, roleLoading } = useRole();
    const location = useLocation();

    if (roleLoading) {
        return <progress className="progress w-56"></progress>; 
    }

   
    if (status === 'suspended') {
       
        return (
            <div className="p-4">
                <Forbidden 
                    message={`Your account is currently suspended. You cannot perform this action.`}
                />
            </div>
        );
    }
    
    
    return children;
};

export default SuspendedActionGuard;