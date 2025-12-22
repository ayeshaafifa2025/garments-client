

import React from 'react';
import useRole from '../hooks/useRole'; 
import useAuth from '../hooks/useAuth';
import Forbidden from '../components/Forbidden';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useAuth();
   
    const { role, roleLoading } = useRole(); 

    if (loading || roleLoading) {
        return <progress className="progress w-56"></progress>; 
    }

    
    if (user && role === 'buyer') { 
        return children;
    }

    
    return <Forbidden></Forbidden>;
};

export default BuyerRoute;
