import React from 'react';
import OurProducts from '../components/OurProducts';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeedBacks from '../components/feedbacks/FeedBacks';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsSection from '../components/StatsSection';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
           <Helmet>
               
                <title>landing page</title> 
            </Helmet>

            <div className=''>
                <Hero></Hero>
            <HowItWorks></HowItWorks>
            <FeedBacks></FeedBacks>
            <WhyChooseUs></WhyChooseUs>
            <StatsSection></StatsSection>
  <OurProducts />
        </div>
            </div>
             
             
    );
};

export default Home;