


import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router';

const UserDashboardHome = () => {
  const { user } = useAuth();

  const userRole = 'General User';

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
          👋 Welcome, {user?.displayName || 'User'}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Manage your account & explore products easily
        </p>
      </header>

      {/* Account Card */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500 mb-12">
        <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-800 text-center">
          Account Overview
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Name</span>
            <span className="text-gray-800 font-semibold">
              {user?.displayName || 'N/A'}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email</span>
            <span className="text-gray-800">
              {user?.email || 'N/A'}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Role</span>
            <span className="text-indigo-600 font-bold">
              {userRole}
            </span>
          </div>

          {user?.photoURL && (
            <div className="pt-4 flex justify-center">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-300 shadow"
              />
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Quick Navigation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center hover:bg-indigo-50"
          >
            <span className="text-4xl mb-3">🏠</span>
            <h4 className="font-bold text-lg text-gray-800">
              Home
            </h4>
            <p className="text-sm text-gray-500">
              Return to main website
            </p>
          </Link>

          <Link
            to="/products"
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center hover:bg-indigo-50"
          >
            <span className="text-4xl mb-3">🛍️</span>
            <h4 className="font-bold text-lg text-gray-800">
              Products
            </h4>
            <p className="text-sm text-gray-500">
              Browse available products
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;

