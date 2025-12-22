import React from 'react';
import useRole from '../hooks/useRole'; 
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const AdminOrManagerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();
    const location = useLocation();

   
    if (loading || roleLoading) {
        return <progress className="progress w-56"></progress>; 
    }

    
    if (user && (role === 'admin' || role === 'manager')) {
        return children;
    }

    
    return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default AdminOrManagerRoute;