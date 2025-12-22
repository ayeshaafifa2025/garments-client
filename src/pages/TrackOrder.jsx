// TrackOrder.jsx
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
        return <div className='p-8 text-center text-indigo-600'> Tracking is loading...</div>;
    }
    if (error) {
        return <div className='p-8 text-center text-red-500'>  error to load log: {error.message}</div>;
    }
    if (trackings.length === 0) {
        return <div className='p-8 text-center text-gray-500'> Didn't find any load log for this order: <span className='font-bold'>{trackingId}</span></div>;
    }

    return (
        <div>
            <Helmet>
                <title>
                    track-order
                </title>
            </Helmet>

            <div className='p-4 sm:p-8'>
            <h2 className='text-3xl font-bold mb-8 text-gray-800'>order tracking: {trackingId}</h2>
            <ul className="timeline timeline-vertical">
                {
                    trackings.map((log, index) => <li key={log._id}>
                        <div className="timeline-start text-sm text-gray-500">
                            {/* {new Date(log.createdAt).toLocaleString('bn-BD')} */}
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
                        <div className="timeline-end timeline-box p-4 bg-white shadow-lg rounded-lg">
                            <span className='text-md font-semibold text-gray-700'>{log.details || log.status}</span>
                            
                            {log.details && log.status && <p className="text-xs text-indigo-500 mt-1">Status: {log.status}</p>} 
                        </div>
                        {index < trackings.length - 1 && <hr />} 
                    </li>)
                }
            </ul>
        </div>
        </div>
    );
};

export default TrackOrder;