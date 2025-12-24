import React, { useContext } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "../contexts/ThemeProvider";

const Footer = () => {
  const{theme,toggleTheme}= useContext(ThemeContext)
  return (
    <footer className={` text-black    ${theme === "light" ? "bg-gradient-to-r from-teal-100 via-cyan-200 to-blue-50" : "bg-gray-600 "}`}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          <div>
            <h3 className="text-2xl font-semibold  mb-4 tracking-wide">
              StitchFlow Tracker
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              StitchFlow Tracker is a smart garment order and production tracking
              system designed to simplify workflows between buyers, managers,
              and administrators. From order placement to production stages like
              cutting, sewing, finishing, and delivery, StitchFlow ensures
              transparency, efficiency, and real-time tracking.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold  mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <NavLink
                  to="/quick/about"
                  className="hover:text-indigo-400 transition"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quick/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quick/terms"
                  className="hover:text-indigo-400 transition"
                >
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quick/privacy"
                  className="hover:text-indigo-400 transition"
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold  mb-4 tracking-wide">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-3 text-gray-400 text-sm">
              <a href="https://facebook.com" className="hover:text-blue-500 transition">
                Facebook
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500 transition">
                Instagram
              </a>
              <a href="https://twitter.com" className="hover:text-sky-400 transition">
                X
              </a>
              <a href="https://youtube.com" className="hover:text-red-500 transition">
                YouTube
              </a>
            </div>
          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} StitchFlow Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

