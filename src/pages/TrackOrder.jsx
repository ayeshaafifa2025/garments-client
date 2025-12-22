

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router'; 
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { Helmet } from 'react-helmet-async';

const TrackOrder = () => {
    const { trackingId } = useParams();
    const axiosSecure = useAxiosSecure(); 
    const { data: trackings = [], isLoading, error } = useQuery({
        queryKey: ['tracking-logs', trackingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trackings/${trackingId}`);
            return res.data;
        },
        enabled: !!trackingId, 
    });

    if (isLoading) {
        return <div className='p-8 text-center text-xl font-semibold text-indigo-600'> Order tracking log is loading...</div>;
    }
    if (error) {
        return <div className='p-8 text-center text-xl font-semibold text-red-500'> Failed to load tracking log: {error.message}</div>;
    }
    if (trackings.length === 0) {
        return <div className='p-8 text-center text-xl font-semibold text-gray-500'> Didn't find any tracking log for this order ID: <span className='font-bold text-gray-800'>{trackingId}</span></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>
                    Track Order
                </title>
            </Helmet>

            <div className='container mx-auto p-4 sm:p-6 lg:p-10'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center lg:text-left'>
                    Order Tracking for ID: <span className="text-indigo-600 break-all">{trackingId}</span>
                </h2>
                
                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl">
                    <ul className="timeline timeline-vertical">
                        {
                            trackings.map((log, index) => <li key={log._id}>
                                
                                <div className="timeline-start text-xs sm:text-sm text-gray-500 pr-4 w-full md:w-auto md:text-right">
                                    {new Date(log.createdAt).toLocaleString('en-GB', { 
                                        year: 'numeric', 
                                        month: '2-digit', 
                                        day: '2-digit', 
                                        hour: '2-digit', 
                                        minute: '2-digit', 
                                        hour12: true 
                                    })}
                                </div>
                                
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5 text-green-500"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end timeline-box p-3 sm:p-4 bg-gray-50 shadow-md rounded-lg mb-6 sm:mb-8 border border-gray-100">
                                    <span className='text-sm sm:text-md font-semibold text-gray-700'>{log.details || log.status}</span>
                                    
                                    {log.details && log.status && <p className="text-xs text-indigo-500 mt-1">Status: {log.status}</p>} 
                                </div>
                                {index < trackings.length - 1 && <hr />} 
                            </li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;