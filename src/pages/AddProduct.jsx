


import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';

const AddProduct = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleAddProduct = data => {
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
      createdAt: new Date(),
    };

    axiosSecure
      .post('/products', productData)
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
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Product add failed',
        });
      });
  };

  return (
    <div className={`min-h-screen  ${theme === "light" ? "bg-white" : "bg-gray-600 "} px-4  sm:px-6 lg:px-10 py-8`}>
      <Helmet>
        <title>add-product</title>
      </Helmet>

      <div className="max-w-3xl mx-auto  shadow-xl rounded-xl p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <div className="sm:col-span-2">
            <label className="label font-semibold">Product Name</label>
            <input
              type="text"
              {...register('productName', { required: true })}
              className="input input-bordered w-full"
              placeholder="Product Name"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label font-semibold">Product Description</label>
            <textarea
              {...register('description', { required: true })}
              className="textarea textarea-bordered w-full min-h-[100px]"
              placeholder="Product Description"
            />
          </div>

          <div>
            <label className="label font-semibold">Category</label>
            <select
              {...register('category', { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jacket">Jacket</option>
              <option value="Accessories">Accessories</option>
              <option value="shari">shari</option>
              <option value="panjabi">panjabi</option>
              <option value="abaya">abaya</option>
            </select>
          </div>

          <div>
            <label className="label font-semibold">Price</label>
            <input
              type="number"
              {...register('price', { required: true })}
              className="input input-bordered w-full"
              placeholder="Price"
               min="0.01" 
        step="0.01"
            />
          </div>

          <div>
            <label className="label font-semibold">Available Quantity</label>
            <input
              type="number"
              {...register('availableQuantity', { required: true })}
              className="input input-bordered w-full"
              placeholder="Available Quantity"
              min="1" 
        step="1"
            />
          </div>

          <div>
            <label className="label font-semibold">
              Minimum Order Quantity
            </label>
            <input
              type="number"
              {...register('minOrderQuantity', { required: true })}
              className="input input-bordered w-full"
              placeholder="MOQ"
               min="1" 
        step="1"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label font-semibold">
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              {...register('images', { required: true })}
              className="input input-bordered w-full"
              placeholder="https://img1.jpg, https://img2.jpg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label font-semibold">
              Demo Video Embed Link
            </label>
            <input
              type="text"
              {...register('demoVideoLink')}
              className="input input-bordered w-full"
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>

          <div>
            <label className="label font-semibold">Payment Option</label>
            <select
              {...register('paymentOption', { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Payment Option</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="PayFirst">PayFirst</option>
            </select>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              {...register('showOnHome')}
              className="checkbox"
            />
            <span className="font-medium text-gray-700">
              Show on Home Page
            </span>
          </div>

          <div className="sm:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


