import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/LoadingSpinner';
import AdminDashboardHome from './AdminDashboardHome';

import BuyerDashboardHome from './BuyerDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import ManagerDashboardHome from './ManagerDashboardHome';


const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'manager') {
        return <ManagerDashboardHome></ManagerDashboardHome>
    }
     else if (role === 'buyer') {
        return <BuyerDashboardHome></BuyerDashboardHome>
    }
    else {
        return <UserDashboardHome></UserDashboardHome>
    }
};

export default DashboardHome;