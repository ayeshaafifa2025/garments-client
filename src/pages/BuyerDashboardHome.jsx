import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import useAuth from '../hooks/useAuth'; 


const COLORS = {
    'Pending': '#f59e0b', 
    'Approved': '#60a5fa', 
    'Delivered': '#22c55e', 
    'Cancelled': '#ef4444', 
    'Rejected': '#71717a'
};

const BuyerDashboardHome = () => {
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
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">🛒 Your Order Summary</h1>

         
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="stat bg-white shadow-lg rounded-xl p-4 border-b-4 border-indigo-500">
                    <div className="stat-title text-gray-500 font-medium">Total Orders</div>
                    <div className="stat-value text-3xl text-indigo-700">{buyerStats.totalOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 border-b-4 border-amber-500">
                    <div className="stat-title text-gray-500 font-medium">Pending Orders</div>
                    <div className="stat-value text-3xl text-amber-700">{buyerStats.pendingOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 border-b-4 border-blue-500">
                    <div className="stat-title text-gray-500 font-medium">Processing Orders</div>
                    <div className="stat-value text-3xl text-blue-700">{buyerStats.approvedOrders || 0}</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-4 border-b-4 border-green-500">
                    <div className="stat-title text-gray-500 font-medium">Delivered Orders</div>
                    <div className="stat-value text-3xl text-green-700">{buyerStats.deliveredOrders || 0}</div>
                </div>
            </div>

            
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center">Your Order Status Breakdown </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS['Rejected']} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            
            <div className="mt-10 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">Quick Actions</h3>
                <div className="flex justify-center space-x-4">
                   
                    <a href="/dashboard/my-orders" className="btn bg-blue-500 text-white hover:bg-blue-600">View My Orders</a>
                
                </div>
            </div>

        </div>
    );
};

export default BuyerDashboardHome;