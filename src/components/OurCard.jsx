// // src/components/Home/OurCard.jsx

// import { Link } from 'react-router';

// const OurCard = ({ product }) => {
//     const { _id, productName, images, description, price, category } = product || {};
    
//     // সংক্ষিপ্ত বিবরণ এবং ইমেজ URL লজিক একই রাখা হলো
//     const shortDesc = description ? description.substring(0, 70) + '...' : 'বিবরণ নেই।';
//     const imageUrl = (images && images.length > 0) ? images[0] : 'placeholder-image.jpg';

//     return (
//         <Link
//             to={`/product/${_id}`} 
//             className='col-span-1 cursor-pointer group shadow-xl border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl'
//         >
//             <div className='flex flex-col gap-2 w-full'>
//                 <div
//                     className='
//                         aspect-square 
//                         w-full 
//                         relative 
//                         overflow-hidden 
//                         rounded-xl
//                     '
//                 >
//                     <img
//                         className='
//                             object-cover 
//                             h-full 
//                             w-full 
//                             group-hover:scale-110 
//                             transition
//                           '
//                         src={imageUrl}
//                         alt={productName}
//                     />
//                 </div>
                
//                 <div className='font-bold text-lg text-gray-800'>{productName}</div>
//                 <div className='text-sm text-gray-600'>Category: {category}</div>
                
//                 {/* Short Description */}
//                 <p className='text-sm text-gray-500 mb-2'>{shortDesc}</p>
                
//                 <div className='flex flex-row items-center justify-between'>
//                     <div className='font-extrabold text-xl text-indigo-600'> Price: ${price}</div>
                    
//                     {/* View Details Button */}
//                     <button className="text-sm font-semibold text-white bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600 transition">
//                         View Details
//                     </button>
//                 </div>
//             </div>
//         </Link>
//     );
// };

// export default OurCard;





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
                {/* <div className='text-sm text-gray-600'>Category: {category}</div> */}
                
                {/* Short Description */}
                <p className='text-sm text-gray-500 mb-2'>Description: {shortDesc}</p>
                
                <div className='flex flex-row items-center justify-between'>
                    <div className='font-extrabold text-xl text-indigo-600'> Price: ${price}</div>
                    
                    {/* View Details Button */}

                      <Link
            to={`/products/${_id}`} 
            className='col-span-1 cursor-pointer group shadow-xl border border-gray-100 p-3 rounded-xl transition duration-300 hover:shadow-2xl'
        >
             <button className="text-sm font-semibold text-white bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600 transition">
                        View Details
                    </button>
            
        </Link>
                   
                </div>
            </div>
    );
};

export default OurCard;