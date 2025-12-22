import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure'; 

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

   
    const { data: adminStats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/dashboard-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center py-10 text-xl text-indigo-600">Loading Admin Dashboard...</p>;
    }
    
   
    const pieDataRoles = adminStats.userRoles?.map(item => ({ name: item._id, value: item.count })) || [];
    const pieDataOrders = adminStats.orderStatuses?.map(item => ({ name: item._id, value: item.count })) || [];
    
   
    const barDataCategories = adminStats.productCategories?.map(item => ({ name: item._id, count: item.count })) || [];

    const roleColors = { 'Admin': '#06b6d4', 'Manager': '#f97316', 'Buyer': '#4f46e5' };
    const orderColors = { 'Approved': '#4ade80', 'Pending': '#facc15', 'Delivered': '#22c55e', 'Rejected': '#ef4444' };
    

    if (!adminStats.totalUsers) {
        return <p className="text-center py-10 text-xl text-red-600">No data available for Admin Dashboard. Check your database connection.</p>;
    }

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">📊 Admin Control Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500">
                    <div className="stat-title text-gray-500 font-medium">Total Users</div>
                    <div className="stat-value text-4xl text-indigo-700">{adminStats.totalUsers}</div>
                    <div className="stat-desc">Platform registered accounts</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
                    <div className="stat-title text-gray-500 font-medium">Total Products</div>
                    <div className="stat-value text-4xl text-green-700">{adminStats.totalProducts}</div>
                    <div className="stat-desc">Inventory count</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                    <div className="stat-title text-gray-500 font-medium">Total Orders</div>
                    <div className="stat-value text-4xl text-red-700">{adminStats.totalOrders}</div>
                    <div className="stat-desc">Lifetime orders placed</div>
                </div>
            </div>

         
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                
               
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">User Roles Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieDataRoles}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                             
                                {pieDataRoles.map((entry, index) => (
                                    <cell key={`role-pie-${index}`} fill={roleColors[entry.name] || '#ccc'} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

              
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieDataOrders}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#82ca9d"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                           
                                {pieDataOrders.map((entry, index) => (
                                    <cell key={`order-pie-${index}`} fill={orderColors[entry.name] || '#ccc'} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

           
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Count by Category</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={barDataCategories} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} interval={0} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3b82f6" name="Total Products" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default AdminDashboardHome;