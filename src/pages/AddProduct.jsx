

import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const axios = useAxios();
    const { user } = useAuth();

    const handleAddProduct = (data) => {

        const imagesArray = data.images.split(',').map(url => url.trim());

        const productData = {
            productName: data.productName,
            description: data.description,
            category: data.category,
            price: parseFloat(data.price),
            availableQuantity: parseInt(data.availableQuantity),
            minOrderQuantity: parseInt(data.minOrderQuantity),
            images: imagesArray,
            demoVideoLink: data.demoVideoLink,
            paymentOption: data.paymentOption,
            showOnHome: data.showOnHome || false,
            managerName: user.displayName,
            managerEmail: user.email,
            managerPhoto: user.photoURL,
            createdAt: new Date()
        };

        console.log('Product data:', productData);

        axios.post('/products', productData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added',
                        text: 'Product successfully added!',
                    });
                    reset();
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Product add failed',
                });
            });
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                {/* Product Name */}
                <label className="label">Product Name</label>
                <input
                    type="text"
                    {...register('productName', { required: true })}
                    className="input input-bordered w-full mb-4"
                    placeholder="Product Name"
                />

                {/* Product Description */}
                <label className="label">Product Description</label>
                <textarea
                    {...register('description', { required: true })}
                    className="textarea textarea-bordered w-full mb-4"
                    placeholder="Product Description"
                />

                {/* Category */}
                <label className="label">Category</label>
                <select {...register('category', { required: true })} className="select select-bordered w-full mb-4">
                    <option value="">Select Category</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                </select>

                {/* Price */}
                <label className="label">Price</label>
                <input
                    type="number"
                    {...register('price', { required: true })}
                    className="input input-bordered w-full mb-4"
                    placeholder="Price"
                />

                {/* Available Quantity */}
                <label className="label">Available Quantity</label>
                <input
                    type="number"
                    {...register('availableQuantity', { required: true })}
                    className="input input-bordered w-full mb-4"
                    placeholder="Available Quantity"
                />

                {/* Minimum Order Quantity */}
                <label className="label">Minimum Order Quantity (MOQ)</label>
                <input
                    type="number"
                    {...register('minOrderQuantity', { required: true })}
                    className="input input-bordered w-full mb-4"
                    placeholder="Minimum Order Quantity"
                />

                {/* Images URL */}
                <label className="label">Image URLs (comma separated)</label>
                <input
                    type="text"
                    {...register('images', { required: true })}
                    className="input input-bordered w-full mb-4"
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />

                {/* Demo Video Embed */}
                <label className="label">Demo Video Embed Link (YouTube)</label>
                <input
                    type="text"
                    {...register('demoVideoLink')}
                    className="input input-bordered w-full mb-4"
                    placeholder="https://www.youtube.com/embed/..."
                />

                {/* Payment Options */}
                <label className="label">Payment Option</label>
                <select {...register('paymentOption', { required: true })} className="select select-bordered w-full mb-4">
                    <option value="">Select Payment Option</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="PayFirst">PayFirst</option>
                </select>

                {/* Show on Home Page */}
                <label className="cursor-pointer label">
                    <span className="label-text">Show on Home Page</span>
                    <input type="checkbox" {...register('showOnHome')} className="checkbox ml-2" />
                </label>

                <button className="btn btn-primary w-full mt-4">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;





