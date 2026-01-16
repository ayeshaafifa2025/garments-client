
import { Link } from 'react-router';

const OurCard = ({ product }) => {
    const { 
        _id, 
        productName, 
        images, 
        description, 
        price, 
    } = product || {};
    
    
    const shortDesc = description ? description.substring(0, 50) + '...' : 'no description';
    
    
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://i.ibb.co/h7g4B4s/placeholder-image.jpg'; 

    return (
        
        <Link
            to={`/products/${_id}`} 
            className='col-span-1 cursor-pointer group flex flex-col shadow-lg border border-gray-100 rounded-xl transition duration-500 hover:shadow-2xl overflow-hidden '
        >
            <div
                className='
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                '
            >
                <img
                    className='
                        
                        h-full
                        w-full
                        group-hover:scale-110 
                        transition duration-500
                    '
                    src={imageUrl}
                    alt={productName}
                />
            </div>
            
            <div className='p-4 flex flex-col flex-grow'>
                <div className='font-extrabold text-xs text-black mb-1 truncate'>{productName}</div>
                
                <p className='text-xs sm:text-sm text-black mb-3 flex-grow'>{shortDesc}</p>
                
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-2'>
                    <div className=' text-xs text-black mb-2 sm:mb-0'> ${price}</div>
                    

                    <button className="
                        text-black 
                        px-3 sm:px-4 py-1.5 sm:py-2 
                        rounded-lg 
                        font-medium shadow-md transition-all duration-300
                        hover:shadow-lg hover:scale-[1.03] 
                        
                        text-xs sm:text-sm
                    ">
                        View Details
                    </button>
                    
                </div>
            </div>
        </Link>
    );
};

export default OurCard;