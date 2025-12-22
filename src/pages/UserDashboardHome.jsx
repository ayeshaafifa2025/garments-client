import React from 'react';
import useAuth from '../hooks/useAuth'; 
import { Link } from 'react-router'; 

const UserDashboardHome = () => {
    const { user } = useAuth();
    
    
    const userRole = 'General User'; 

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
                    👋 Welcome, {user?.displayName || 'User'}!
                </h1>
                <p className="text-gray-600 text-lg">
                    This is your personalized account area.
                </p>
            </header>

            {/* 1. Account Summary Card */}
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-2xl border-t-4 border-indigo-500 mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                    Account Overview
                </h3>
                <div className="space-y-3">
                    <p className="flex justify-between border-b pb-1">
                        <span className="font-medium text-gray-600">Name:</span>
                        <span className="text-gray-800">{user?.displayName || 'N/A'}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="text-gray-800">{user?.email || 'N/A'}</span>
                    </p>
                    <p className="flex justify-between border-b pb-1">
                        <span className="font-medium text-gray-600">Role:</span>
                        <span className="text-indigo-600 font-bold">{userRole}</span>
                    </p>
                   
                    {user?.photoURL && (
                        <div className="pt-4 flex justify-center">
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400"
                            />
                        </div>
                    )}
                </div>
            </div>

           
            <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                    Explore Our Site
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <Link to="/" className="p-5 bg-white shadow-lg rounded-xl transition duration-300 hover:shadow-xl hover:bg-indigo-50 flex flex-col items-center text-center">
                        <span className="text-4xl text-indigo-500 mb-2">🏠</span>
                        <h4 className="font-bold text-gray-800">Home Page</h4>
                        <p className="text-sm text-gray-500">Go back to the main site.</p>
                    </Link>

                    <Link to="/products" className="p-5 bg-white shadow-lg rounded-xl transition duration-300 hover:shadow-xl hover:bg-indigo-50 flex flex-col items-center text-center">
                        <span className="text-4xl text-indigo-500 mb-2">🛍️</span>
                        <h4 className="font-bold text-gray-800">Products</h4>
                        <p className="text-sm text-gray-500">Browse all available items.</p>
                    </Link>

                  
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHome;
