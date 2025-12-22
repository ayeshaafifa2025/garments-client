


import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';




const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
  
    console.log(location)
    const navigate = useNavigate();


    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                console.log(result.user);
                

                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        
                    }
                )
              
                   navigate(`${location.state?location.state:"/"}`)


            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='text-center pb-8'>
            <p className='mb-2'>OR</p>
            <button
                onClick={handleGoogleSignIn}
                className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-2 py-2 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Google login
            </button>
        </div>
    );
};

export default SocialLogin;


