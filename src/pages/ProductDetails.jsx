

import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';


const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure(); 

    const { 
        data: product = {}, 
        isLoading, 
        isError,
        error
    } = useQuery({
        queryKey: ['product-details', id],
        
        queryFn: async () => {
            
            const res = await axiosSecure.get(`/products/${id}`); 
            return res.data;
        },
        enabled: !!id, 
    });

    if (isLoading) return <p>loading</p>;
    if (isError) return <div className="text-center text-red-600 p-10">Error: {error.message}</div>;
    if (!product._id) return <div className="text-center text-xl text-gray-500 py-20">Product not found.</div>;

    
    const getVideoSrc = (embedLink) => {

        const match = embedLink.match(/src="([^"]*)"/);
        return match ? match[1] : '';
    };

    const videoSrc = product.demoVideoLink ? getVideoSrc(product.demoVideoLink) : null;
    
    return (
       <div className="pt-8 pb-20">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{product.productName}</h1>
                
                {/* Image Slider & Video Embed Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                    {/* A. Image Slider (Left Side) */}
                    <div className="lg:col-span-1 h-96">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            className="w-full h-full rounded-xl shadow-2xl"
                        >
                            {product.images?.map((imgUrl, index) => (
                                <SwiperSlide key={index}>
                                    <img 
                                        src={imgUrl} 
                                        alt={`${product.productName} ${index + 1}`}
                                        className="object-cover w-full h-full"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* B. Video Embed (Right Side) */}
                    <div className="lg:col-span-1 h-96">
                        {videoSrc ? (
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src={videoSrc} 
                                title="Product Demo Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-xl shadow-2xl"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl shadow-md">
                                <p className="text-gray-500">No Demo Video Available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Information Table */}
                <div className="p-8 bg-white rounded-xl shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 border-b pb-2 text-indigo-700">Product Specifications</h3>
                    <div className="space-y-4">
                        <DetailRow label="Product Description" value={product.description} fullWidth />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                            <DetailRow label="Category" value={product.category} />
                            <DetailRow label="Price" value={`$${product.price}`} highlight />
                            <DetailRow label="Available Quantity" value={product.availableQuantity} />
                            <DetailRow label="Minimum Order Quantity" value={product.minOrderQuantity} />
                            {/* <DetailRow label="Payment Option" value={product.paymentOption} />
                             */}
                            <DetailRow label="manager Name" value={product.managerName} />
                            <DetailRow label="manager Email" value={product.managerEmail} />

                            <DetailRow label="Show on Home" value={product.showOnHome ? 'Yes' : 'No'} />
                            <DetailRow label="Added On" value={new Date(product.createdAt).toLocaleDateString()} />
                            {product.managerPhoto && (
                                <div className="flex flex-col col-span-1">
                                    <span className="font-semibold text-gray-600">manager Photo:</span>
                                    <div className="mt-2">
                                        <img 
                                            src={product.managerPhoto} 
                                            alt={`${product.managerName}'s photo`} 
                                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                                        />
                                    </div>
                                </div>
                            )}
                           
                        </div>
                    </div>
                </div>
{/* two buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center max-w-xl mx-auto">
                    <button 
                        className="
                            flex-1 px-6 py-3 text-lg font-bold 
                            rounded-lg shadow-xl transition duration-300
                            bg-indigo-600 text-white 
                            opacity-50 cursor-default
                        "
                        disabled
                    >
                       {product.paymentOption}
                    </button>
                    <Link
                        to={`/book-order/${id}`}
                      state={{ 
        productId: id,
        productName: product.productName,
        price: product.price,
        minQuantity: product.minOrderQuantity,
        availableQuantity: product.availableQuantity,
        paymentOption: product.paymentOption,
        managerName:product.managerName,
        managerEmail:product.managerEmail,
        managerPhoto:product.managerPhoto
    }}
    className="flex-1"
                    >
                        <button 
                            className="
                                w-full px-6 py-3 text-lg font-bold 
                                rounded-lg shadow-xl transition duration-300
                                bg-green-600 text-white 
                                hover:bg-green-700 active:bg-green-800
                            "
                        >
                         order:   {product.productName} 
                        </button>
                    </Link>

                </div>


            </div>
    );
};

const DetailRow = ({ label, value, highlight, fullWidth }) => (
    <div className={`flex flex-col ${fullWidth ? 'col-span-full' : 'col-span-1'}`}>
        <span className="font-semibold text-gray-600">{label}:</span>
        <span className={`text-gray-800 ${highlight ? 'text-xl font-bold text-indigo-600' : ''}`}>{value}</span>
    </div>
);


export default ProductDetails;










