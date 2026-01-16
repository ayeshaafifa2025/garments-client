

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import SocialLogin from '../components/SocialLogin';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const CREDENTIALS = {
    buyer: {
        email: "buyer@demo.com",
        password: "Password@123"
    },
    manager: {
        email: "manager@demo.com", 
        password: "Password@123" 
    }
};

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
                } else {
                    setLoginError('An unexpected error occurred.');
                }
            })
    }

   
    const handleAutoFill = (role) => {
        const { email, password } = CREDENTIALS[role];
        setValue('email', email);
        setValue('password', password);
        toast.info(`Demo ${role} credentials loaded!`);
    };

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
                            <label className="label"><span className="label-text">Email</span></label>
                            <input 
                                type="email" 
                                {...register('email', { required: true })} 
                                className="input input-bordered w-full input-sm sm:input-md" 
                                placeholder="Email" 
                            />
                        </div>

                        <div className="form-control mt-3 sm:mt-4">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input 
                                type="password" 
                                {...register('password', { required: true, minLength: 6 })} 
                                className="input input-bordered w-full input-sm sm:input-md" 
                                placeholder="Password" 
                            />
                            {loginError && <p className='text-red-600 font-semibold mt-3 text-center text-sm'>{loginError}</p>}
                        </div>

                        <div className="form-control mt-4 sm:mt-6 gap-2">
                            <button type="submit" className="w-full text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300 px-6 py-2 sm:py-3.5 rounded-xl font-medium shadow-lg hover:scale-[1.02] transition-all">
                                Login
                            </button>

                          
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <button 
                                    type="button"
                                    onClick={() => handleAutoFill('buyer')}
                                    className="btn btn-warning btn-outline btn-sm sm:btn-md rounded-xl font-bold"
                                >
                                    Demo Buyer
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => handleAutoFill('manager')}
                                    className="btn btn-accent btn-outline btn-sm sm:btn-md rounded-xl font-bold"
                                >
                                    Demo Manager
                                </button>
                            </div>
                        </div>
                        
                        <p className='text-center mt-4 text-sm sm:text-base'>
                            New to stitchflow tracker? 
                            <Link className='text-blue-400 underline ml-1 font-medium' to="/register">Register</Link>
                        </p>
                    </form>
                    
                    <div className='p-4 pt-0 sm:p-8 sm:pt-0'>
                        <div className="divider text-gray-400 text-xs">OR</div>
                        <SocialLogin className="w-full"></SocialLogin>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;

