import React from 'react';

import { Outlet } from 'react-router';
import NavBar from './NavBar';
import Footer from './Footer';



const QuickLinks = () => {
    return (
       
              <div>
          
            <NavBar></NavBar>
            <main>
                <Outlet></Outlet>

            </main>
            
            <Footer></Footer>
        </div>

       
      
    );
};

export default QuickLinks;