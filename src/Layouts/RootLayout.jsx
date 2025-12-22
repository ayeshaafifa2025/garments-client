import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { Outlet } from 'react-router';



const RootLayout = () => {
    return (

        <div>

            

 <div className=''>
           
            <NavBar></NavBar>
      
          
            <Outlet></Outlet>

            
            
            <Footer></Footer>
            
            
        </div>

        </div>
       
    );
};

export default RootLayout;