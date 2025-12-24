

import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import Logo from '../components/Logo';
import { Helmet } from 'react-helmet-async';
import { ThemeContext } from '../contexts/ThemeProvider';
// import NavBar from '../components/NavBar';

const DashboardLayout = () => {
         const { theme, toggleTheme } = useContext(ThemeContext);
    const { role } = useRole();

    return (
        <div>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <div className='drawer  lg:drawer-open min-h-screen '>
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <nav className="navbar bg-base-300 px-4 sm:px-6 lg:px-8">
                        <div className="flex-1 ">
                            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden" aria-label="open sidebar">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </label>
                            <span className="text-lg font-bold ml-2 hidden sm:inline">Garments Dashboard</span>
                        </div>
                    </nav>

                    <main className={  `flex-1 p-4 sm:p-6 lg:p-8 ${theme === "light" ? "bg-white" : "bg-gray-600 "} `}>
                        <Outlet />
                    </main>
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="flex flex-col w-64 bg-base-200 min-h-screen overflow-y-auto">
                        <div className="px-4 py-4">
                            <Link to="/"><Logo /></Link>
                          
                            {/* <Link to="/"><NavBar></NavBar></Link> */}
                        </div>

                        <ul className="menu p-4 w-full space-y-2">
                            <li>
                                <Link to="/dashboard" className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4h-2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
                                    </svg>
                                    <span>Home page</span>
                                </Link>
                            </li>

                            {(role === 'admin' || role === 'manager' || role === 'buyer') && (
                                <li>
                                    <NavLink to="/dashboard/my-profile" className="flex items-center space-x-2">
                                        <span>My Profile</span>
                                    </NavLink>
                                </li>
                            )}

                            {role === 'buyer' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/my-orders" className="flex items-center space-x-2">
                                            <span>My Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/track-order/:trackingId" className="flex items-center space-x-2">
                                            <span>Track Order</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'manager' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/add-product" className="flex items-center space-x-2">
                                            <span>Add Product</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/approved-orders" className="flex items-center space-x-2">
                                            <span>Approved Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/pending-orders" className="flex items-center space-x-2">
                                            <span>Pending Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-products" className="flex items-center space-x-2">
                                            <span>Manage Products</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {role === 'admin' && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/all-products" className="flex items-center space-x-2">
                                            <span>All Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/all-orders" className="flex items-center space-x-2">
                                            <span>All Orders</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manage-users" className="flex items-center space-x-2">
                                            <span>Manage Users</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

