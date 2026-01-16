import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
       <div>
        <Helmet>
                <title>
                    about-us
                </title>
            </Helmet>

         <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">About StitchFlow Tracker</h2>
            <p className=" leading-relaxed">
                StitchFlow Tracker is a modern garment order and production tracking system
                designed to simplify the workflow between buyers, managers, and administrators.
                From order placement to production stages such as cutting, sewing, finishing,
                and delivery, the platform ensures transparency, efficiency, and real-time updates.
            </p>

            <p className=" leading-relaxed mt-4">
                Our goal is to help garment factories reduce delays, manage products efficiently,
                and deliver quality products on time with a smooth digital experience.
            </p>
        </div>
       </div>
    );
};

export default About;
