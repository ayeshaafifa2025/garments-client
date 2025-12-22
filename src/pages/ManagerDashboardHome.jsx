import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import useAuth from '../hooks/useAuth'; 

const ManagerDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 

   
    const { data: managerStats = {}, isLoading } = useQuery({
        queryKey: ['manager-stats', user?.email],
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/manager/dashboard-stats`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    if (isLoading) {
        return <p className="text-center py-10 text-xl text-indigo-600">Loading Manager Dashboard...</p>;
    }
    
    
    const pieDataStock = managerStats.stockStats?.map(item => ({ name: item._id, value: item.count })) || [];
    const pieDataTracking = managerStats.trackingStats?.map(item => ({ name: item._id, value: item.count })) || [];

    
    const stockColors = { 'In Stock': '#10b981', 'Low Stock': '#f59e0b', 'Out of Stock': '#ef4444' };
    const trackingColors = { 'Processing': '#60a5fa', 'Shipped': '#34d399', 'Delivered': '#22c55e', 'Awaiting Pickup': '#f97316' };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">🧑‍💻 Manager's Hub</h1>

          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500">
                    <div className="stat-title text-gray-500 font-medium">Total Products Uploaded</div>
                    <div className="stat-value text-4xl text-indigo-700">{managerStats.totalProducts || 0}</div>
                    <div className="stat-desc">Your inventory contribution</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500">
                    <div className="stat-title text-gray-500 font-medium">Pending Orders</div>
                    <div className="stat-value text-4xl text-red-700">{managerStats.pendingOrdersCount || 0}</div>
                    <div className="stat-desc font-bold text-red-600">Action Required!</div>
                </div>
                <div className="stat bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">
                    <div className="stat-title text-gray-500 font-medium">Orders in Tracking</div>
                    <div className="stat-value text-4xl text-green-700">{managerStats.approvedOrdersCount || 0}</div>
                    <div className="stat-desc">Approved and being fulfilled</div>
                </div>
            </div>

           
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                
               
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Inventory Stock Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieDataStock}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                               
                                {pieDataStock.map((entry, index) => (
                                    <cell key={`stock-pie-${index}`} fill={stockColors[entry.name] || '#ccc'} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Tracking Status of Approved Orders</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieDataTracking}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                
                                {pieDataTracking.map((entry, index) => (
                                    <cell key={`tracking-pie-${index}`} fill={trackingColors[entry.name] || '#ccc'} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default ManagerDashboardHome;