

import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { Truck, Eye } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { format } from 'date-fns';
import AddTrackingModal from '../modal/AddTrackingModal';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';

const ApprovedOrders = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const managerEmail = user?.email;
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: approvedOrders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['approved-orders', managerEmail],
    queryFn: async () => {
      if (!managerEmail) return [];
      const res = await axiosSecure.get(
        `/manager-approved-orders?email=${managerEmail}`
      );
      return res.data;
    },
    enabled: !!managerEmail,
  });

  const handleAddTracking = order => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (!managerEmail)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Please login
      </div>
    );

  if (isLoading)
    return (
      <div className="text-center py-16 text-indigo-600 text-lg">
        Loading from approved orders...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 p-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className={`min-h-screen  px-4 sm:px-6 lg:px-10 py-6  ${theme === "light" ? "bg-white" : "bg-gray-600 "}` }>
      <Helmet>
        <title>approved orders</title>
      </Helmet>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6  border-b pb-3">
        Approved Orders
      </h2>

      <p className="mb-6 text-gray-600">
        Start to update tracking
      </p>

      {approvedOrders.length === 0 ? (
        <div className="text-center text-lg sm:text-xl text-gray-500 py-20  rounded-xl shadow">
          No approved order
        </div>
      ) : (
        <div className="overflow-x-auto  rounded-xl shadow-xl">
          <table className="min-w-[900px] w-full divide-y ">
            <thead className="">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Buyer
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold  uppercase">
                  Approved Date
                </th>
                <th className="px-4 py-3 text-center text-xs font-bold  uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-gray-200">
              {approvedOrders.map(order => {
                const status =
                  order.currentTrackingStatus || order.status;

                const badge =
                  status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : status === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800';

                return (
                  <tr key={order._id} className="">
                    <td className="px-4 py-3 text-sm font-semibold ">
                      {order.trackingId || 'N/A'}
                    </td>

                    <td className="px-4 py-3 text-sm ">
                      {order.firstName} {order.lastName}
                      <div className="text-xs ">
                        {order.buyerEmail}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm font-medium ">
                      {order.productTitle}
                    </td>

                    <td className="px-4 py-3 text-sm ">
                      {order.orderQuantity}
                    </td>

                    <td className="">
                      <span
                        className={`text-xs  `}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {order.approvedAt
                        ? format(
                            new Date(order.approvedAt),
                            'dd MMM, yyyy h:mm a'
                          )
                        : 'N/A'}
                    </td>

                    <td className="px-4 py-3 text-center space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row justify-center">
                      <button
                        onClick={() => handleAddTracking(order)}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg  shadow hover:scale-105 transition"
                      >
                        <Truck className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          Add Tracking
                        </span>
                      </button>

                      <Link
                        to={`/dashboard/order-details/${order._id}`}
                        state={{ orderData: order }}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border "
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <AddTrackingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          refetchOrders={refetch}
        />
      )}
    </div>
  );
};

export default ApprovedOrders;




