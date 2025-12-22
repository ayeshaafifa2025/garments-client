import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
       <div>
        <Helmet>
                <title>
                    payment cancelled
                </title>
            </Helmet>

         <div>
            <h2>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my-parcels">
            <button className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">Try Again</button></Link>
        </div>
       </div>
    );
};

export default PaymentCancelled;