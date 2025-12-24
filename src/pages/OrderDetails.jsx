
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router'; 
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';


const DetailItem = ({ label, value, highlight, status }) => {
    let statusClass = '';
    if (status) {
        if (status === 'Paid' || status === 'Delivered') statusClass = 'text-green-600 font-bold';
        else if (status === 'Pending' || status === 'Unpaid') statusClass = 'text-yellow-600 font-bold';
        else if (status === 'Cancelled') statusClass = 'text-red-600 font-bold';
    }

    return (
        <div className={`flex justify-between py-2 border-b last:border-b-0 ${highlight ? 'bg-indigo-50 p-2 rounded-md' : ''}`}>
            <span className="font-medium text-gray-700">{label}:</span>
            <span className={`text-right ${highlight ? 'font-extrabold text-lg text-indigo-800' : 'text-gray-900'} ${statusClass}`}>
                {value}
            </span>
        </div>
    );
}


const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });
        
    } catch (e) { 
        console.error("Date formatting error:", e); 
        return 'Invalid Date';
    }
};

const OrderDetails = () => {
     const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [orderData, setOrderData] = useState(location.state?.orderData || null); 
    const [trackings, setTrackings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrderData = async (orderId) => {
        try {
           
            const res = await axiosSecure.get(`/orders/by-id/${orderId}`);
            setOrderData(res.data);
            return res.data;
        } catch (error) {
            console.error("Error fetching order by ID:", error);
            Swal.fire('Error', ' Failed to load order data', 'error');
            setOrderData(null);
            return null;
        }
    }

    const fetchTrackingData = async (trackingId) => {
        try {
           
            const res = await axiosSecure.get(`/trackings/${trackingId}`);
            setTrackings(res.data.reverse()); 
        } catch (error) {
            console.error("Error loading tracking:", error);
            Swal.fire('Error', ' Failed to load tracking data', 'error');
        }
    }

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true);
            let currentOrder = orderData;

            if (!currentOrder && id) { 
                currentOrder = await fetchOrderData(id);
            }
            
            if (currentOrder?.trackingId) {
                await fetchTrackingData(currentOrder.trackingId);
            }

            setIsLoading(false);
        }
        
        loadAllData();
        
    }, [id, axiosSecure]); 

    
    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600"> Order details is loading </p>;
    }
    if (!orderData) { 
        return <p className="text-center py-10 text-red-500"> Couldn't find order data (ID: {id})</p>;
    }
    
  
    const getStatusColor = (status) => {
        if (status === 'Cancelled') return 'bg-red-500';
        if (status === 'Pending' || status.includes('Pending') || status.includes('Started') || status.includes('Finishing') || status.includes('Checked') || status.includes('Packed')) return 'bg-yellow-500';
        if (status === 'Delivered') return 'bg-green-500';
        if (status === 'Shipped / Out for Delivery') return 'bg-blue-500'; 
        return 'bg-gray-500';
    };

    return (
       <div>
        <Helmet>
                <title>
                    order details
                </title>
            </Helmet>

         <div className={`p-4 sm:p-6 lg:p-8  ${theme === "light" ? "bg-white" : "bg-gray-600 "}`}>
            <h1 className="text-3xl font-bold mb-8 text-gray-800"> Order details: <span className="text-indigo-600">{orderData.trackingId}</span></h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700 border-b pb-2"> main info</h2>
                    
                    <DetailItem label="product" value={orderData.productTitle} />
                    <DetailItem label="quantity" value={`${orderData.orderQuantity} piece`} />
                    <DetailItem label="total price" value={`${orderData.finalPrice}`} highlight />
                    <DetailItem label="payment status" value={orderData.paymentStatus} status={orderData.paymentStatus} />
                    <DetailItem label=" Delivery status" value={orderData.currentTrackingStatus || orderData.status} status={orderData.currentTrackingStatus || orderData.status} />

                    <h3 className="text-xl font-medium mt-6 mb-3 border-t pt-4 text-gray-700"> Delivery address </h3>
                    <p className="text-gray-600 text-base">{orderData.deliveryAddress}</p>
                    <p className="text-gray-600 text-base">contact: {orderData.contactNumber}</p>
                </div>


                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b pb-2"> Tracking timeline </h2>
                    <div className="space-y-6">
                        {trackings.length > 0 ? (
                            trackings.map((log, index) => (
                                <div key={log._id} className="flex relative">
                                    
                                   
                                    {index < trackings.length - 1 && (
                                        <div className="absolute left-3 top-6 bottom-[-24px] w-0.5 bg-gray-300"></div>
                                    )}

                                 
                                    <div className={`w-6 h-6 rounded-full ${getStatusColor(log.status)} flex items-center justify-center text-white z-10`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    
                              
                                    <div className="ml-4 pt-1 flex-1">
                                        <p className="font-semibold capitalize text-gray-800">{log.status}</p>
                                        
                                      
                                        {log.location && log.location !== 'N/A' && (
                                            <p className="text-sm text-gray-600">location: {log.location}</p>
                                        )}
                                   
                                        {log.note && (
                                            <p className="text-xs text-gray-700 italic border-l-2 pl-2 mt-1">{log.note}</p>
                                        )}

                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDate(log.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500"> Didn't find any tracking info </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
};

export default OrderDetails;