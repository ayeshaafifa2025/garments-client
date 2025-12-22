

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import OurCard from './OurCard';

const OurProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: products = [], isLoading } = useQuery({
        
        queryKey: ['homepage-our-products'], 
        
        queryFn: async () => {

            const result = await axiosSecure.get('/our-products/homepage'); 
            return result.data;
        },
    });

    if (isLoading) return <p className="text-center py-20 text-xl font-semibold">Loading Products...</p>;

    return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 pt-10 pb-6">
            Our Products
        </h2>
        {products && products.length > 0 ? (
              
            <div className='pt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8'>
                {products.map(product => (
                    <OurCard key={product._id} product={product} /> 
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 py-10 text-lg">
                No product to show on homepage
            </p>
        )}
    </section>
    );
};

export default OurProducts;