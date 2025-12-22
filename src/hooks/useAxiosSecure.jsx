

import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
  
    const { user, loading ,logOut} = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
      // Intercept request
        if (user?.accessToken) {
            const requestInterceptor = axiosSecure.interceptors.request.use(
                config => {

                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
            // response interceptor
            const resInterceptor = axiosSecure.interceptors.response.use((response)=>{
return response;
            },(error)=>{
              console.log(error);

              const statusCode = error.status;
              if(statusCode === 401 || statusCode === 403){
                logOut()
                .then(()=>{
                  navigate('/login')
                }

                )
              }
              return Promise.reject(error)

            }

            )
            
            return () => {
                axiosSecure.interceptors.request.eject(requestInterceptor);
                axiosSecure.interceptors.response.eject(resInterceptor);
            };
        } 
        
       
    }, 
    [user, loading,logOut,navigate]);

    return axiosSecure;
};

export default useAxiosSecure;









