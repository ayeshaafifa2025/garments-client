import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Our terms and conditions
                </title>
            </Helmet>

            <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>

            <p className=" leading-relaxed">
                By using StitchFlow Tracker, you agree to comply with our terms and conditions.
                Users are responsible for maintaining the accuracy of their account information
                and ensuring that all activities performed under their account follow system
                rules.
            </p>

            <p className=" leading-relaxed mt-4">
                Managers must manage products and orders responsibly, while buyers must provide
                accurate order details. Any misuse of the system may result in account suspension.
            </p>
        </div>
        </div>
    );
};

export default Terms;

