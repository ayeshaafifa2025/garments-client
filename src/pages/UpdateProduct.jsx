


import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useRole from '../hooks/useRole';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { role } = useRole();

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
            const imagesString = Array.isArray(product.images) ? product.images.join(', ') : '';
            reset({
                ...product,
                images: imagesString,
                showOnHome: product.showOnHome || false,
            });
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        const imagesArray = data.images.split(',').map(url => url.trim()).filter(url => url.length > 0);
        const updatedData = {
            ...data,
            price: Number(data.price),
            availableQuantity: Number(data.availableQuantity),
            minOrderQuantity: Number(data.minOrderQuantity),
            images: imagesArray,
            lastUpdated: new Date().toISOString(),
            showOnHome: !!data.showOnHome,
        };
        delete updatedData.managerEmail;
        delete updatedData._id;
        delete updatedData.createdAt;

        try {
            const res = await axiosSecure.patch(`/products/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                toast.success(`Product "${updatedData.productName}" updated successfully!`);
                const redirectTo = role === 'admin' ? '/dashboard/all-products' : role === 'manager' ? '/dashboard/manage-products' : '/dashboard';
                navigate(redirectTo);
            } else {
                toast.info("No changes were made to the product.");
            }
        } catch {
            toast.error('Failed to update product. Server error occurred.');
        }
    };

    if (isLoading) return <p className="text-center py-10 text-indigo-600">Loading product data...</p>;
    if (isError || !product._id) return <p className="text-center py-10 text-red-600">Error loading product or product not found.</p>;

    const categories = ['Jacket', 'Pant'];
    const paymentOptions = ['PayFirst', 'Cash on Delivery'];

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4 text-center sm:text-left">Update Product: {product.productName}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <input type="text" {...register('productName', { required: 'Product name is required' })} placeholder="Product Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName.message}</p>}
                    </div>
                    <div>
                        <input type="number" step="0.01" {...register('price', { required: 'Price is required', valueAsNumber: true, min: { value: 0.01, message: 'Price must be greater than 0.' } })} placeholder="Price ($)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <select {...register('category', { required: 'Category is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>
                    <div>
                        <select {...register('paymentOption', { required: 'Payment option is required' })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Select Payment Option</option>
                            {paymentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        {errors.paymentOption && <p className="text-red-500 text-xs mt-1">{errors.paymentOption.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <input type="number" {...register('availableQuantity', { required: 'Quantity is required', valueAsNumber: true, min: { value: 1, message: 'Quantity must be at least 1.' } })} placeholder="Available Quantity" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.availableQuantity && <p className="text-red-500 text-xs mt-1">{errors.availableQuantity.message}</p>}
                    </div>
                    <div>
                        <input type="number" {...register('minOrderQuantity', { required: 'Min order quantity is required', valueAsNumber: true, min: { value: 1, message: 'Min quantity must be at least 1.' } })} placeholder="Minimum Order Quantity" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.minOrderQuantity && <p className="text-red-500 text-xs mt-1">{errors.minOrderQuantity.message}</p>}
                    </div>
                </div>
                <textarea {...register('description', { required: 'Description is required' })} rows="4" placeholder="Description" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                <input type="text" {...register('images', { required: 'At least one Image URL is required' })} placeholder="Image URLs, comma separated" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
                <input type="text" {...register('demoVideoLink')} placeholder="Demo Video Link (Optional)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <div className="flex items-center">
                    <input type="checkbox" id="showOnHome" {...register('showOnHome')} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <label htmlFor="showOnHome" className="ml-2 text-sm font-medium text-gray-700">Show product on Home Page</label>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
