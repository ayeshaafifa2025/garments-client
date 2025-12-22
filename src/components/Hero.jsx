

import React from "react";
import { NavLink } from "react-router";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 md:py-24 lg:py-32 min-h-[60vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1682089748132-d9bda2c7a220?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybWVudCUyMGZhY3Rvcnl8ZW58MHx8MHx8fDA%3D"
            alt="Garments Production"
            className="w-full max-w-md rounded-xl shadow-2xl transition duration-500 hover:shadow-3xl"
          />
        </div>

        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Smart Garments Order & Production Tracker
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-indigo-100 max-w-xl mx-auto md:mx-0">
            Track garment orders, manage production stages, and ensure on-time
            delivery with a modern and efficient workflow system.
          </p>
          
          <div className="mt-8 md:mt-10 inline-block">
            <NavLink to="/products">
              <button className="
                text-black bg-gradient-to-r from-purple-200 via-cyan-200 to-teal-300
                px-8 sm:px-10 py-3.5 sm:py-4 
                rounded-xl 
                font-medium shadow-xl transition-all duration-300
                hover:shadow-2xl hover:scale-[1.03] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
                text-base sm:text-lg
              ">
                see available items
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;





