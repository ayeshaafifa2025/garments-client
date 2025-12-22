


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import SocialLogin from '../components/SocialLogin';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const [loginError, setLoginError] = useState('');
    
    const navigate = useNavigate();

    const handleLogin = (data) => {
        setLoginError('');
        
        signInUser(data.email, data.password)
            .then(result => {
                toast.success('Logged in successful');
                const destination = location.state?.from?.pathname || '/';
                navigate(destination, { replace: true });
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    setLoginError('Invalid email or password. Please check your credentials.');
                } else if (error.code === 'auth/too-many-requests') {
                    setLoginError('Access temporarily blocked due to too many failed attempts.');
                } else {
                    setLoginError('An unexpected error occurred. Please try again.');
                }
            })
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar></NavBar>
            <Helmet>
                <title>login</title> 
            </Helmet>
            
            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="card bg-base-100 w-full max-w-xs sm:max-w-md shrink-0 shadow-2xl border border-gray-100">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center pt-6">Welcome back</h3>
                    <p className='text-sm sm:text-base text-center text-gray-600 mb-2'>Please Login</p>
                    
                    <form className="card-body p-4 sm:p-8" onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                {...register('email', { required: true })} 
                                className="input input-bordered w-full input-sm sm:input-md" 
                                placeholder="Email" 
                            />
                            {
                                errors.email && errors.email.type === 'required' && 
                                <p className='text-red-500 mt-1 text-xs sm:text-sm'>Email is required</p>
                            }
                        </div>

                        <div className="form-control mt-3 sm:mt-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                {...register('password', { required: true, minLength: 6 })} 
                                className="input input-bordered w-full input-sm sm:input-md" 
                                placeholder="Password" 
                            />
                            {
                                errors.password && errors.password.type === 'required' && 
                                <p className='text-red-500 mt-1 text-xs sm:text-sm'>Password is required</p>
                            }
                            {
                                errors.password && errors.password.type === 'minLength' && 
                                <p className='text-red-500 mt-1 text-xs sm:text-sm'>Password must be 6 characters or longer</p>
                            }
                            
                            
                            {
                                loginError && 
                                <p className='text-red-600 font-semibold mt-3 text-center text-sm'>{loginError}</p>
                            }

                            <label className="label">
                                <a className="label-text-alt link link-hover text-xs sm:text-sm">Forgot password?</a>
                            </label>
                        </div>


                        <div className="form-control mt-4 sm:mt-6">
                            <button type="submit" className="
                                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                                px-6 py-2 sm:py-3.5 
                                rounded-xl 
                                font-medium shadow-lg transition-all duration-300
                                hover:shadow-xl hover:scale-[1.02] 
                                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
                                text-sm sm:text-base
                            ">
                                Login
                            </button>
                        </div>
                        
                        <p className='text-center mt-4 text-sm sm:text-base'>
                            New to stitchflow tracker? 
                            <Link
                                state={location.state}
                                className='text-blue-400 underline ml-1 font-medium'
                                to="/register"
                            >
                                Register
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

export default Login;
