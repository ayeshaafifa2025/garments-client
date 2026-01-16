import React from 'react';

const ProductsSkeleton = () => {
    const shimmer = "relative overflow-hidden bg-gray-200 after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer after:bg-gradient-to-r after:from-transparent after:via-white/60 after:to-transparent";

    return (
        <div className='col-span-1 bg-white shadow-lg border border-gray-100 p-3 rounded-xl flex flex-col h-full w-full'>
            <div className='flex flex-col gap-2 w-full h-full'>
                <div className={`aspect-square w-full rounded-xl ${shimmer}`}></div>
                {/* <div className={`h-5 rounded w-3/4 mt-4 ${shimmer}`}></div>
                <div className={`h-3 rounded w-1/2 mt-2 ${shimmer}`}></div> */}
                <div className={`h-3 rounded w-1/4 mt-2 mb-4 ${shimmer}`}></div>
                <div className='flex flex-row items-center justify-between mt-auto pt-2 border-t border-gray-100'>
                    <div className={`h-5 rounded w-10 ${shimmer}`}></div>
                    <div className={`h-9 rounded-lg w-24 ${shimmer}`}></div>
                </div>
            </div>
        </div>
    );
};

export default ProductsSkeleton;