import React, { useContext } from 'react';
import { FaShippingFast, FaCheckCircle, FaBoxes, FaClock } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeProvider';

const features = [
    { icon: <FaShippingFast className="text-4xl text-indigo-500 mb-2" />, title: "Fast Delivery", desc: "Get your garments delivered on time without delays." },
    { icon: <FaCheckCircle className="text-4xl text-indigo-500 mb-2" />, title: "Quality Assurance", desc: "Every product goes through strict quality checks." },
    { icon: <FaBoxes className="text-4xl text-indigo-500 mb-2" />, title: "Wide Variety", desc: "Multiple categories and designs for every need." },
    { icon: <FaClock className="text-4xl text-indigo-500 mb-2" />, title: "Real-time Tracking", desc: "Track your order from production to delivery easily." },
];

const WhyChooseUs = () => {
    const{theme,toggleTheme}= useContext(ThemeContext)
    return (
        <section className={`py-16 mb-5 ${theme === "light" ? "bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 " : "bg-gray-600 "}`}>
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose StitchFlow Tracker?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                            {feature.icon}
                            <h3 className="font-semibold text-black text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
