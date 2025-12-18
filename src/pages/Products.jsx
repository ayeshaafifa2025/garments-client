
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import ProductsCard from '../components/ProductsCard';


const Products = () => {

    const axiosSecure = useAxiosSecure(); 

    const { 
        data: allProducts = [],
        isLoading, 
        isError,
    } = useQuery({

        queryKey: ['all-shop-products'], 
        
        queryFn: async () => {
            
            const res = await axiosSecure.get('/products'); 

            return res.data;
           
            
        },
        
    });

    if (isLoading) return <p>loading</p>;
    if (isError) return <div className="text-center text-red-600 p-10">Error: 404</div>;

    return (
     <>
          <h2 className="text-4xl font-extrabold text-center py-10 text-gray-800">
                Products
            </h2>

            {allProducts && allProducts.length > 0 ? (
                <div className='pt-12 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                    {allProducts.map(product => (
                        <ProductsCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                 <p className="text-center text-xl text-gray-500 py-20">
                    No product to show
                </p>
            )}
     
     </>
    );
};

export default Products;