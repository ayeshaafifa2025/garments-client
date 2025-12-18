import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure'; 
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form'; 

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    

    const { data: product = {}, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        enabled: !!id,
        queryFn: async () => {
           
            const res = await axiosSecure.get(`/products/${id}`);
            return res.data;
        },
    });

  
    useEffect(() => {
        if (product && product._id) {
           
            reset(product);
        }
    }, [product, reset]);


    const onSubmit = async (data) => {
        
       
        const updatedData = {
            ...data,
            price: Number(data.price),
            availableQuantity: Number(data.availableQuantity),
            minOrderQuantity: Number(data.minOrderQuantity),
            images: Array.isArray(data.images) ? data.images : [data.images].filter(Boolean),
            showOnHome: data.showOnHome === 'true' || data.showOnHome === true,
        };
       
        delete updatedData.sellerEmail; 
        
        try {
           
            const res = await axiosSecure.patch(`/products/${id}`, updatedData);
            
            if (res.data.modifiedCount > 0) {
                toast.success(`Product "${updatedData.productName}" updated successfully!`);
                navigate('/dashboard/manage-products');
            } else {
                toast.info("No changes were made to the product.");
            }
        } catch (error) {
            // console.error('PATCH Error:', error);
            toast.error('Failed to update product. Server error occurred.');
        }
    };


    // --- Loading and Error States ---
    if (isLoading) {
        return <p className="text-center py-10 text-indigo-600">Loading product data...</p>;
    }

    if (isError || !product._id) {
        return <p className="text-center py-10 text-red-600">Error loading product or product not found.</p>;
    }
    
    const categories = ['Electronics', 'Jacket', 'Furniture', 'Apparel', 'Tools', 'Other'];
    const paymentOptions = ['PayFirst', 'Cash on Delivery', 'EMI'];


    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Update Product: {product.productName}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
                
                {/* Product Name & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            {...register('productName', { required: 'Product name is required' })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { required: 'Price is required', valueAsNumber: true })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                </div>

                {/* Category & Payment Option */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            {...register('category', { required: 'Category is required' })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Option</label>
                        <select
                            {...register('paymentOption', { required: 'Payment option is required' })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Payment Option</option>
                            {paymentOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        {errors.paymentOption && <p className="text-red-500 text-xs mt-1">{errors.paymentOption.message}</p>}
                    </div>
                </div>

                {/* Quantity Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available Quantity</label>
                        <input
                            type="number"
                            {...register('availableQuantity', { required: 'Quantity is required', valueAsNumber: true })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.availableQuantity && <p className="text-red-500 text-xs mt-1">{errors.availableQuantity.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Quantity</label>
                        <input
                            type="number"
                            {...register('minOrderQuantity', { required: 'Min order quantity is required', valueAsNumber: true })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.minOrderQuantity && <p className="text-red-500 text-xs mt-1">{errors.minOrderQuantity.message}</p>}
                    </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows="4"
                        {...register('description', { required: 'Description is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>

                {/* Image URL (Primary image) */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Image URL</label>
                    <input
                        type="url"
                        {...register('images.0', { required: 'Image URL is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.images && errors.images['0'] && <p className="text-red-500 text-xs mt-1">{errors.images['0'].message}</p>}
                </div>
                
                {/* Demo Video Link */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Demo Video Embed Code/Link (Optional)</label>
                    <input
                        type="text"
                        {...register('demoVideoLink')}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Show on Home Checkbox */}
                 <div className="mb-8 flex items-center">
                    <input
                        type="checkbox"
                        id="showOnHome"
                        {...register('showOnHome')}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="showOnHome" className="ml-2 block text-sm font-medium text-gray-700">Show product on Home Page</label>
                </div>


                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;