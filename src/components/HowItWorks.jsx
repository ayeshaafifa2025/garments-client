import React, { useContext } from 'react';
import { FaUserCheck, FaBoxOpen, FaClipboardList, FaTruck } from "react-icons/fa";
import { ThemeContext } from '../contexts/ThemeProvider';

const HowItWorks = () => {
  const{theme,toggleTheme}= useContext(ThemeContext)
  return (
    <section className={`py-20   ${theme === "light" ? "bg-base-100" : "bg-gray-600 "}`}>
      <div className=" mx-auto px-6">
        <h2 className="text-3xl  font-bold text-black text-center mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className=" p-6 rounded-xl shadow text-center">
            <FaUserCheck className="text-4xl  mx-auto mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">Register & Login</h3>
            <p className="text-black">
              Buyers and managers register and log in securely to access the
              system.
            </p>
          </div>

          <div className=" p-6 rounded-xl shadow text-center">
            <FaBoxOpen className="text-4xl  mx-auto mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">Browse Products</h3>
            <p className="text-black">
              Buyers explore products added by managers and view detailed
              information.
            </p>
          </div>

          <div className=" p-6 rounded-xl shadow text-center">
            <FaClipboardList className="text-4xl  mx-auto mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">Place Order</h3>
            <p className="text-black">
              Buyers place orders based on minimum quantity and payment options.
            </p>
          </div>

          <div className=" p-6 rounded-xl shadow text-center">
            <FaTruck className="text-4xl  mx-auto mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">Track Production</h3>
            <p className="text-black">
              Orders move through production stages and can be tracked in real
              time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
