


// import React, { useContext, useEffect, useState } from 'react';
// import useAuth from '../hooks/useAuth';
// import Swal from 'sweetalert2'; 
// import { Link } from 'react-router'; 
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { Helmet } from 'react-helmet-async';
// import { ThemeContext } from '../contexts/ThemeProvider';


// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('bn-BD');
// };

// const MyOrders = () => {
//      const { theme, toggleTheme } = useContext(ThemeContext);
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
    
//     const [orders, setOrders] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const fetchOrders = () => {
//         if (user?.email) {
//             setIsLoading(true);
            
//             axiosSecure.get(`/orders/${user.email}`) 
            
//                 .then(res => {
//                     setOrders(res.data);
//                     setIsLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Error loading orders:", error);
//                     setIsLoading(false);
//                     Swal.fire('Error', ' Failed to load order', 'error');
//                 });
//         } else {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchOrders();
//     }, [user, axiosSecure]); 

    
//     const handleCancel = (orderId, trackingId) => {
//         Swal.fire({
//             title: " Are you sure?",
//             text: " Won't recover it anymore after canceling!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: " Yeah I want to cancel!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/orders/cancel/${orderId}`)
//                     .then(res => {
//                         if (res.data.success) {
//                             Swal.fire(
//                                 'Canceled!',
//                                 `Order ${trackingId} has been cancelled successfully`,
//                                 'success'
//                             );
//                             fetchOrders(); 
//                         } else {
//                             Swal.fire(
//                                 'Failed',
//                                 res.data.message || `Order ${trackingId} could not cancel`,
//                                 'error'
//                             );
//                         }
//                     })
//                     .catch(error => {
//                         console.error("Cancellation Error:", error);
//                         Swal.fire('Error', ' Server error to cancel order', 'error');
//                     });
//             }
//         });
//     };
    
//     if (!user) {
//         return <p className="text-center py-10 text-red-500"> Please log in to view your orders. </p>
//     }
//     if (isLoading) {
//         return <p className="text-center py-10 text-indigo-600"> Loading your orders...</p>;
//     }
//     if (orders.length === 0) {
//         return <p className="text-center py-10 text-gray-500 text-xl font-semibold"> You have no orders yet. </p>;
//     }

//     return (
//         <div className={`min-h-screen  ${theme === "light" ? "bg-white" : "bg-gray-600 "}`}>
//             <Helmet>
//                 <title>
//                     My Orders
//                 </title>
//             </Helmet>

//             <div className="p-4 sm:p-6 lg:p-8">
//                 <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
                
