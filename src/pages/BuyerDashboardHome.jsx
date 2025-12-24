

import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import useAuth from '../hooks/useAuth'; 
import { Link } from 'react-router';
import { ThemeContext } from '../contexts/ThemeProvider';


const COLORS = {
    'Pending': '#f59e0b', 
    'Approved': '#60a5fa', 
    'Delivered': '#22c55e', 
    'Cancelled': '#ef4444', 
    'Rejected': '#71717a'
};

const BuyerDashboardHome = () => {
     const { theme, toggleTheme } = useContext(ThemeContext);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

    
    const { data: buyerStats = {}, isLoading } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/buyer/dashboard-stats`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <p className="text-center py-10 text-xl text-indigo-600">Loading Buyer Dashboard...</p>;
    }
    
 
    const pieData = buyerStats.statusStats?.map(item => ({ name: item._id, value: item.count })) || [];

    return (
        <div className={`p-4 sm:p-6 lg:p-8  ${theme === "light" ? "bg-white" : "bg-gray-600 "} min-h-screen`}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">🛒 Your Order Summary</h1>

            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-10">
                <div className="stat bg-white shadow-lg rounded-xl p-4 sm:p-6 border-b-4 border-indigo-500">
                    <div className="stat-title text-gray-500 font-medium text-sm sm:text-base">Total Orders</div>
                    <div className="stat-value text-xl sm:text-3xl text-indigo-700 font-extrabold">{buyerStats.totalOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 sm:p-6 border-b-4 border-amber-500">
                    <div className="stat-title text-gray-500 font-medium text-sm sm:text-base">Pending Orders</div>
                    <div className="stat-value text-xl sm:text-3xl text-amber-700 font-extrabold">{buyerStats.pendingOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 sm:p-6 border-b-4 border-blue-500">
                    <div className="stat-title text-gray-500 font-medium text-sm sm:text-base">Processing Orders</div>
                    <div className="stat-value text-xl sm:text-3xl text-blue-700 font-extrabold">{buyerStats.approvedOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 sm:p-6 border-b-4 border-green-500">
                    <div className="stat-title text-gray-500 font-medium text-sm sm:text-base">Delivered Orders</div>
                    <div className="stat-value text-xl sm:text-3xl text-green-700 font-extrabold">{buyerStats.deliveredOrders || 0}</div>
                </div>
            </div>

            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center">Your Order Status Breakdown </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80} 
                            innerRadius={30} 
                            fill="#8884d8"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['Rejected']} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '14px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            
            <div className="mt-8 sm:mt-10 text-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h3>
                <div className="flex justify-center space-x-3 sm:space-x-4">
                    
                    <Link to="/dashboard/my-orders" className="btn btn-sm sm:btn-md bg-blue-500 text-white hover:bg-blue-600 border-none px-4 sm:px-6">View My Orders</Link>
                
                </div>
            </div>

        </div>
    );
};

export default BuyerDashboardHome;