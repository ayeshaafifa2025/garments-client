



import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router'; 
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import SocialLogin from '../components/SocialLogin';
import Swal from 'sweetalert2'; 
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const handleRegistration = (data) => {

        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

              
                const formData = new FormData();
                formData.append('image', profileImg);

                
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                       
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL,
                            
                            demandedRole: data.selectedRole 
                        }
                        
                        axiosSecure.post('/users', userInfo)
                            .then(res =>{
                                if(res.data.insertedId){
                                    
                                    Swal.fire({
                                        title: "Success!",
                                        text: "Registration successful. Your status is pending approval.",
                                        icon: "success"
                                    });
                                }
                            })
                            .catch(dbErr => console.error("DB Save Error:", dbErr));


                        
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(imgErr => console.error("Image Upload Error:", imgErr));


            })
            .catch(error => {
                
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Registration failed!",
                });
            })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar></NavBar>
            <Helmet>
                <title>
                    register page
                </title>
            </Helmet>


            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="card bg-base-100 w-full max-w-xs sm:max-w-md shrink-0 shadow-2xl border border-gray-100">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center pt-6">Welcome</h3>
                    <p className='text-sm sm:text-base text-center text-gray-600 mb-2'>Please Register now</p>
                    <form className="card-body p-4 sm:p-8" onSubmit={handleSubmit(handleRegistration)}>
                        <fieldset className="fieldset flex flex-col gap-3">
                            
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-sm">Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} className="input input-bordered w-full input-sm sm:input-md" placeholder="Your Name" />
                                {errors.name?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm mt-1'>Name is required.</p>}
                            </div>

                            
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-sm">Photo</span>
                                </label>
                                <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered w-full file-input-sm sm:file-input-md" />
                                {errors.photo?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm mt-1'>Photo is required.</p>} 
                            </div>

                            
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-sm">Email</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} className="input input-bordered w-full input-sm sm:input-md" placeholder="Email" />
                                {errors.email?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm mt-1'>Email is required.</p>}
                            </div>
                            
                            
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-sm">Registering as</span>
                                </label>
                                <select 
                                    {...register('selectedRole', { required: true })} 
                                    className="select select-bordered w-full select-sm sm:select-md"
                                    defaultValue="" 
                                >
                                    <option value="" disabled>Select a role...</option>
                                    <option value="buyer">Buyer</option>
                                    <option value="manager">Manager</option>
                                </select>
                                {errors.selectedRole && <p className='text-red-500 text-xs sm:text-sm mt-1'>Role selection is required.</p>}
                            </div>
                            
                            
                            <div className='form-control'>
                                <label className="label">
                                    <span className="label-text text-sm">Password</span>
                                </label>
                                <input type="password" {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    
                                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ 
                                })} className="input input-bordered w-full input-sm sm:input-md" placeholder="Password" />
                                
                                {
                                    errors.password?.type === 'required' && <p className='text-red-500 text-xs sm:text-sm mt-1'>Password is required.</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                        Password must be 6 characters or longer.
                                    </p>
                                }
                                {
                                    errors.password?.type === 'pattern' && <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                        Password must have at least one uppercase, one lowercase, one number, and one special character.
                                    </p>
                                }

                                <label className="label pt-1">
                                    <a className="label-text-alt link link-hover text-xs sm:text-sm">Forgot password?</a>
                                </label>
                            </div>
                            
                            <button type="submit" className="
                                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                                mt-4 py-2 sm:py-3.5 
                                rounded-xl 
                                font-medium shadow-lg transition-all duration-300
                                hover:shadow-xl hover:scale-[1.02] 
                                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
                                text-sm sm:text-base
                            ">Register</button>
                        </fieldset>
                        <p className='text-center mt-4 text-sm sm:text-base'>
                            Already have an account 
                            <Link
                                state={location.state}
                                className='text-blue-400 underline ml-1 font-medium'
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                    
                    <div className='p-4 pt-0 sm:p-8 sm:pt-0'>
                        <SocialLogin className="w-full"></SocialLogin>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Register;


