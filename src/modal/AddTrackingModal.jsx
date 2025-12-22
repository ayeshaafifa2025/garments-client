
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Truck, X, Send } from 'lucide-react'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { toast } from 'react-toastify';

const TRACKING_STATUSES = [
    'Cutting Completed',
    'Sewing Started',
    'Finishing',
    'QC Checked',
    'Packed',
    'Shipped / Out for Delivery',
    'Delivered'
];

const AddTrackingModal = ({ isOpen, onClose, order, refetchOrders }) => {
    
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const updateTrackingMutation = useMutation({
        mutationFn: (trackingData) => {
            return axiosSecure.patch(`/orders/${order._id}/tracking`, trackingData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['approved-orders'] });
            queryClient.invalidateQueries({ queryKey: ['my-orders'] }); 
            queryClient.invalidateQueries({ queryKey: ['order-details', order._id] }); 
            refetchOrders();
            toast('tracking updated successfully');
            onClose();
        },
        onError: (error) => {
            console.error('Tracking Update Error:', error);
            toast(` tracking update problem: ${error.response?.data?.message || error.message}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!status || !location) {
            toast(' Please select status');
            return;
        }

        const trackingData = {
            newLogStatus: status,
            location: location,
            note: note,
        };
        
        updateTrackingMutation.mutate(trackingData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300">
                
                
                <div className="p-5 border-b flex justify-between items-center bg-indigo-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-indigo-700"> Add tracking update </h3>
                    <button onClick={onClose} className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">
                        <X className="w-6 h-6"/>
                    </button>
                </div>

             
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <p className="text-sm text-gray-600 font-semibold border-b pb-2">order id : <span className="text-indigo-600">{order.trackingId || 'N/A'}</span></p>

                
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Select New Status: <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>-- Select a step --</option>
                            {TRACKING_STATUSES.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                   
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            current(Location): <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="suppose: Dhaka Production Hub / In Transit"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                           Additional notes
                        </label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows="2"
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder=" Succeeded"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white shadow-sm transition flex items-center justify-center space-x-2 ${
                            updateTrackingMutation.isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                        disabled={updateTrackingMutation.isLoading}
                    >
                        <Send className="w-5 h-5"/>
                        {updateTrackingMutation.isLoading ? ' Log is saving...' : ' Add status log'}
                    </button>
                    {updateTrackingMutation.isError && <p className="text-red-500 text-sm mt-2 text-center"> Failed to update </p>}
                </form>

            </div>
        </div>
    );
};

export default AddTrackingModal;