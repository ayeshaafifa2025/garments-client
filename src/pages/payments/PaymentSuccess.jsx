
import React, { useEffect, useState } from 'react';

import { useSearchParams, Link } from 'react-router'; 
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!sessionId) {
            setPaymentInfo({ error: "Session ID missing from URL." });
            setIsLoading(false);
            return;
        }


        const controller = new AbortController();
        const signal = controller.signal;

        axiosSecure.post(`/payment-success?session_id=${sessionId}`, {}, { signal }) 
            .then(res => {
                console.log('Payment Success Response:', res.data);
                

                if (res.data.success) { 
                    setPaymentInfo(res.data);
                } else {
                    
                    setPaymentInfo({ error: res.data.message || "Couldn't confirm payment (Unknown Status)" });
                }
                setIsLoading(false);
            })
            .catch(err => {
              
                if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') { 
                    console.log('Payment Success fetch aborted.');
                    return; 
                }
                
                console.error("Payment Success Error:", err);
              
                setPaymentInfo({ error: "Couldn't contact with server" });
                setIsLoading(false);
            });
            
        return () => {
           
            controller.abort();
        };
        
    }, [sessionId, axiosSecure]);

    if (isLoading) {
        return <p className="text-center text-xl mt-10 text-indigo-600"> Confirming payment Please wait </p>;
    }
    if (paymentInfo?.error) {
        return <p className="text-center text-red-500 text-xl mt-10">❌ Problem: {paymentInfo.error}</p>;
    }

    return (
      <div>
        <Helmet>
                <title>
                    payment success
                </title>
            </Helmet>

          <div className="container mx-auto p-6 pt-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4 text-green-600">✅ Payment Successful!</h2>
            <p className="text-lg text-gray-700 mb-6">Successfully created order.</p>
            
            <div className="bg-white p-8 rounded-xl shadow-2xl inline-block max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-indigo-700">Order Details</h3>
                
              
                
                <p className="text-left text-black py-1"><strong>Tracking ID:</strong> <span className="font-mono text-black text-lg">{paymentInfo?.trackingId || 'N/A'}</span></p>
                <p className="text-left text-black py-1"><strong>Transaction ID:</strong> <span className="font-mono text-black text-lg">{paymentInfo?.transactionId || 'N/A'}</span></p>
                
                <Link to="/dashboard/my-orders">
                    <button className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">
                        See Your Order
                    </button>
                </Link>
            </div>
        </div>
      </div>
    );
};

export default PaymentSuccess;