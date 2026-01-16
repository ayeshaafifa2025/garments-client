

import { Link } from 'react-router'; 
import React from 'react';

const ProductsCard = ({ product }) => {

    const { 
        _id, 
        productName, 
        images,
        description,
        availableQuantity, 
        price, 
        category 
    } = product || {};
    const shortDesc = description ? description.substring(0, 50) + '...' : 'no description';
    
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://i.ibb.co/h7g4B4s/placeholder-image.jpg';

    return (
        <div 
            className='col-span-1 cursor-pointer group  shadow-lg border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col h-full w-full'
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
                            
                            h-full
                            w-full 
                            group-hover:scale-110 
                            transition
                          '
                        src={imageUrl}
                        alt={productName}
                        loading="lazy"
                    />
                </div>
                
                <div className='text-base  truncate mt-2'>
                    {productName}
                </div>
                <p className='text-xs sm:text-sm  mb-3 flex-grow'>{shortDesc}</p>
                
                {/* <div className='text-xs sm:text-sm text-gray-600 truncate'>
                    {category}
                </div> */}
                
                {/* <p className='text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2'>
                     {availableQuantity} piece
                </p> */}
                
                <div className='flex flex-row items-center justify-between mt-auto pt-2 border-t border-gray-100'>
                    <div className=' text-xs'> 
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
                        <span className="text-xs sm:text-sm font-semibold text-white  px-3 py-1.5 rounded-lg shadow-md hover:bg-indigo-600 transition">
                            View Details
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;