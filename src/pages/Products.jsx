
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import ProductsCard from '../components/ProductsCard';
import React, { useState } from 'react'; 
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
const Products = () => {
    const axiosSecure = useAxiosSecure(); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    const [totalProducts, setTotalProducts] = useState(0); 
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const { 
        data: productData = {}, 
        isLoading, 
        isError,
        refetch 
    } = useQuery({
        queryKey: ['all-shop-products', currentPage], 
        
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?page=${currentPage}&size=${itemsPerPage}`); 
            
           
            setTotalProducts(res.data.count); 
            
            return res.data;
        },
        
        placeholderData: (previousData) => previousData,
    });
    const allProducts = productData.products || [];
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);
    if (isLoading) return <p className="text-center text-xl p-20">Loading Products...</p>;
    if (isError) return <div className="text-center text-red-600 p-10">Error: Failed to load products.</div>;
    return (
        <div>
<NavBar></NavBar>
            <Helmet>
                <title>
                    products
                </title>
            </Helmet>
            <>
            <h2 className="text-4xl text-blue-500 font-extrabold text-center py-10 ">
                Products
            </h2>

            
            {allProducts && allProducts.length > 0 ? (
                <div className='pt-12 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                    {allProducts.map(product => (
                        <ProductsCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-500 py-20">
                    No product to show
                </p>
            )}

            
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 py-10">
                    
                    
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1} 
                        className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        Previous
                    </button>

                   
                    {pageNumbers.map(number => (
                        <button 
                            key={number}
                            onClick={() => handlePageChange(number)}
                            
                            className={`btn ${number === currentPage ? 'btn-active btn-info' : 'btn-outline btn-info'}`}
                        >
                            {number}
                        </button>
                    ))}

                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        Next
                    </button>
                </div>
            )}
            
        </>
        <Footer></Footer>
        </div>
    );
};

export default Products;