



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
        <div>
            <NavBar></NavBar>
            <Helmet>
                <title>login</title> 
            </Helmet>
            
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <h3 className="text-3xl text-center pt-6">Welcome back</h3>
                <p className='text-center'>Please Login</p>
                
                <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input 
                            type="email" 
                            {...register('email', { required: true })} 
                            className="input input-bordered w-full" 
                            placeholder="Email" 
                        />
                        {
                            errors.email && errors.email.type === 'required' && 
                            <p className='text-red-500 mt-1'>Email is required</p>
                        }
                    </div>

                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input 
                            type="password" 
                            {...register('password', { required: true, minLength: 6 })} 
                            className="input input-bordered w-full" 
                            placeholder="Password" 
                        />
                        {
                            errors.password && errors.password.type === 'required' && 
                            <p className='text-red-500 mt-1'>Password is required</p>
                        }
                        {
                            errors.password && errors.password.type === 'minLength' && 
                            <p className='text-red-500 mt-1'>Password must be 6 characters or longer</p>
                        }
                        
                        {/* Firebase Error Message Display */}
                        {
                            loginError && 
                            <p className='text-red-600 font-semibold mt-3 text-center'>{loginError}</p>
                        }

                        <label className="label">
                            <a className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>


                    <div className="form-control mt-6">
                        <button type="submit" className="
                            text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                            px-2 sm:px-8 py-3 sm:py-3.5 
                            rounded-xl 
                            font-medium shadow-lg transition-all duration-300
                            hover:shadow-xl hover:scale-[1.02] 
                            hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
                        ">
                            Login
                        </button>
                    </div>
                    
                    <p className='text-center mt-4'>
                        New to stitchflow tracker? 
                        <Link
                            state={location.state}
                            className='text-blue-400 underline ml-1'
                            to="/register"
                        >
                            Register
                        </Link>
                    </p>
                </form>
                <div className='p-6 pt-0'>
                    <SocialLogin />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;
