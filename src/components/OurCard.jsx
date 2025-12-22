
import { Link } from 'react-router';

const OurCard = ({ product }) => {
    const { 
        _id, 
        productName, 
        images, 
        description, 
        price, 
        // category 
    } = product || {};
    
    
    const shortDesc = description ? description.substring(0, 70) + '...' : 'no description';
    
    
    const imageUrl = (images && images.length > 0) ? images[0] : 'https://i.ibb.co/h7g4B4s/placeholder-image.jpg'; // একটি ভালো প্লেসহোল্ডার দিন

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
                    />
                </div>
                
                <div className='font-bold text-lg text-gray-800'>NAME:{productName}</div>
               
                
           
                <p className='text-sm text-gray-500 mb-2'>Description: {shortDesc}</p>
                
                <div className='flex flex-row items-center justify-between'>
                    <div className='font-extrabold text-xl text-indigo-600'> Price: ${price}</div>
                    
               

                      <Link
            to={`/products/${_id}`} 
            className='col-span-1 cursor-pointer group shadow-xl border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl'
        >
             <button  className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">
                        View Details
                    </button>
            
        </Link>
                   
                </div>
            </div>
    );
};

export default OurCard;