


import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';

const formatOrderDate = dateString => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return 'Invalid Date';
  }
};

const PendingOrders = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pendingOrders', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager-pending-orders?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleUpdateStatus = (orderId, trackingId, action) => {
    const newStatus = action === 'approve' ? 'Approved' : 'Rejected';

    Swal.fire({
      title: `Confirm ${action}?`,
      text: `Change order status to ${newStatus}?`,
      icon: action === 'approve' ? 'question' : 'warning',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#22c55e' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${action}`,
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/orders/${orderId}/status`,
            {
              newStatus,
              trackingId,
            }
          );

          if (res.data.success) {
            toast.success(`Order ${newStatus}`);
            refetch();
          } else {
            toast.error(res.data.message || 'Update failed');
          }
        } catch {
          toast.error('Network error');
        }
      }
    });
  };

  if (!user)
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Please login to manage orders
      </div>
    );

  if (isLoading)
    return (
      <div className="text-center py-16 text-indigo-600 text-lg">
        Loading pending orders...
      </div>
    );

  if (pendingOrders.length === 0)
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Pending Orders
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mt-4">
          🎉 No pending orders
        </p>
      </div>
    );

  return (
    <div className={`min-h-screen  ${theme === "light" ? "bg-white" : "bg-gray-600 "} px-4 sm:px-6 lg:px-10 py-6`}>
      <Helmet>
        <title>Pending orders</title>
      </Helmet>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Pending Orders ({pendingOrders.length})
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
        <table className="min-w-[850px] w-full divide-y divide-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase">
                Buyer
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase">
                Qty
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-orange-700 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold text-orange-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y  divide-gray-200">
            {pendingOrders.map(order => (
              <tr key={order._id} className="  hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-semibold text-red-600">
                  {order.trackingId || 'N/A'}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {order.firstName} {order.lastName}
                  <div className="text-xs text-gray-400">
                    {order.buyerEmail}
                  </div>
                </td>

                <td className="px-4 py-3 text-sm font-medium text-gray-700">
                  {order.productTitle}
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.orderQuantity}
                </td>

                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatOrderDate(order.createdAt)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          order._id,
                          order.trackingId,
                          'approve'
                        )
                      }
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 shadow hover:scale-105 transition"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        Approve
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          order._id,
                          order.trackingId,
                          'reject'
                        )
                      }
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 shadow hover:scale-105 transition"
                    >
                      <FiXCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        Reject
                      </span>
                    </button>

                    <Link
                      to={`/dashboard/order-details/${order._id}`}
                      state={{ orderData: order }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
                    >
                      <FiEye className="w-4 h-4" />
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;
