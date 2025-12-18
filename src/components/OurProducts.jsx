


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

    if (isLoading) return <p>loading</p>;

    return (
   <>
     <h2 className="text-3xl font-bold text-center py-10">
                Our Products
            </h2>
            {products && products.length > 0 ? (
              
                <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                    {products.map(product => (
                        <OurCard key={product._id} product={product} /> 
                    ))}
                </div>
            ) : (
                 <p className="text-center text-gray-500 py-10">
                  No product to show on homepage
                </p>
            )}
   </>
    );
};

export default OurProducts;