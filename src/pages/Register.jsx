
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


                        // update user profile to firebase
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
                // Firebase registration error (e.g., email already in use)
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Registration failed!",
                });
            })
    }

    return (
        <div>
            <NavBar></NavBar>
            <Helmet>
                <title>
                    register page
                </title>
            </Helmet>


               <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center">Welcome</h3>
            <p className='text-center'>Please Register now</p>
            <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">
                    {/* name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input input-bordered" placeholder="Your Name" />
                    {errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>}

                    {/* photo image field */}
                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input file-input-bordered" placeholder="Your Photo" />
                    {errors.photo?.type === 'required' && <p className='text-red-500'>Photo is required.</p>} 

                    {/* email field */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input input-bordered" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>}
                    
                    
                    <label className="label">Registering as</label>
                    <select 
                        {...register('selectedRole', { required: true })} 
                        className="select select-bordered w-full"
                        defaultValue="" 
                    >
                        <option value="" disabled>Select a role...</option>
                        <option value="buyer">Buyer</option>
                        <option value="manager">Manager</option>
                    </select>
                    {errors.selectedRole && <p className='text-red-500'>Role selection is required.</p>}
                    
                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/ 
                    })} className="input input-bordered" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 characters or longer.
                        </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>
                            Password must have at least one uppercase, one lowercase, one number, and one special character.
                        </p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button type="submit" className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">Register</button>
                </fieldset>
                <p>Already have an account <Link
                    state={location.state}
                    className='text-blue-400 underline'
                    to="/login">Login</Link></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
        <Footer></Footer>

        </div>
     
    );
};

export default Register;







