import React from 'react';
import { FaUsers, FaBoxOpen, FaSmile, FaShoppingCart } from 'react-icons/fa';

const stats = [
    { icon: <FaShoppingCart className="text-4xl text-teal-500 mb-2" />, number: "15k+", label: "Orders Completed" },
    { icon: <FaUsers className="text-4xl text-teal-500 mb-2" />, number: "5", label: "Active Managers" },
    { icon: <FaBoxOpen className="text-4xl text-teal-500 mb-2" />, number: "500+", label: "Products Available" },
    { icon: <FaSmile className="text-4xl text-teal-500 mb-2" />, number: "3k+", label: "Happy Customers" },
];

const StatsSection = () => {
    return (
        <section className="bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            {stat.icon}
                            <h3 className="font-bold text-2xl">{stat.number}</h3>
                            <p className="text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
