import React, { useContext } from 'react';
import { FaUsers, FaBoxOpen, FaSmile, FaShoppingCart } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeProvider';

const stats = [
    { icon: <FaShoppingCart className="text-4xl text-teal-500 mb-2" />, number: "15k+", label: "Orders Completed" },
    { icon: <FaUsers className="text-4xl text-teal-500 mb-2" />, number: "5", label: "Active Managers" },
    { icon: <FaBoxOpen className="text-4xl text-teal-500 mb-2" />, number: "500+", label: "Products Available" },
    { icon: <FaSmile className="text-4xl text-teal-500 mb-2" />, number: "3k+", label: "Happy Customers" },
];

const StatsSection = () => {
    const{theme,toggleTheme}= useContext(ThemeContext)
    return (
        <section className={` py-8 ${theme === "light" ? "bg-base-100 " : "bg-gray-600 "}`}>
            <div className="px-4 mx-auto ">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className=" rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            {/* {stat.icon} */}
                            <h3 className="font-bold text-2xl text-black">{stat.number}</h3>
                            <p className="text-black">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
