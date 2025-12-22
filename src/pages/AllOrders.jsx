

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';
import { Truck, Search } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import AddTrackingModal from '../modal/AddTrackingModal';
import { Helmet } from 'react-helmet-async';

const formatOrderDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), 'dd MMM, yyyy');
    } catch {
        return 'Invalid Date';
    }
};

const getStatusClasses = (status) => {
    const s = status || 'Pending';
    switch (s) {
        case 'Approved':
        case 'Cutting Completed':
        case 'Sewing Started':
        case 'Finishing':
        case 'QC Checked':
        case 'Packed':
            return 'bg-yellow-100 text-yellow-800'; 
        case 'Shipped / Out for Delivery':
            return 'bg-blue-100 text-blue-800'; 
        case 'Delivered':
            return 'bg-green-100 text-green-800';
        case 'Rejected':
        case 'Cancelled':
            return 'bg-red-100 text-red-800'; 
        case 'Pending':
        default:
            return 'bg-orange-100 text-orange-800'; 
    }
};

const AllOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [statusFilter, setStatusFilter] = useState(''); 
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const availableStatuses = [
        'Pending', 
        'Approved', 
        'Cutting Completed', 
        'Sewing Started', 
        'Finishing',
        'QC Checked',
        'Packed',
        'Shipped / Out for Delivery',
        'Delivered',
        'Rejected',
        'Cancelled' 
    ];

    const { 
        data: allOrders = [], 
        isLoading, 
        refetch 
    } = useQuery({
        queryKey: ['allOrdersAdmin', statusFilter], 
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/all-orders?status=${statusFilter}`);
            return res.data;
        },
    });

    const handleUpdateStatus = (orderId, action) => { 
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
                    const res = await axiosSecure.patch(`/orders/${orderId}/status`, { newStatus }); 
                    if (res.data.success) {
                        toast.success(`Order successfully ${action}d! Status: ${newStatus}`);
                        refetch(); 
                    } else if (res.data.message) {
                        toast.error(res.data.message);
                    }
                } catch {
                    toast.error(`Failed to ${action} order. Check network and console.`);
                }
            }
        });
    };

    const handleAddTracking = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const filteredOrders = allOrders.filter(order => 
        order.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.trackingId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!user) return <p className="text-center py-10 text-red-500">Please login to manage orders.</p>;
    if (isLoading) return <p className="text-center py-10 text-indigo-600">Loading all orders...</p>;

    return (
        <div>
            <Helmet>
                <title>all-orders</title>
            </Helmet>
            <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                    📋 all orders: ({allOrders.length})
                </h1>
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center bg-white p-4 rounded-lg shadow-md">
                    <div className="w-full md:w-auto">
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Filter by status :</label>
                        <select
                            id="statusFilter"
                            name="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">All status</option>
                            {availableStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <div className="w-full md:flex-1 relative">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search by ID, product, email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-4 py-2 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Search by ID, product or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                        <p className="text-xl text-gray-500 mt-4">We didn't find any order according to your status</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Order ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider hidden sm:table-cell">Buyer</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider hidden md:table-cell">Product</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider hidden lg:table-cell">Quantity</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider hidden md:table-cell">Order Date</th>
                                    <th className="px-4 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-indigo-600">{order.trackingId || 'N/A'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{order.firstName} {order.lastName}<br/><span className="text-xs text-gray-400">{order.buyerEmail}</span></td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium hidden md:table-cell">{order.productTitle}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{order.orderQuantity}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(order.currentTrackingStatus || order.status)}`}>{order.currentTrackingStatus || order.status}</span></td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{formatOrderDate(order.createdAt)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium space-x-1 sm:space-x-2 flex flex-wrap justify-center">
                                            {(order.status === 'Pending') && (
                                                <>
                                                    <button title="Approve Order" onClick={() => handleUpdateStatus(order._id, 'approve')} className="text-black bg-gradient-to-r from-green-300 via-green-200 to-green-400 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200 flex items-center"><FiCheckCircle className="h-5 w-5 mr-1"/>Approve</button>
                                                    <button title="Reject Order" onClick={() => handleUpdateStatus(order._id, 'reject')} className="text-black bg-gradient-to-r from-red-300 via-red-200 to-red-400 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200 flex items-center"><FiXCircle className="h-5 w-5 mr-1"/>Reject</button>
                                                </>
                                            )}
                                            {order.status !== 'Rejected' && order.status !== 'Cancelled' && (
                                                <button onClick={() => handleAddTracking(order)} className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-2 py-1 rounded-md font-medium shadow-sm hover:scale-105 transition duration-200 flex items-center" title="Update Tracking Status"><Truck className="w-4 h-4 mr-1"/>Tracking</button>
                                            )}
                                            <Link to={`/dashboard/order-details/${order._id}`} state={{ orderData: order }} title="View Details" className="inline-block text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition duration-150"><FiEye className="h-5 w-5"/></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {selectedOrder && (
                    <AddTrackingModal
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedOrder(null);
                        }}
                        order={selectedOrder}
                        refetchOrders={refetch}
                    />
                )}
            </div>
        </div>
    );
};

export default AllOrders;
