


import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { ThemeContext } from '../contexts/ThemeProvider';

const ManagerDashboardHome = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: managerStats = {}, isLoading } = useQuery({
    queryKey: ['manager-stats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/manager/dashboard-stats`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <p className="text-center py-16 text-lg sm:text-xl font-semibold text-indigo-600">
        Loading Manager Dashboard...
      </p>
    );
  }

  const pieDataStock =
    managerStats.stockStats?.map(item => ({
      name: item._id,
      value: item.count,
    })) || [];

  const pieDataTracking =
    managerStats.trackingStats?.map(item => ({
      name: item._id,
      value: item.count,
    })) || [];

  const stockColors = {
    'In Stock': '#10b981',
    'Low Stock': '#f59e0b',
    'Out of Stock': '#ef4444',
  };

  const trackingColors = {
    Processing: '#60a5fa',
    Shipped: '#34d399',
    Delivered: '#22c55e',
    'Awaiting Pickup': '#f97316',
  };

  return (
    <div className={`min-h-screen  ${theme === "light" ? "bg-white" : "bg-gray-600 "} px-4 sm:px-6 lg:px-10 py-6`}>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-gray-800 text-center sm:text-left">
        🧑‍💻 Manager's Hub
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className=" shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-indigo-500">
          <div className=" font-medium">
            Total Products Uploaded
          </div>
          <div className="text-3xl sm:text-4xl font-bold  mt-2">
            {managerStats.totalProducts || 0}
          </div>
          <div className="text-sm  mt-1">
            Your inventory contribution
          </div>
        </div>

        <div className=" shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-red-500">
          <div className=" font-medium">Pending Orders</div>
          <div className="text-3xl sm:text-4xl font-bold  mt-2">
            {managerStats.pendingOrdersCount || 0}
          </div>
          <div className="text-sm font-semibold mt-1">
            Action Required!
          </div>
        </div>

        <div className="shadow-lg rounded-xl p-5 sm:p-6 border-l-4 border-green-500">
          <div className=" font-medium">Orders in Tracking</div>
          <div className="text-3xl sm:text-4xl font-bold  mt-2">
            {managerStats.approvedOrdersCount || 0}
          </div>
          <div className="text-sm  mt-1">
            Approved and being fulfilled
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className=" p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4  text-center sm:text-left">
            Your Inventory Stock Status
          </h3>

          <div className="w-full h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDataStock}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieDataStock.map((entry, index) => (
                    <Cell
                      key={`stock-${index}`}
                      fill={stockColors[entry.name] || '#ccc'}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={value => [`${value} products`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className=" p-4 sm:p-6 rounded-xl shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
            Tracking Status of Approved Orders
          </h3>

          <div className="w-full h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDataTracking}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieDataTracking.map((entry, index) => (
                    <Cell
                      key={`tracking-${index}`}
                      fill={trackingColors[entry.name] || '#ccc'}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={value => [`${value} orders`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardHome;
