
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router'; 
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';


import userImg from '../assets/user 1.png' 
import Logo from './Logo';

const NavBar = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate(); 
  
    const [dropdownOpen, setDropdownOpen] = useState(false); 

    const handleLogOut = () => {

        setDropdownOpen(false);

        logOut()
            .then(() => {
               
                toast.success('Successfully logged out!'); 
                navigate('/');
            })
            .catch(error => {
               
                console.error("Logout Failed:", error);

                toast.error('Logout failed: ' + error.message); 
            });
    }

    const closeDropdown = () => {
        setTimeout(() => {
            setDropdownOpen(false);
        }, 100); 
    };

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
        {
            !user && <>
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
            </>
        }
        {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    return (
        <div className="navbar bg-base-200 mb-10 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className='flex  items-center'>
                    
<Logo></Logo>
                
                <span className="btn btn-ghost text-xl">
                    StitchFlow Tracker
                </span>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            
        
            <div className="navbar-end gap-2">
                {
                    user ? (
                        <div className='flex items-center gap-2'>
                            
                        
                            <button 
                                onClick={handleLogOut} 
                                 className="
                text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                px-6 sm:px-8 py-3 sm:py-3.5 
                rounded-xl 
                font-medium shadow-lg transition-all duration-300
                hover:shadow-xl hover:scale-[1.02] 
                hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
            "
                            >
                                Log Out
                            </button>

                            {/* 2. Avatar Dropdown */}
                            <div className="relative">
                                <img
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    onBlur={closeDropdown} 
                                    className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-primary"
                                    src={user?.photoURL || userImg} 
                                    alt="User Avatar"
                                    tabIndex={0} 
                                />
                                
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-12 w-56 bg-base-100 rounded-box shadow-xl p-3 z-[100]">
                                        <p className="font-semibold text-gray-700">{user?.displayName || 'User'}</p>
                                        <p className="text-sm text-gray-500 mb-2">{user?.email}</p>
                                        
                                        <div className='divider my-1'></div>
                                        
                                      
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                 
                        <div className='flex items-center gap-2'>
                            
                            <img 
                                className="w-10 h-10 rounded-full" 
                                src={userImg} 
                                alt="Default Avatar" 
                            />
                            <Link className='btn btn-sm btn-primary' to="/login">Log in</Link>
                            <Link className='btn btn-sm btn-secondary' to="/register">Register</Link>
                        </div> 
                    )
                }
            </div>
        </div>
    );
};

export default NavBar;