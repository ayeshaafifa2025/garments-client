
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; 
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import userImg from '../assets/user 1.png';
import Logo from './Logo';
import { ThemeContext } from '../contexts/ThemeProvider';

const NavBar = () => {
const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logOut } = useAuth();
    const navigate = useNavigate(); 
    const [dropdownOpen, setDropdownOpen] = useState(false);

      useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])

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
         <>
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
        
        {
            user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    return (
        // <div className="navbar bg-base-200 mb-10 shadow-md">
       <div className={`sticky top-0 z-50 flex items-center justify-between px-4 py-2 shadow-md 
    ${theme === "light" ? "bg-base-100" : "bg-gray-600"}`}>
            <div className="navbar-start w-1/2 lg:w-auto">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn bg-black text-white btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <div className='flex items-center min-w-0'>
                          <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className="toggle"
      />
                    <Logo />
                    
                    <span className="btn btn-ghost text-black text-lg sm:text-xl truncate ml-2">
                        StitchFlow Tracker
                    </span>
                </div>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            
            
            <div className="navbar-end w-1/2 lg:w-auto gap-2">
                {
                    user ? (
                        <div className='flex items-center gap-2'>
                            
                        
                            <button 
                                onClick={handleLogOut} 
                                className="
                                    text-black bg-gradient-to-r from-purple-300 via-cyan-200 to-teal-300
                                    px-3 sm:px-4 py-2 sm:py-2.5 
                                    rounded-xl 
                                    font-medium shadow-lg transition-all duration-300
                                    hover:shadow-xl hover:scale-[1.02] 
                                    hover:from-purple-300 hover:via-cyan-300 hover:to-teal-400
                                    text-xs sm:text-sm
                                "
                            >
                                Log Out
                            </button>

                            
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
                                    <div className="absolute right-0 top-12 w-56 bg-base-100 rounded-box shadow-xl p-3 z-[100] border border-gray-100">
                                        <p className="font-semibold text-gray-800 break-words">{user?.displayName || 'User'}</p>
                                        <p className="text-sm text-gray-500 mb-2 break-words">{user?.email}</p>
                                        
                                        <div className='divider my-1'></div>
                                        
                                        <Link 
                                            to="/dashboard" 
                                            onClick={closeDropdown} 
                                            className='btn btn-ghost btn-sm w-full justify-start text-sm hover:bg-base-200'
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                    
                        <div className='flex items-center gap-1 sm:gap-2'>
                            
                            <img 
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hidden sm:block" 
                                src={userImg} 
                                alt="Default Avatar" 
                            />
                            <Link className='btn btn-xs sm:btn-sm btn-primary' to="/login">Log in</Link>
                            <Link className='btn btn-xs sm:btn-sm btn-secondary' to="/register">Register</Link>
                        </div> 
                    )
                }
            </div>
        </div>
    );
};

export default NavBar;