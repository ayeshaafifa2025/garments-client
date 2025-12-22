import React from "react";


import { NavLink } from "react-router";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-1 md:order-2 flex justify-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1682089748132-d9bda2c7a220?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2FybWVudCUyMGZhY3Rvcnl8ZW58MHx8MHx8fDA%3D"
            alt="Garments Production"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </div>

        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Smart Garments Order & Production Tracker
          </h1>
          <p className="mt-6 text-lg text-indigo-100">
            Track garment orders, manage production stages, and ensure on-time
            delivery with a modern and efficient workflow system.
          </p>
          <NavLink to="/products">
            <button className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-8 py-3 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            ">
              see available items
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;





