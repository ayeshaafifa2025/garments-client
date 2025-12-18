


import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2'; 
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const splitName = (displayName) => {
    if (!displayName) return { firstName: '', lastName: '' };
    const parts = displayName.split(' ').filter(p => p.length > 0);
    return {
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || ''
    };
};

const InputField = ({ label, value, readOnly, highlight, className = '' }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <input 
            value={value} 
            readOnly={readOnly} 
            className={`p-3 rounded-lg ${readOnly ? 'bg-gray-100 text-gray-700 border border-gray-300' : 'border'} ${highlight ? 'font-bold text-lg text-indigo-700 bg-indigo-50' : ''} ${className}`} 
        />
    </div>
);

// 📸 নতুন কম্পোনেন্ট: ম্যানেজারের ছবি দেখানোর জন্য
const ManagerPhotoField = ({ label, photoUrl, managerName }) => {
    if (!photoUrl) return null; // যদি URL না থাকে, তবে কিছুই দেখাবে না

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <div className="mt-2">
                <img 
                    src={photoUrl} 
                    alt={managerName || "Manager Photo"} 
                    // ছোট সাইজের জন্য w-12 h-12 এবং rounded-full ব্যবহার করা হয়েছে
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

const QuantityField = ({ register, errors, min, max }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Order Quantity (Min: {min}, Max: {max})</label>
        <input 
            type="number"
            {...register("orderQuantity", { 
                required: "Quantity is required", 
                valueAsNumber: true,
                min: { value: min, message: `Minimum order is ${min}` },
                max: { value: max, message: `Maximum available is ${max}` }
            })} 
            className="border p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
        />
        {errors.orderQuantity && <p className="text-red-500 text-xs mt-1">{errors.orderQuantity.message}</p>}
    </div>
);


const BookingForm = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();

    const productData = location.state; 
    const { firstName: userFirstName, lastName: userLastName } = splitName(user?.displayName);
    
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: user?.email || '', 
            managerName: productData?.managerName || '', 
            managerEmail: productData?.managerEmail || '',
            managerPhoto: productData?.managerPhoto || '',
            
            productTitle: productData?.productName || 'N/A',
            perPiecePrice: productData?.price || 0,
            paymentOption: productData?.paymentOption || '',
            firstName: userFirstName,
            lastName: userLastName,
            orderQuantity: productData?.minQuantity || 1, 
            contactNumber: '',
            deliveryAddress: '',
            additionalNotes: '',
        }
    });

    if (!productData || !user) {
        return <p className="text-center text-red-500 py-20">ডেটা লোডিং এ সমস্যা অথবা ইউজার লগইন করা নেই।</p>;
    }
    
    const quantity = watch('orderQuantity');
    const perPiecePrice = watch('perPiecePrice');
    
    const calculatedPrice = (perPiecePrice * (quantity || 0)).toFixed(2);

    const onSubmit = async (data) => { 
        
        const orderData = {
            ...data,
            productId: id,
            buyerEmail: data.email, 
            finalPrice: parseFloat(calculatedPrice),
            perPiecePrice: parseFloat(data.perPiecePrice), 
            orderQuantity: parseInt(data.orderQuantity), 
            contactNumber: data.contactNumber, 
            paymentStatus: productData.paymentOption === 'Cash on Delivery' ? 'Unpaid' : 'Pending Payment', 
            status: 'Pending', 
            createdAt: new Date(),
            cost: calculatedPrice,
            orderName: data.productTitle,
            managerName: data.managerName,
            managerEmail: data.managerEmail,
            managerPhoto: data.managerPhoto,
        };
        
        if (productData.paymentOption === 'Cash on Delivery') {
            
            try {
                const res = await axiosSecure.post('/orders', orderData); 
                
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order successful (Cash on Delivery)",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate('/dashboard/my-orders');
                }
            } catch (error) {
                console.error("COD Order Save Error:", error);
                Swal.fire({ icon: "error", title: "Oops...", text: "Facing problem to save cash on delivery order"});
            }

        } else if (productData.paymentOption === 'PayFirst') {
            
            try {
                
                const res = await axiosSecure.post('/payment-checkout-session', orderData); 
                
                if (res.data.url) {
                    window.location.assign(res.data.url); 
                } else {
                    Swal.fire({ icon: "error", title: "Oops...", text: "Couldn't get payment gateway URL"});
                }
                
            } catch (error) {
                console.error("Payment Session Error:", error);
                Swal.fire({ icon: "error", title: "Oops...", text: "Facing problem to create payment session"});
            }
        }
    };

    return (
        <div className="container mx-auto p-6 pt-10">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                <span className="text-green-600">Order Booking:</span> {productData.productName}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
                
                <h3 className="text-xl font-bold border-b pb-2 text-indigo-700">Buyer & Product Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Buyer Email (Read-only)" value={user?.email} readOnly />
                    <InputField label="Product Title (Read-only)" value={productData.productName} readOnly />

                    <InputField label="Manager Name (Read-only)" value={productData.managerName} readOnly />
                    <InputField label="Manager Email (Read-only)" value={productData.managerEmail} readOnly />
                    
                   
                    <ManagerPhotoField 
                        label="Manager Photo" 
                        photoUrl={productData.managerPhoto} 
                        managerName={productData.managerName}
                    />

                    <InputField label="Per Piece Price" value={`$${productData.price}`} readOnly highlight />
                    <InputField label="Payment Method" value={productData.paymentOption} readOnly />

                    <InputField label="First Name" value={userFirstName} readOnly />
                    <InputField label="Last Name" value={userLastName} readOnly />
                </div>
                
                <div className="pt-4">
                    <InputField 
                        label="TOTAL Order Price (Read-only)" 
                        value={`$${calculatedPrice}`} 
                        readOnly 
                        highlight 
                        className="bg-yellow-50 border-yellow-300"
                    />
                </div>

                <h3 className="text-xl font-bold border-b pb-2 pt-6 text-indigo-700">Order & Delivery Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuantityField 
                        register={register} 
                        errors={errors}
                        min={productData.minQuantity} 
                        max={productData.availableQuantity}
                    />

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-600">Contact Number</label>
                        <input {...register("contactNumber", { required: "Contact Number is required" })} 
                            placeholder="Your Contact Number" 
                            className="border p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Delivery Address</label>
                    <textarea {...register("deliveryAddress", { required: "Delivery Address is required" })} 
                        placeholder="Your full delivery address" rows="3" 
                        className="w-full border p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    {errors.deliveryAddress && <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Additional Notes / Instructions</label>
                    <textarea {...register("additionalNotes")} 
                        placeholder="e.g., Delivery instructions, preferred time (Optional)" rows="2" 
                        className="w-full border p-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>


                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg">
                    {productData.paymentOption === 'Cash on Delivery' ? 
                        `Confirm Order (Pay on Delivery)` : 
                        `Proceed to Payment ($${calculatedPrice})`
                    }
                </button>

            </form>
        </div>
    );
};

export default BookingForm;
