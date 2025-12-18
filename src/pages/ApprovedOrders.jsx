
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; 
import { Truck, Eye } from 'lucide-react'; 
import useAuth from '../hooks/useAuth'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { format } from 'date-fns';
import AddTrackingModal from '../modal/AddTrackingModal';

const ApprovedOrders = () => {
    const { user } = useAuth();
    const managerEmail = user?.email;
    const axiosSecure = useAxiosSecure(); 
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

 
    const { 
        data: approvedOrders = [], 
        isLoading, 
        isError,
        error,
        refetch 
    } = useQuery({
        queryKey: ['approved-orders', managerEmail],
        queryFn: async () => {
            if (!managerEmail) return [];
           
            const res = await axiosSecure.get(`/manager-approved-orders?email=${managerEmail}`); 
            return res.data;
        },
        enabled: !!managerEmail, 
    });

    const handleAddTracking = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    if (isLoading) return <div className="text-center py-10"><p className="text-lg text-indigo-600"> Loading from approved orders...</p></div>;
    if (isError) return <div className="text-center text-red-600 p-10">Error: {error.message}</div>;
    if (!managerEmail) return <div className="text-center text-xl text-gray-500 py-20"> Please login</div>;

    
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-green-700 border-b pb-2">Approved Orders</h2>
            <p className="mb-6 text-gray-600"> Start to update tracking </p>
            
            {approvedOrders.length === 0 ? (
                <div className="text-center text-xl text-gray-500 py-20 bg-white rounded-lg shadow-md">
                    No approved order
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">User (Buyer)</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Last Status</th> 
                                <th className="px-6 py-3 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Approved Date</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {approvedOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{order.trackingId || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.firstName} {order.lastName} <br/>
                                        <span className="text-xs text-gray-500">{order.buyerEmail}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{order.productTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderQuantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            (order.currentTrackingStatus || order.status) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                            (order.currentTrackingStatus || order.status) === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                            (order.currentTrackingStatus || order.status) === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.currentTrackingStatus || order.status} 
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.approvedAt ? format(new Date(order.approvedAt), 'dd MMM, yyyy h:mm a') : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                                      
                                        <button
                                            onClick={() => handleAddTracking(order)}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            title=" Add tracking"
                                        >
                                            <Truck className="w-4 h-4 mr-1"/> Add tracking status
                                        </button>
                                        
                                        
                                        <Link
                                            to={`/dashboard/order-details/${order._id}`}
                                            state={{ orderData: order }}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100"
                                            title="see order details"
                                        >
                                            <Eye className="w-4 h-4 mr-1"/> See order details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* ⭐ মোডাল কম্পোনেন্ট কল করা */}
            {selectedOrder && (
                <AddTrackingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    order={selectedOrder}
                    refetchOrders={refetch}
                />
            )}
        </div>
    );
};

export default ApprovedOrders;



