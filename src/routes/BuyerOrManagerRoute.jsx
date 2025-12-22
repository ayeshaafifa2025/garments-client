import React from 'react';
import useRole from '../hooks/useRole'; 
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth'; 


const BuyerOrManagerRoute = ({ children }) => {
   
    const { user, loading } = useAuth(); 
   
    const { role, roleLoading } = useRole(); 
    const location = useLocation();

   
    if (loading || roleLoading) {
        
        return <progress className="progress w-56"></progress>; 
    }


    const isAuthorized = user && (role === 'buyer' || role === 'manager' || role === 'admin');

    if (isAuthorized) {
        return children;
    }


    return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default BuyerOrManagerRoute;