import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { toast } from 'react-toastify'; 
import Swal from 'sweetalert2'; 

const formatOrderDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-GB', { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit' 
        });
    } catch {
        return 'Invalid Date';
    }
};


const PendingOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

   
    const { data: pendingOrders = [], isLoading, refetch } = useQuery({
        queryKey: ['pendingOrders', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
          
            const res = await axiosSecure.get(`/manager-pending-orders?email=${user.email}`);
            return res.data;
        },
    });

   
    const handleUpdateStatus = (orderId, currentTrackingId, action) => { 
        const newStatus = action === 'approve' ? 'Approved' : 'Rejected';
        const actionTitle = action === 'approve' ? 'Approve' : 'Reject';
        const actionColor = action === 'approve' ? '#22c55e' : '#ef4444';

        Swal.fire({
            title: `Confirm ${actionTitle}?`,
            text: `Are you sure you want to change the status to ${newStatus}?`,
            icon: action === 'approve' ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonColor: actionColor,
            cancelButtonColor: '#6b7280',
            confirmButtonText: `Yes, ${actionTitle} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    
                    const res = await axiosSecure.patch(`/orders/${orderId}/status`, {
                        newStatus: newStatus,
                        trackingId: currentTrackingId 
                    }); 
                    
                    if (res.data.success) {
                        toast.success(`Order successfully ${action}d! Status: ${newStatus}`);
                        refetch(); 
                    } else if (res.data.message) {
                         toast.error(res.data.message);
                    }
                } catch (error) {
                    toast.error(`Failed to ${action} order. Check network and console.`);
                }
            }
        });
    };
    
   
    if (!user) {
        return <p className="text-center py-10 text-red-500">Please login to manage orders.</p>;
    }

    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600">Loading pending orders...</p>;
    }

    if (pendingOrders.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-gray-800">Pending Orders</h1>
                <p className="text-xl text-gray-500 mt-4">🎉 Great! You have no pending orders requiring approval.</p>
            </div>
        );
    }

    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Pending Orders ({pendingOrders.length})</h1>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-orange-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">User (Buyer)</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-orange-700 uppercase tracking-wider">Order Date</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-orange-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {order.trackingId || 'N/A'}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.firstName} {order.lastName} ({order.buyerEmail})
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                    {order.productTitle}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.orderQuantity}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatOrderDate(order.createdAt)}
                                </td>
                                
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                    
                                    {/* Approve Button */}
                                    <button 
                                        title="Approve Order"
                                        onClick={() => handleUpdateStatus(order._id, order.trackingId, 'approve')}
                                        className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition duration-150"
                                    >
                                        <FiCheckCircle className="h-5 w-5" />
                                    </button>
                                    
                                    {/* Reject Button */}
                                    <button 
                                        title="Reject Order"
                                        onClick={() => handleUpdateStatus(order._id, order.trackingId, 'reject')}
                                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition duration-150"
                                    >
                                        <FiXCircle className="h-5 w-5" />
                                    </button>

                                    {/* View Button */}
                                    <Link 
                                        to={`/dashboard/order-details/${order._id}`}
                                        state={{ orderData: order }} 
                                        title="View Details"
                                        className="inline-block text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition duration-150"
                                    >
                                        <FiEye className="h-5 w-5" />
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingOrders;