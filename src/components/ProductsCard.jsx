

import { Link } from 'react-router'; 

const ProductsCard = ({ product }) => {

    const { 
        _id, 
        productName, 
        images,
        availableQuantity, 
        // description, 
        price, 
        category 
    } = product || {};
    
   
    // const shortDesc = description ? description.substring(0, 70) + '...' : ' No description';
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://i.ibb.co/h7g4B4s/placeholder-image.jpg';

    return (
        

        <div className='flex flex-col gap-2 w-full'>
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
                
                <div className='font-bold text-lg text-gray-800 truncate'>NAME:{productName}</div>
                <div className='text-sm text-gray-600'>Category: {category}</div>
                
                {/* Short Description */}
                {/* <p className='text-sm text-gray-500 mb-2 h-10 overflow-hidden'>{shortDesc}</p> */}
                <p className='text-sm text-gray-500 mb-2 h-10 overflow-hidden'>available:{
availableQuantity}piece</p>
                
                <div className='flex flex-row items-center justify-between mt-auto pt-2'>
                    <div className='font-extrabold text-xl text-indigo-600'> Price: ${price}</div>
                    
                    {/* View Details Button */}
                    <Link
            to={`/products/${_id}`} 
            className='col-span-1 cursor-pointer group shadow-lg border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl transform hover:-translate-y-1'
        >
            <span className="text-sm font-semibold text-white bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600 transition">
                        View Details
                    </span>
            
        </Link>
                    
                </div>
            </div>
    );
};

export default ProductsCard;