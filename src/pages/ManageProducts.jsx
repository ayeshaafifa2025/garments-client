 
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; 
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import Swal from 'sweetalert2'; 
import { toast } from 'react-toastify'; 
import { Helmet } from 'react-helmet-async';


const ManageProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

  
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['managerProducts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
         
            const res = await axiosSecure.get(`/manager-products?email=${user.email}`);
            return res.data;
        },
    });
    const handleDeleteProduct = (id, productName) => {
        
        Swal.fire({
            title: `Confirm Delete?`,
            text: `Are you sure you want to delete product: ${productName}? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                   
                    const res = await axiosSecure.delete(`/products/${id}`); 
                    
                    if (res.data.deletedCount > 0) {
                        toast.success(`${productName} successfully deleted!`);
                        refetch(); 
                    } else {
                        toast.error('Failed to delete product or product not found.');
                    }
                } catch (error) {
                    toast.error('An error occurred during deletion.');
                }
            }
        });
    };

    
    const allCategories = [...new Set(products.map(p => p.category))];
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || product.category === filterCategory;

        return matchesSearch && matchesCategory;
    });
    
 
    if (!user) {
        return <p className="text-center py-10 text-red-500">Please login to manage your products.</p>;
    }

    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600">Loading products...</p>;
    }

    if (products.length === 0 && !searchTerm && !filterCategory) {
        return (
            <div className="text-center py-20">
                <p className="text-2xl text-gray-500 mb-4">You haven't added any products yet.</p>
                <Link to="/dashboard/add-product" className="text-indigo-600 hover:underline font-medium">
                    Click here to add your first product.
                </Link>
            </div>
        );
    }


    return (
        <div>
            <Helmet>
                <title>
                    manage products
                </title>
            </Helmet>

            <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Manage My Products ({filteredProducts.length})</h1>
            
           
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-lg shadow-inner">
                
              
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search by Product Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

              
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full md:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All Categories</option>
                    {allCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

            </div>

        
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider w-16">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Payment Mode</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                              
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={product.images[0] || 'https://via.placeholder.com/40'} 
                                        alt={product.productName} 
                                        className="h-10 w-10 object-cover rounded-md"
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/40" }}
                                    />
                                </td>
                                
                                
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.productName}</td>
                                
                                {/* Price */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">${product.price}</td>
                                
                                {/* Payment Mode */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.paymentOption}</td>
                                
                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                   
                                    <Link to={`/dashboard/update-product/${product._id}`}>
                                        <button 
                                            title="Edit Product"
                                            className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            "
                                        >
                                            <FiEdit className="h-5 w-5" />
                                        </button>
                                    </Link>
                                    
                                  
                                    <button 
                                        title="Delete Product"
                                        onClick={() => handleDeleteProduct(product._id, product.productName)}
                                       className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            "
                                    >
                                        <FiTrash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* No Results Message */}
                {filteredProducts.length === 0 && products.length > 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No products found matching your search criteria.
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default ManageProducts;


