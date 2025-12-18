
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router'; 
import useAxiosSecure from '../hooks/useAxiosSecure';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('bn-BD');
};

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = () => {
        if (user?.email) {
            setIsLoading(true);
            
           
            axiosSecure.get(`/orders/${user.email}`) 
                .then(res => {
                    setOrders(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error loading orders:", error);
                    setIsLoading(false);
                    Swal.fire('Error', ' Failed to load order', 'error');
                });
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [user, axiosSecure]); 

    
    const handleCancel = (orderId, trackingId) => {
        Swal.fire({
            title: " Are you sure",
            text: " Couldn't find order if canceled!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
               
                axiosSecure.patch(`/orders/cancel/${orderId}`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire(
                                'cancelled',
                                `order ${trackingId} Successfully canceled`,
                                'success'
                            );
                            fetchOrders(); 
                        } else {
                            Swal.fire(
                                'failed!',
                                res.data.message || ` ${trackingId} Failed to cancel`,
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        console.error("Cancellation Error:", error);
                        Swal.fire('Error', ' Server problem to remove the order', 'error');
                    });
            }
        });
    };
    
    if (!user) {
        return <p className="text-center py-10 text-red-500"> Need to be user to see order </p>
    }
    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600"> Order is loading </p>;
    }
    if (orders.length === 0) {
        return <p className="text-center py-10 text-gray-500"> Didn't make ordere yet </p>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">my orders</h1>
            
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">date</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.trackingId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderQuantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        (order.currentTrackingStatus || order.status) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        (order.currentTrackingStatus || order.status) === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                        (order.currentTrackingStatus || order.status) === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {order.currentTrackingStatus || order.status} 
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td> 
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                   
                                    <Link to={`/dashboard/order-details/${order._id}`} state={{ orderData: order }}>
                                        <button className="text-indigo-600 hover:text-indigo-900 px-2">
                                           details
                                        </button>
                                    </Link>
                                    
                                   
                                    {order.status === 'Pending' && (
                                        <button 
                                            onClick={() => handleCancel(order._id, order.trackingId)}
                                            className="text-red-600 hover:text-red-900 ml-4 px-2"
                                        >
                                           cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;