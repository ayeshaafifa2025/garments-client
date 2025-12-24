

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X, Send } from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const TRACKING_STATUSES = [
  'Cutting Completed',
  'Sewing Started',
  'Finishing',
  'QC Checked',
  'Packed',
  'Shipped / Out for Delivery',
  'Delivered',
];

const AddTrackingModal = ({ isOpen, onClose, order, refetchOrders }) => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const updateTrackingMutation = useMutation({
    mutationFn: trackingData =>
      axiosSecure.patch(`/orders/${order._id}/tracking`, trackingData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approved-orders'] });
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      queryClient.invalidateQueries({
        queryKey: ['order-details', order._id],
      });

      refetchOrders();
      toast.success('Tracking updated successfully');
      onClose();
    },

    onError: error => {
      toast.error(
        error.response?.data?.message ||
          'Tracking update failed'
      );
    },
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!status || !location) {
      toast.warning('Status & location required');
      return;
    }

    updateTrackingMutation.mutate({
      newLogStatus: status,
      location,
      note,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-50 border-b">
          <h3 className="text-lg sm:text-xl font-bold text-indigo-700">
            Add Tracking Update
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-indigo-100 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4"
        >
          <div className="text-sm text-gray-600 font-medium border-b pb-2">
            Order ID:{' '}
            <span className="text-indigo-600 font-semibold">
              {order.trackingId || 'N/A'}
            </span>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tracking Status <span className="text-red-500">*</span>
            </label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full p-3 text-black rounded-lg border focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a step</option>
              {TRACKING_STATUSES.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Dhaka Hub / In Transit"
              className="w-full p-3 rounded-lg border focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notes (optional)
            </label>
            <textarea
              rows="2"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Additional information"
              className="w-full p-3 rounded-lg border focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={updateTrackingMutation.isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition ${
              updateTrackingMutation.isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <Send className="w-4 h-4" />
            {updateTrackingMutation.isLoading
              ? 'Saving...'
              : 'Add Status Log'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrackingModal;