//                 <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">TRACKING ID</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">PAYMENT</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
//                                 <th className="px-3 sm:px-4 lg:px-6 py-3 text-center text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {orders.map((order) => (
//                                 <tr key={order._id}>
                                    
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-indigo-600">{order.trackingId}</td>
                                    
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{order.productTitle}</td>
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.orderQuantity}</td>
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full ${
//                                             (order.currentTrackingStatus || order.status) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
//                                             (order.currentTrackingStatus || order.status) === 'Cancelled' ? 'bg-red-100 text-red-800' : 
//                                             (order.currentTrackingStatus || order.status) === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
//                                         }`}>
//                                             {order.currentTrackingStatus || order.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                             {order.paymentStatus}
//                                         </span>
//                                     </td>
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{formatDate(order.createdAt)}</td> 
//                                     <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-medium flex flex-col gap-5 items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                                        
//                                         <Link to={`/dashboard/order-details/${order._id}`} state={{ orderData: order }}>
//                                             <button className="
//                                           text-gray-700 bg-white shadow 
//     border border-gray-300
//     text-[10px] sm:text-xs 
//     px-2 py-1 sm:px-3 sm:py-1.5 
//     rounded-lg 
//     font-medium shadow-md transition-all duration-300
//     hover:text-white 
//     hover:bg-purple-600 
//     hover:border-purple-600
//     hover:scale-[1.05]
//                                             ">
//                                                 Details
//                                             </button>
//                                         </Link>
                                        
//                                         <Link to={`/dashboard/track-order/${order.trackingId}`}>
//                                             <button className="
//                                               text-gray-700 bg-white shadow 
//     border border-gray-300
//     text-[10px] sm:text-xs 
//     px-2 py-1 sm:px-3 sm:py-1.5 
//     rounded-lg 
//     font-medium shadow-md transition-all duration-300
//     hover:text-white 
//     hover:bg-purple-600 
//     hover:border-purple-600
//     hover:scale-[1.05]
//                                             ">
//                                                 Track Order
//                                             </button>
//                                         </Link>
                                        
                                        
//                                         {order.status === 'Pending' && (
//                                             <button 
//                                                 onClick={() => handleCancel(order._id, order.trackingId)}
//                                                 className="
//                                                    text-gray-700 bg-white shadow 
//     border border-gray-300
//     text-[10px] sm:text-xs 
//     px-2 py-1 sm:px-3 sm:py-1.5 
//     rounded-lg 
//     font-medium shadow-md transition-all duration-300
//     hover:text-white 
//     hover:bg-purple-600 
//     hover:border-purple-600
//     hover:scale-[1.05]
//                                                 "
//                                             >
//                                                 Cancel
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyOrders;



import React, { useContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router'; // 👈 Link-এর ইমপোর্ট React Router DOM থেকে হয়
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';
import { format } from 'date-fns'; // 👈 date-fns ইমপোর্ট করা হলো

// formatDate ফাংশনটি আপডেট করা হলো
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // ফরম্যাট: DD/MM/YYYY HH:MM (ইংরেজি সংখ্যায়)
    return format(date, 'dd/MM/yyyy HH:mm'); 
};

const MyOrders = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
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
        // dep array তে axiosSecure থাকা উচিত নয়, কারণ এটি সাধারণত রেন্ডারিং-এ পরিবর্তন হয় না
        // শুধু user.email যথেষ্ট
        if(user?.email) {
             fetchOrders();
        }
    }, [user]); 

    
    const handleCancel = (orderId, trackingId) => {
        Swal.fire({
            title: " Are you sure?",
            text: " Won't recover it anymore after canceling!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: " Yeah I want to cancel!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/orders/cancel/${orderId}`)
                    .then(res => {
                        if (res.data.success) {
                            Swal.fire(
                                'Canceled!',
                                `Order ${trackingId} has been cancelled successfully`,
                                'success'
                            );
                            fetchOrders(); 
                        } else {
                            Swal.fire(
                                'Failed',
                                res.data.message || `Order ${trackingId} could not cancel`,
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        console.error("Cancellation Error:", error);
                        Swal.fire('Error', ' Server error to cancel order', 'error');
                    });
            }
        });
    };
    
    if (!user) {
        return <p className="text-center py-10 text-red-500"> Please log in to view your orders. </p>
    }
    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600"> Loading your orders...</p>;
    }
    if (orders.length === 0) {
        return <p className="text-center py-10 text-gray-500 text-xl font-semibold"> You have no orders yet. </p>;
    }

    return (
        <div className={`min-h-screen  ${theme === "light" ? "bg-white" : "bg-gray-600 "}`}>
            <Helmet>
                <title>
                    My Orders
                </title>
            </Helmet>

            <div className="p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
                
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">TRACKING ID</th>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT</th>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">QTY</th>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">PAYMENT</th>
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">DATE & TIME</th> {/* টেবিল হেডার আপডেট করা হলো */}
                                <th className="px-3 sm:px-4 lg:px-6 py-3 text-center text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-indigo-600">{order.trackingId}</td>
                                    
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{order.productTitle}</td>
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.orderQuantity}</td>
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full ${
                                            (order.currentTrackingStatus || order.status) === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                            (order.currentTrackingStatus || order.status) === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                            (order.currentTrackingStatus || order.status) === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {order.currentTrackingStatus || order.status}
                                        </span>
                                    </td>
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-[10px] sm:text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    {/* 👈 আপডেট করা formatDate ব্যবহার করা হলো */}
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{formatDate(order.createdAt)}</td> 
                                    <td className="px-3 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-center text-xs sm:text-sm font-medium flex flex-col gap-5 items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                                        
                                        <Link to={`/dashboard/order-details/${order._id}`} state={{ orderData: order }}>
                                            <button className="
                                                text-gray-700 bg-white shadow 
                                                border border-gray-300
                                                text-[10px] sm:text-xs 
                                                px-2 py-1 sm:px-3 sm:py-1.5 
                                                rounded-lg 
                                                font-medium shadow-md transition-all duration-300
                                                hover:text-white 
                                                hover:bg-purple-600 
                                                hover:border-purple-600
                                                hover:scale-[1.05]
                                            ">
                                                Details
                                            </button>
                                        </Link>
                                        
                                        <Link to={`/dashboard/track-order/${order.trackingId}`}>
                                            <button className="
                                                text-gray-700 bg-white shadow 
                                                border border-gray-300
                                                text-[10px] sm:text-xs 
                                                px-2 py-1 sm:px-3 sm:py-1.5 
                                                rounded-lg 
                                                font-medium shadow-md transition-all duration-300
                                                hover:text-white 
                                                hover:bg-purple-600 
                                                hover:border-purple-600
                                                hover:scale-[1.05]
                                            ">
                                                Track Order
                                            </button>
                                        </Link>
                                        
                                        
                                        {order.status === 'Pending' && (
                                            <button 
                                                onClick={() => handleCancel(order._id, order.trackingId)}
                                                className="
                                                    text-gray-700 bg-white shadow 
                                                    border border-gray-300
                                                    text-[10px] sm:text-xs 
                                                    px-2 py-1 sm:px-3 sm:py-1.5 
                                                    rounded-lg 
                                                    font-medium shadow-md transition-all duration-300
                                                    hover:text-white 
                                                    hover:bg-red-500 
                                                    hover:border-red-500
                                                    hover:scale-[1.05]
                                                "
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;