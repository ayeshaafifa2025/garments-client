import React from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
       <div>
        <Helmet>
                <title>
                    contact-us
                </title>
            </Helmet>

         <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

            <p className="text-gray-600 mb-4">
                Have questions or need support? We are here to help you.
            </p>

            <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> support@stitchflow.com</p>
                <p><strong>Phone:</strong> +880 1234 567 890</p>
                <p><strong>Address:</strong> Dhaka, Bangladesh</p>
            </div>

            <p className="text-gray-500 mt-4 text-sm">
                Our support team is available Sunday to Thursday, 10:00 AM – 6:00 PM.
            </p>
        </div>
       </div>
    );
};

export default Contact;
