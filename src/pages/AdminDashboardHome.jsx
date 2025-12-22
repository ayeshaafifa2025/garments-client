

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminStats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/dashboard-stats');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <p className="text-center py-16 text-xl font-semibold text-indigo-600">
        Loading Admin Dashboard...
      </p>
    );
  }

  if (!adminStats?.totalUsers) {
    return (
      <p className="text-center py-16 text-xl text-red-600">
        No admin data found. Please check backend or database.
      </p>
    );
  }

  const pieDataRoles =
    adminStats.userRoles?.map(item => ({
      name: item._id,
      value: item.count
    })) || [];

  const pieDataOrders =
    adminStats.orderStatuses?.map(item => ({
      name: item._id,
      value: item.count
    })) || [];

  const barDataCategories =
    adminStats.productCategories?.map(item => ({
      name: item._id,
      count: item.count
    })) || [];

  const roleColors = {
    Admin: '#06b6d4',
    Manager: '#f97316',
    Buyer: '#4f46e5'
  };

  const orderColors = {
    Approved: '#22c55e',
    Pending: '#facc15',
    Delivered: '#4ade80',
    Rejected: '#ef4444'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-gray-800">
        📊 Admin Control Panel
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
          <p className="text-gray-500 font-medium">Total Users</p>
          <h2 className="text-4xl font-bold text-indigo-700">
            {adminStats.totalUsers}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Registered accounts
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-gray-500 font-medium">Total Products</p>
          <h2 className="text-4xl font-bold text-green-600">
            {adminStats.totalProducts}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Inventory items
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <p className="text-gray-500 font-medium">Total Orders</p>
          <h2 className="text-4xl font-bold text-red-600">
            {adminStats.totalOrders}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            All-time orders
          </p>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            User Roles Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieDataRoles}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieDataRoles.map((entry, index) => (
                  <Cell
                    key={`role-${index}`}
                    fill={roleColors[entry.name] || '#c7d2fe'}
                  />
                ))}
              </Pie>
              <Tooltip formatter={v => [`${v} users`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieDataOrders}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieDataOrders.map((entry, index) => (
                  <Cell
                    key={`order-${index}`}
                    fill={orderColors[entry.name] || '#e5e7eb'}
                  />
                ))}
              </Pie>
              <Tooltip formatter={v => [`${v} orders`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Products by Category
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={barDataCategories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-25}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Products" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
