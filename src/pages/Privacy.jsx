import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
       <div>
        <Helmet>
                <title>
                    our privacy and policy
                </title>
            </Helmet>

         <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

            <p className=" leading-relaxed">
                At StitchFlow Tracker, we respect your privacy and are committed to protecting
                your personal information. We collect only the necessary data required to
                provide our services, such as account details and order information.
            </p>

            <p className=" leading-relaxed mt-4">
                We do not share user data with third parties without consent. All data is
                securely stored and used solely for improving system functionality and user
                experience.
            </p>
        </div>
       </div>
    );
};

export default Privacy;
