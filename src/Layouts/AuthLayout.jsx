import React from 'react';

import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
           
            <section className='flex'>
            <div className='flex-1'>
 <Outlet></Outlet>
            </div>
          
            </section>
           
            
        </div>
    );
};

export default AuthLayout;