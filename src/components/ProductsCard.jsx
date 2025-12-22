

import { Link } from 'react-router'; 
import React from 'react';

const ProductsCard = ({ product }) => {

    const { 
        _id, 
        productName, 
        images,
        availableQuantity, 
        price, 
        category 
    } = product || {};
    
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://i.ibb.co/h7g4B4s/placeholder-image.jpg';

    return (
        <div 
            className='col-span-1 cursor-pointer group bg-white shadow-lg border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col h-full w-full'
        >
            <div className='flex flex-col gap-2 w-full h-full'>
                
                <div
                    className='
                        aspect-square 
                        w-full 
                        relative 
                        overflow-hidden 
                        rounded-xl
                    '
                >
                    <img
                        className='
                            object-cover 
                            h-80
                            w-full 
                            group-hover:scale-110 
                            transition
                          '
                        src={imageUrl}
                        alt={productName}
                        loading="lazy"
                    />
                </div>
                
                <div className='font-bold text-base sm:text-lg text-gray-800 truncate mt-2'>
                    {productName}
                </div>
                
                <div className='text-xs sm:text-sm text-gray-600 truncate'>
                    Category: {category}
                </div>
                
                <p className='text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2'>
                    Available: {availableQuantity} piece
                </p>
                
                <div className='flex flex-row items-center justify-between mt-auto pt-2 border-t border-gray-100'>
                    <div className='font-extrabold text-base sm:text-xl text-indigo-600'> 
                        ${price}
                    </div>
                    
                    <Link
                        to={`/products/${_id}`} 
                        className='
                            transition 
                            duration-300 
                            transform 
                            hover:scale-105
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-indigo-500 
                            focus:ring-opacity-50
                        '
                    >
                        <span className="text-xs sm:text-sm font-semibold text-white bg-indigo-500 px-3 py-1.5 rounded-lg shadow-md hover:bg-indigo-600 transition">
                            View Details
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;