


import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { format, parseISO } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const formatLocalBDTTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const date = parseISO(isoString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return format(date, 'MMM dd, yyyy, hh:mm:ss a');
  } catch {
    return 'Invalid Date';
  }
};

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: product = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product-details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center py-20">loading</p>;
  if (isError)
    return (
      <div className="text-center text-red-600 p-10">
        Error: {error.message}
      </div>
    );
  if (!product._id)
    return (
      <div className="text-center text-xl text-gray-500 py-20">
        Product not found.
      </div>
    );

  const getVideoSrc = (embedLink) => {
    const match = embedLink?.match(/src="([^"]*)"/);
    return match ? match[1] : '';
  };

  const videoSrc = product.demoVideoLink
    ? getVideoSrc(product.demoVideoLink)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Helmet>
        <title>products-details</title>
      </Helmet>

      <div className="flex-1 px-4 sm:px-6 lg:px-10 pt-6 pb-16 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-600 mb-8 text-center">
          {product.productName}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-12">
          <div className="w-full h-64 sm:h-80 lg:h-96">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
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
                    className=" w-full h-full rounded-xl"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="w-full h-64 sm:h-80 lg:h-96">
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

        <div className="p-5 sm:p-8 bg-white rounded-xl shadow-xl border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 border-b pb-2 text-indigo-700">
            Product Specifications
          </h3>

          <div className="space-y-4 text-black">
            <DetailRow
              label="Product Description"
              value={product.description}
              fullWidth
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <DetailRow label="Category" value={product.category} />
              <DetailRow
                label="Price"
                value={`$${product.price}`}
                highlight
              />
              <DetailRow
                label="Available Quantity"
                value={product.availableQuantity}
              />
              <DetailRow
                label="Minimum Order Quantity"
                value={product.minOrderQuantity}
              />
              <DetailRow
                label="Manager Name"
                value={product.managerName}
              />
              <DetailRow
                label="Manager Email"
                value={product.managerEmail}
              />
              {/* <DetailRow
                label="Show on Home"
                value={product.showOnHome ? 'Yes' : 'No'}
              /> */}
              <DetailRow
                label="Added On"
                value={formatLocalBDTTime(product.createdAt)}
              />
              {product.lastUpdated && (
                <DetailRow
                  label="Last Updated"
                  value={formatLocalBDTTime(product.lastUpdated)}
                />
              )}

              {product.managerPhoto && (
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600">
                    Manager Photo:
                  </span>
                  <img
                    src={product.managerPhoto}
                    alt={product.managerName}
                    className="w-14 h-14 sm:w-16 sm:h-16 mt-2 rounded-full object-cover border-2 border-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center max-w-lg mx-auto">
          <Link
            to={`/book-order/${id}`}
            state={{
              productId: id,
              productName: product.productName,
              price: product.price,
              minQuantity: product.minOrderQuantity,
              availableQuantity: product.availableQuantity,
              paymentOption: product.paymentOption,
              managerName: product.managerName,
              managerEmail: product.managerEmail,
              managerPhoto: product.managerPhoto,
            }}
            className="w-full"
          >
            <button className="w-full text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-4 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              order: {product.productName}
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const DetailRow = ({ label, value, highlight, fullWidth }) => (
  <div className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
    <span className="font-semibold text-gray-600">{label}:</span>
    <span
      className={`break-words ${
        highlight ? 'text-lg sm:text-xl font-bold text-indigo-600' : ''
      }`}
    >
      {value}
    </span>
  </div>
);

export default ProductDetails;





