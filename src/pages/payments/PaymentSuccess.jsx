
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router'; // ⚠️ V6+ এর জন্য

import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {

            axiosSecure.post(`/payment-success?session_id=${sessionId}`) 
                .then(res => {
                    console.log('Payment Success Response:', res.data);
                    if (res.data.success || res.data.message === 'already exists') {
                        setPaymentInfo(res.data);
                    } else {
                        setPaymentInfo({ error: " Couldn't confirm payment" });
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Payment Success Error:", err);
                    setPaymentInfo({ error: " Couldn't contact with server" });
                    setIsLoading(false);
                });
        }
    }, [sessionId, axiosSecure]);

    if (isLoading) {
        return <p className="text-center text-xl mt-10 text-indigo-600"> Confirming payment Please wait </p>;
    }
    if (paymentInfo?.error) {
        return <p className="text-center text-red-500 text-xl mt-10">❌ problem: {paymentInfo.error}</p>;
    }

    return (
        <div className="container mx-auto p-6 pt-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4 text-green-600">✅ payment successful!</h2>
            <p className="text-lg text-gray-700 mb-6"> Successfully created order </p>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl inline-block max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-indigo-700"> Powder details </h3>
                <p className="text-left py-1"><strong>tracking id:</strong> <span className="font-mono text-lg">{paymentInfo?.trackingId || 'N/A'}</span></p>
                <p className="text-left py-1"><strong>transaction id:</strong> <span className="font-mono text-lg">{paymentInfo?.transactionId || 'N/A'}</span></p>
                
                <Link to="/dashboard/my-orders">
                    <button className='mt-8 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300'>
                        see your order
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;

