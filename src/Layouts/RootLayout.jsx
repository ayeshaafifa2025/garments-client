import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeedBacks from '../components/feedbacks/FeedBacks';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsSection from '../components/StatsSection';
import { Outlet } from 'react-router';


const RootLayout = () => {
    return (
        <div className=''>
           
            <NavBar></NavBar>
      
            
            <div className=''>
                <Hero></Hero>
            <HowItWorks></HowItWorks>
            <FeedBacks></FeedBacks>
            <WhyChooseUs></WhyChooseUs>
            <StatsSection></StatsSection>

            </div>

            <Outlet></Outlet>
            
            <Footer></Footer>
            
            
        </div>
    );
};

export default RootLayout;